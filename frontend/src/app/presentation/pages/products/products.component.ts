import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductoComponent } from '../../widget/create-producto/create-producto.component';
import { ProductRequest } from '../../../services/product.services';
import { PopUpService } from '../../services/toast';
import { IProduct } from '../../../interfaces/product';
import { EditarProductosComponent } from '../../widget/editar-productos/editar-productos.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserStore } from '../../../config/use-store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CreateProductoComponent,
    EditarProductosComponent,
    ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  showCreateForm = false;
  products: IProduct[] = [];
  private allProducts: IProduct[] = [];
  productService = inject(ProductRequest)  
  private popup = inject(PopUpService)
  editingProduct: IProduct | null = null;
  inpSearch = new FormControl('')
  private searchSub?: Subscription;

  ngOnInit(): void {
    this.gets();

    this.searchSub = this.inpSearch.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe(() => this.applyLocalFilter());
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  gets() {
    this.productService.findAll().subscribe({
      next: (e: any) => {
        this.products = e
        this.allProducts = Array.isArray(e) ? e : [];
      }
    })
  }
  openCreateProduct() {
     this.showCreateForm = true; }

  closeCreateProduct() { 
    this.showCreateForm = false; }
  
  onCreateProduct(newClient: { name: string; description: string; price: number; stock: number, iva: boolean }) {
    this.productService.createProduct({ ...newClient }).subscribe({
      next: (e: any) => {
        this.popup.showSuccess('Producto agregado')
        this.gets()
      },
      error: (e: any) => {
        this.popup.showError(e.error.message)
      }
    })
    this.showCreateForm = false;
  }

  onDelete(id: string) {
    const ok = window.confirm('¿Estás seguro que deseas eliminar este producto?')
    if (!ok) return
    this.productService.deleteProduct(id).subscribe({
      next: (e: any) => {
        this.popup.showSuccess('Producto eliminado')
        this.gets()
      },
      error: (e: any) => {
        this.popup.showError(e?.error?.message || 'Error al eliminar producto')
      }
    })
  }
  user = UserStore.getInstance()

  editProduct(id: string) {
    const found = this.products.find(p => p._id === id)
    if (found) { this.editingProduct = found; return }

    // fallback: refetch
    this.productService.findAll().subscribe({
      next: (list: any) => {
        const f = (list as IProduct[]).find(p => p._id === id)
        if (f) this.editingProduct = f
      },
      error: () => this.popup.showError('No se pudo cargar el producto')
    })
  }

  applyLocalFilter() {
    const q = (this.inpSearch.value || '').toString().toLowerCase().trim();
    if (!q) {
      // restore full list
      this.products = [...this.allProducts];
      return;
    }

    this.products = this.allProducts.filter(p => {
      const name = (p.name || '').toString().toLowerCase();
      const desc = (p.description || '').toString().toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }

  handleEditSaved(result: any) {
    this.editingProduct = null
    this.gets()
  }


}
