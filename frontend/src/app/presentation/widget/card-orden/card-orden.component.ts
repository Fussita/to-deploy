import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IOrder, OrderDetail } from '../../../interfaces/order';

@Component({
  selector: 'app-card-orden',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-orden.component.html',
  styleUrl: './card-orden.component.scss'
})
export class CardOrdenComponent {
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
    console.log(this.order)
    if (this.order?.details) {
      for (let i of this.order.details) {
        if (i.product.iva) {
          monto += i.quantity * i.product.price *0.16
        }
      }
    }
    return monto
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
