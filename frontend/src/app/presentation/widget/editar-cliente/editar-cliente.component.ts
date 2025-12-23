import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IClient } from '../../../interfaces/client';
import { ClientRequest } from '../../../services/client.services';
import { PopUpService } from '../../services/toast';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss'
})
export class EditarClienteComponent implements OnChanges {
  private fb = inject(FormBuilder)
  private clientReq = inject(ClientRequest)
  private popup = inject(PopUpService)
  
  @Input() client?: IClient | null = null
  @Input() clientId?: string | null = null
  @Output() saved = new EventEmitter<any>()
  @Output() cancelled = new EventEmitter<void>()

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{3,100}$')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/i)]],
    phone: ['', [ Validators.required, Validators.pattern('^\\d{11}$') ]],
    address: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{4,200}$') ]],
    cedula: ['', [ Validators.required, Validators.pattern('^\\d{1,9}$') ]],
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes['client'] && this.client) {
      this.form.patchValue({
        name: this.client.name ?? '',
        email: this.client.email ?? '',
        phone: this.client.phone ?? '',
        address: this.client.address ?? '',
        cedula: (this.client.cedula) ?? ''
      })
    }
  }

  cancel() {
    this.cancelled.emit()
  }

  onSubmit() {
    const id = this.clientId ?? this.client?._id
    if (!id) {
      this.saved.emit({ error: 'No client id provided' })
      return
    }

    const values = this.form.value
    const payload: any = {}

    // include only fields that changed or are provided
    ;['name','email','phone','address', 'cedula'].forEach((k: string) => {
      const val = (values as any)[k]
      const original = (this.client as any)?.[k]
      if (val !== undefined && val !== null && val !== '' ) {
        if (original === undefined || val !== original) {
          payload[k] = val
        }
      }
    })

    if (Object.keys(payload).length === 0) {
      this.popup.showInfo('Sin cambios para guardar')
      this.saved.emit()
      return
    }

    this.clientReq.updateClient(id, payload).subscribe({
      next: (res: any) => {
        this.popup.showSuccess('Cambios guardados')
        this.saved.emit()
      },
      error: (err: any) => {
        this.popup.showError(err.error.message);
        this.saved.emit()
      }
    })
  }

}
