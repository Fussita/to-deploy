import { Component, inject } from '@angular/core';
import { CreateInvoiceComponent } from '../../widget/create-invoice/create-invoice.component';
import { CommonModule } from '@angular/common';
import { CardInvoiceComponent } from '../../widget/card-invoice/card-invoice.component';
import { PopUpService } from '../../services/toast';
import { IInvoice } from '../../../interfaces/invoice';
import { InvoiceRequest } from '../../../services/invoice.services';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IOrder } from '../../../interfaces/order';
import { DetailsInvoiceComponent } from '../../widget/details-invoice/details-invoice.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [
    CommonModule,
    CardInvoiceComponent,
    ReactiveFormsModule,
    DetailsInvoiceComponent,
    CreateInvoiceComponent
  ],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.scss'
})
export class InvoicePageComponent {
  showCreateOrder = false;
  invoiceService = inject(InvoiceRequest)  
  private popup = inject(PopUpService)
  private allInvoices: IInvoice[] = [];
  private searchSub?: Subscription;
  inpSearch = new FormControl('')
  invoicesComplete: IInvoice[] = [];
  invoicesNull: IInvoice[] = [];
  showCompleted = true;
  showNull = true;
  
  openCreateOrder() { this.showCreateOrder = true; }
  closeCreateOrder() { this.showCreateOrder = false; }

  openCreateInvoice() { this.showCreateInvoice = true; }
  closeCreateInvoice() { this.showCreateInvoice = false; }

  showCreateInvoice = false
  selectedOrder: IOrder | undefined
  
  onCreateOrder(t: any) {
    this.showCreateInvoice = false
    this.gets()
  }

  closeSelected() {
    this.selectedOrder= undefined;
    this.forDetailInvoice = undefined;
  }

  ngOnInit(): void {
    this.gets();

    this.searchSub = this.inpSearch.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe(() => this.applyLocalFilter());  
  }

  forDetailInvoice: IInvoice | undefined
  showDetailInvoice = false
  openInvoice( i: IInvoice ) {
    this.forDetailInvoice = i    
    this.selectedOrder = i.order
    this.showDetailInvoice = true
  }

  gets() {
    this.invoiceService.findAll().subscribe({
      next: (e: any) => {
        this.allInvoices = Array.isArray(e) ? e : [];
        this.invoicesComplete = this.allInvoices.filter((i: IInvoice) => i.status === 'PAGADA');
        this.invoicesNull = this.allInvoices.filter((i: IInvoice) => i.status === 'ANULADA');
      },
      error: (err: any) => {}
    })  
  }

  completeNull(enter: any) {
    this.gets()
  }

  completeFromCompleted(inv: IInvoice) {
    this.gets();
  }

  completeFromNull(inv: IInvoice) {
   
    this.gets();
  }

  http = inject(HttpClient)

  descargarArchivo() {
    this.http.get('assets/images/manual_facturacion.pdf', { responseType: 'blob' }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Manual.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
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

  applyLocalFilter() {
    const q = (this.inpSearch.value || '').toString().toLowerCase().trim();
    if (!q) {
      // restore both lists from the master copy
      this.invoicesComplete = this.allInvoices.filter((i: IInvoice) => i.status === 'PAGADA');
      this.invoicesNull = this.allInvoices.filter((i: IInvoice) => i.status === 'ANULADA');
      return;
    }

    const filtered = this.allInvoices.filter(o => {
      const id = (o._id || '').toString().toLowerCase();
      // you can add more searchable fields here (client name, seller, etc.)
      return id.includes(q) || id.includes(q);
    });

    this.invoicesComplete = filtered.filter((i: IInvoice) => i.status === 'PAGADA');
    this.invoicesNull = filtered.filter((i: IInvoice) => i.status === 'ANULADA');

  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  toggleNull() {
    this.showNull = !this.showNull;
  }
}
