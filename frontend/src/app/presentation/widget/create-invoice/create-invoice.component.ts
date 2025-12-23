import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IClient } from '../../../interfaces/client';
import { IProduct } from '../../../interfaces/product';
import { IUser } from '../../../interfaces/user';
import { IOrder } from '../../../interfaces/order';
import { InvoiceRequest } from '../../../services/invoice.services';
import { IInvoice } from '../../../interfaces/invoice';
import { OrderRequest } from '../../../services/order.services';
import { PopUpService } from '../../services/toast';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  orders: IOrder[] = [];
  selectedOrder: string | undefined
  @Output() create = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  invoiceService = inject(InvoiceRequest)
  orderService = inject(OrderRequest)

  onClose() {
    this.close.emit()
  }

  ngOnInit() {
    this.orderService.findAllForInvoices().subscribe({
      next: (e: any) => {
        this.orders = e;
      }
    })
  }
  private popup = inject(PopUpService)
  
  sendSubmit() {
    if (this.selectedOrder) {
      this.invoiceService.createInvoice({
        orderId: this.selectedOrder
      }).subscribe({
        next: (e: any) => {
          this.popup.showSuccess('Factura creada')
          this.create.emit()
        },
        error: (e: any) => {
          this.popup.showError(e?.error?.message || 'Error al crear la factura')
        }
      })
    }
  }

  saveOrder() {
    this.create.emit()
  }

  formatDate(date: Date) {
    const newd = new Date(date.toString())
    const formato = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
    }).format(newd);
    
    return formato
  }
}
