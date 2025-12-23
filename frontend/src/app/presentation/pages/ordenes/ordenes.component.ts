import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrdenComponent } from '../../widget/create-orden/create-orden.component';
import { CardOrdenComponent } from '../../widget/card-orden/card-orden.component';
import { IOrder } from '../../../interfaces/order';
import { ClientRequest } from '../../../services/client.services';
import { OrderRequest } from '../../../services/order.services';
import { ProductRequest } from '../../../services/product.services';
import { PopUpService } from '../../services/toast';
import { UserStore } from '../../../config/use-store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { EditOrderComponent } from '../../widget/edit-order/edit-order.component';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [
    EditOrderComponent,
    CommonModule, 
    CreateOrdenComponent, 
    CardOrdenComponent,
    ReactiveFormsModule
  ],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.scss'
})
export class OrdenesComponent {
  showCreateOrder = false;
  showEditOrder = false
  currentSeller = UserStore.getInstance().User
  productService = inject(ProductRequest)  
  orderService = inject(OrderRequest)  
  clientService = inject(ClientRequest)  
  private popup = inject(PopUpService)
  private allOrders: IOrder[] = [];
  private searchSub?: Subscription;
  inpSearch = new FormControl('')
  orders: IOrder[] = [];
  selectedOrder: IOrder | null = null;
  orderSelected: IOrder | undefined;
  clients = []
  products = []

  openCreateOrder() { this.showCreateOrder = true; }
  closeCreateOrder() { this.showCreateOrder = false; }
  
  ngOnInit(): void {
    this.gets();

    this.searchSub = this.inpSearch.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe(() => this.applyLocalFilter());
  }

  gets() {    
    this.orderService.findAll().subscribe({
      next: (e: any) => {
        this.orders = e
        this.allOrders = e
      }
    })  
    
    this.productService.findAll().subscribe({
      next: (e: any) => {
        this.products = e
      }
    })  
    
    this.clientService.findAll().subscribe({
      next: (e: any) => {
        this.clients = e
      }
    })  
    
  }

  selectOrder(o: IOrder) {
    this.selectedOrder = o;
  }

  closeSelected() {
    this.selectedOrder = null;
  }

  onCreateOrder(order: any) {
    this.orderService.createOrder(order).subscribe({
      next: (e) => {
        this.popup.showSuccess('Orden agregada')
        this.showCreateOrder = false;
        this.gets()  
      },
      error: (e: any) => {
        this.popup.showError(e.error.message)
      }
    })
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

  onDelete(id: string) {
    const ok = window.confirm('¿Estás seguro que deseas eliminar esta orden?')
    if (!ok) return
    this.orderService.deleteOrder(id).subscribe({
      next: (e: any) => {
        this.popup.showSuccess('Orden eliminado')
        this.gets()
      },
      error: (e: any) => {
        this.popup.showError(e?.error?.message || 'Error al eliminar orden')
      }
    })  
  }

  openEdit(o: IOrder) { 
    this.orderSelected = o
    this.showEditOrder = true; 
  }

  closeEdit() { 
    this.showEditOrder = false; 
    this.gets()
  }
  
  applyLocalFilter() {
    const q = (this.inpSearch.value || '').toString().toLowerCase().trim();
    if (!q) {
      this.orders = [...this.allOrders];
      return;
    }

    this.orders = this.allOrders.filter(o => {
      const name = (o.client?.name || '').toString().toLowerCase();
      return name.includes(q) || (o._id || '').toString().toLowerCase().includes(q);
    });
  }

  onEditOrder(order: any) {
    this.orderSelected = undefined
    this.showEditOrder = false;  
    this.gets()
  }
  
}

