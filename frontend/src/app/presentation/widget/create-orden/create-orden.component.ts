import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IClient } from '../../../interfaces/client';
import { IProduct } from '../../../interfaces/product';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-create-orden',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-orden.component.html',
  styleUrls: ['./create-orden.component.scss']
})
export class CreateOrdenComponent  {

  @Input() clients: IClient[] = [];
  @Input() products: IProduct[] = [];
  @Input() user: IUser | undefined;

  @Output() create = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  selectedClientId: string | null = null;
  quantities: Record<string, number> = {};
  selectedProducts: { product: IProduct, quantity: number }[] = [];
  searchTerm = '';
  
  get filteredProducts() {
    const term = (this.searchTerm || '').toLowerCase().trim();
    if (!term) return this.products || [];
    return (this.products || []).filter((p: any) => (p.name || '').toLowerCase().includes(term));
  }

  onClose() {
    this.close.emit();
  }

  addToCart(pr: IProduct) {
    let find = this.selectedProducts.find( e => e.product._id == pr._id )
    if ( find ) return ; 
    this.selectedProducts.push({
      product: pr,
      quantity: 1
    })
  }

  removeFromCart(pr: IProduct) {
    this.selectedProducts = this.selectedProducts.filter( e => e.product._id != pr._id )
  }

  getTotal() {
    let monto = 0
    for (let i of this.selectedProducts) {
      monto += i.quantity * i.product.price
    }
    return monto
  }

  getTotalIVA() {
    let monto = 0
    for (let i of this.selectedProducts) {
      if (i.product.iva) {
        monto += i.quantity * i.product.price *0.16
      }
    }
    return monto
  }

  setQuantity(product: IProduct, qty: number) {
    let find = this.selectedProducts.find( e => e.product._id == product._id )
    if (!find) return;
    const q = Math.max(1, Math.min(Math.floor(qty) || 1, find.product.stock ?? 0));
    if (product.stock < qty) {
      alert(`El producto ${product.name} no tiene el suficiente stock para su orden`);
    }
    // asignar la cantidad siempre al valor acotado
    find.quantity = q;
  }

  saveOrder() {
    if (!this.selectedClientId) {
      alert('Selecciona un cliente para la orden.');
      return;
    }
    if (this.selectedProducts.length == 0) {
      alert('Selecciona al menos un producto para la orden.');
      return;
    }
    
    let details = []
    for (let i of this.selectedProducts) {
      if ( i.product.stock < i.quantity ) {
        alert(`El producto ${i.product.name} no tiene el suficiente stock para su orden`);
        return;
      }

      details.push({ productId: i.product._id, quantity: i.quantity })
    }
    let order = {
      userId: this.user?._id,
      clientId: this.selectedClientId,
      details: details
    }
    this.create.emit( order )
  }


}
