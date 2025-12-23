import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IInvoice } from '../../../interfaces/invoice';
import { PopUpService } from '../../services/toast';
import { InvoiceRequest } from '../../../services/invoice.services';
import { UserStore } from '../../../config/use-store';

@Component({
  selector: 'app-card-invoice',
  standalone: true,
  imports: [
    CommonModule,
  
  ],
  templateUrl: './card-invoice.component.html',
  styleUrl: './card-invoice.component.scss'
})
export class CardInvoiceComponent {
  @Input() invoice?: IInvoice | null = null
  invoiceService = inject(InvoiceRequest)  
  private popup = inject(PopUpService)  

  @Output() complete = new EventEmitter<any>();
  
  user = UserStore.getInstance()

  onDelete(id: string) {
    const ok = window.confirm('¿Estás seguro que deseas anular esta factura?')
    if (!ok) return
    this.invoiceService.deleteInvoice(id).subscribe({
      next: (e: any) => {
        this.popup.showSuccess('Factura Anulada')
        this.complete.emit({});
      },
      error: (e: any) => {
        this.popup.showError(e?.error?.message || 'Error al Anular Factura')
      }
    })  
  }

}
