import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IOrder } from '../../../interfaces/order';
import { OrderRequest } from '../../../services/order.services';
import { PopUpService } from '../../services/toast';

@Component({
  selector: 'edit-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent  {

  @Input() order: IOrder | undefined;
  @Output() create = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  selectedOrder = ''

  onClose() {
    this.close.emit();
  }

  saveOrder() {
    this.create.emit({
      orderId: this.selectedOrder
    })
  }

  private orderServices = inject(OrderRequest)
  private popup = inject(PopUpService)

  file: File | undefined

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file)  this.file = file
  }

  sendFile() {
    if (this.file) {
      if (this.order?._id) {
          this.orderServices.updateOrder( this.order._id, { imageBase64: this.file } ).subscribe({
            next: (e: any) => {
              this.popup.showSuccess('Comprobante de Pago cargado')
              },
            error: (e: any) => {
              this.popup.showError(e?.error?.message || 'Error al cargar comprobante')
            }
          })
        }
      }
  
  }

}
