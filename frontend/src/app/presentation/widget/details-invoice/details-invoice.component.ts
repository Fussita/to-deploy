import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrder, OrderDetail } from '../../../interfaces/order';
import { IInvoice } from '../../../interfaces/invoice';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'details-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-invoice.component.html',
  styleUrl: './details-invoice.component.scss'
})
export class DetailsInvoiceComponent {
  @Input() invoice?: IInvoice | null;
  @Input() order?: IOrder | null;
  @Output() complete = new EventEmitter<IOrder>();

  get subtotal(): number {
    if (!this.order?.details || this.order.details.length === 0) return 0;
    return this.order.details.reduce((sum: number, d: OrderDetail) => {
      // prefer detail.total if provided, otherwise compute from product price * qty
      const detailTotal = d.total ?? ((d.product?.price ?? 0) * (d.quantity ?? 0));
      return sum + (detailTotal ?? 0);
    }, 0);
  }

  get total(): number {
    return this.order?.total ?? this.subtotal;
  }

  getTotalIVA() {
    let monto = 0
    if (this.order?.details) {
      for (let i of this.order.details) {
        if (i.product.iva) {
          monto += i.quantity * i.product.price *0.16
        }
      }
    }
    return monto
  }
  generarPDF() {
    const div = document.getElementById('toPdf');
    if (div) {
      html2canvas(div).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210; // ancho A4 en mm
        const pageHeight = 297; // alto A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('factura.pdf');
      });
    }
  }

  markCompleted() {
    if (!this.order) return;
    this.order.paid = true;
    this.complete.emit(this.order);
  }

  formatDate(d?: Date | string) {
    if (!d) return '';
    const nd = new Date(d as any);
    return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(nd);
  }
}
