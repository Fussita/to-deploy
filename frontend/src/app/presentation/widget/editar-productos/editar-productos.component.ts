import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IProduct } from '../../../interfaces/product';
import { ProductRequest } from '../../../services/product.services';
import { HttpErrorResponse } from '@angular/common/http';
import { PopUpService } from '../../services/toast';

@Component({
  selector: 'app-editar-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.scss'
})
export class EditarProductosComponent implements OnChanges {
  private fb = inject(FormBuilder)
  private productReq = inject(ProductRequest)
  private popup = inject(PopUpService)

  @Input() product?: IProduct | null = null
  @Input() productId?: string | null = null
  @Output() saved = new EventEmitter<any>()
  @Output() cancelled = new EventEmitter<void>()

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{2,100}$')]],
    price: [1, [Validators.required, Validators.min(1)]],
    stock: [1, [Validators.required, Validators.min(1)]],
    description: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{8,200}$') ]],
    iva: [true] 
  })

  // confirmation state
  showConfirm = false
  private pendingPayload: any = null

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.form.patchValue({
        name: this.product.name ?? '',
        price: this.product.price ?? 0,
        stock: this.product.stock ?? 0,
        description: this.product.description ?? '',
        iva: this.product.iva ?? true
      })
    }
  }

  cancel() {
    this.cancelled.emit()
  }

  onSubmit() {
    const id = this.productId ?? this.product?._id
    if (!id) {
      this.saved.emit({ error: 'No product id provided' })
      return
    }

    const values = this.form.value
    const payload: any = {}

    ;['name','price','stock','description', 'iva'].forEach((k: string) => {
      const val = (values as any)[k]
      const original = (this.product as any)?.[k]
      if (val !== undefined && val !== null && val !== '' ) {
        if (original === undefined || val !== original) {
          payload[k] = val
        }
      }
    })

    if (Object.keys(payload).length === 0) {
      this.popup.showInfo('Sin cambios por guardar')
      this.saved.emit({ message: 'Sin cambios por guardar' })
      return
    }

    // store payload and show confirmation UI
    this.pendingPayload = { ...payload }
    this.showConfirm = true
  }

  confirmYes() {
    const id = this.productId ?? this.product?._id
    if (!id || !this.pendingPayload) {
      this.saved.emit({ error: 'No product id or payload' })
      this.showConfirm = false
      this.pendingPayload = null
      console.log('fallo aqui')
      return
    }

    // client-side duplicate name check: fetch products and ensure no other product has same name
    const newName = this.pendingPayload.name
    if (newName) {
      this.productReq.findAll().subscribe({
        next: (list: any) => {
          const dup = (list as IProduct[]).find(p => p.name === newName && p._id !== id)
          if (dup) {
            this.saved.emit({ error: { message: 'Nombre de producto ya registrado' } })
            this.showConfirm = false
            this.pendingPayload = null
            return
          }

          // no duplicate, proceed with update
          this.productReq.updateProduct(id, this.pendingPayload).subscribe({
            next: (res: any) => {
              this.saved.emit(res)
              this.showConfirm = false
              this.pendingPayload = null
            },
            error: (err: HttpErrorResponse) => {
              this.saved.emit({ error: err })
              this.showConfirm = false
              this.pendingPayload = null
            }
          })
        },
        error: () => {
          // If we can't fetch list, fallback to attempting update and surface server error
          this.productReq.updateProduct(id, this.pendingPayload).subscribe({
            next: (res: any) => {
              this.saved.emit(res)
              this.showConfirm = false
              this.pendingPayload = null
            },
            error: (err: HttpErrorResponse) => {
              this.saved.emit({ error: err })
              this.showConfirm = false
              this.pendingPayload = null
            }
          })
        }
      })
      return
    }

    // no name provided in payload, just update
    this.productReq.updateProduct(id, this.pendingPayload).subscribe({
      next: (res: any) => {
        this.popup.showSuccess('Cambios guardados')
        this.saved.emit()
        this.showConfirm = false
        this.pendingPayload = null
      },
      error: (err: HttpErrorResponse) => {
        this.popup.showError(err.error.message);
        this.saved.emit()
        this.showConfirm = false
        this.pendingPayload = null
      }
    })
  }

  confirmNo() {
    this.showConfirm = false
    this.pendingPayload = null
  }

}
