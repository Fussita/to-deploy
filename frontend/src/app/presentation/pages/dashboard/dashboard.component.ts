import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRequest } from '../../../services/reports.services';
import { OrderRequest } from '../../../services/order.services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  stats: {title: string, value: string}[] = [];

  monthlySales = [3200, 2750, 3800, 2000, 3100, 6100, 5800, 3100, 1220, 7600, 8200, 9000];
  maxMonthly = Math.max(...(this.monthlySales));
  monthlyNormalized = this.monthlySales.map(v => Math.round((v / this.maxMonthly) * 100));

  recentActivity: { label: string, amount: string, time: string } [] = []
  reportService = inject(ReportsRequest)
  orderService = inject(OrderRequest)

  reports: { 
    sellers: {cantidadOrdenes: number, usuario: string, role: string}[],
    client: { totalGastado:number, cliente: string, cedula: string, email: string }[],
    product: {ganancias: number, producto: string, precio: number}
  } | undefined 

  ngOnInit(): void {
    this.gets()
  }

  gets() {
    this.reportService.countAll().subscribe({
      next: (e: any) => {
        this.stats = [
          { title: 'Ingresos totales', value: `$ ${e.totalAmount}` },
          { title: 'Ventas completadas', value: e.invoices },
          { title: 'Clientes Registrados', value: e.clients },
          { title: 'Productos Registrados', value: e.products }
        ]
      }
    })

    this.reportService.topProducts().subscribe({
      next: (e: any) => {
        this.reports = e
      }
    })

    this.reportService.monthly().subscribe({
      next: (e: any) => {
        let newAl: number[] = []
        for (let i of [1,2,3,4,5,6,7,8,9,10,11,12]) {
          let find = e.find( (p: { month: number; }) => p.month == i )
          if (!find) newAl.push(0)
          else newAl.push( find.totalIncome )
        }
        this.monthlySales = newAl
        this.maxMonthly = Math.max(...(this.monthlySales));
        this.monthlyNormalized = this.monthlySales.map(v => Math.round((v / this.maxMonthly) * 100));
      }
    })

    this.orderService.findAllNoPaid().subscribe({
      next: (e: any) => {
        this.recentActivity = []
        for (let i of e) {
          this.recentActivity.push( { label: `Orden-${i.orderId}`, amount: `$${i.total}`, time: `${this.formatDate(i.date)}` }, )
        }

        if (this.recentActivity.length >= 4) {
          this.recentActivity = this.recentActivity.slice(0, 4) 
        }

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
  
}
