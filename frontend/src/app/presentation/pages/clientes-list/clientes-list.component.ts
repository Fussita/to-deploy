import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientCardComponent } from '../../widget/client-card/client-card.component';
import { CreateClienteComponent } from '../../widget/create-cliente/create-cliente.component';
import { EditarClienteComponent } from '../../widget/editar-cliente/editar-cliente.component';
import { ClientRequest } from '../../../services/client.services';
import { PopUpService } from '../../services/toast';
import { IClient } from '../../../interfaces/client';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { UserStore } from '../../../config/use-store';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    ClientCardComponent,
    CreateClienteComponent,
    EditarClienteComponent,
    ReactiveFormsModule],
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent {
  clients: IClient[] = [];
  clientService = inject(ClientRequest)
  private allClients: IClient[] = [];
  private popup = inject(PopUpService)
  editingClient: any = null;
  inpSearch = new FormControl('')
  private searchSub?: Subscription;
  
  user = UserStore.getInstance()

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
    this.clientService.findAll().subscribe({
      next: (e: any) => {
        this.clients = e
        this.allClients = Array.isArray(e) ? e : [];
      }
    })
  }
  showCreateClient = false;
  openCreateUser() { this.showCreateClient = true; }
  closeCreateClient() {  this.showCreateClient = false; }

  onCreateCliente(newClient: { name: string; email: string; phone: string; address: string, cedula: string }) {
    this.clientService.createClient({ ...newClient }).subscribe({
      next: (e: IClient) => {
        this.popup.showSuccess('Cliente agregado')
        this.gets()
      },
      error: (e: any) => {
        this.popup.showError(e?.error?.message || 'Error al crear cliente')
      }
    })
    this.showCreateClient = false;
  }

  onDelete(id: string) {
    const ok = window.confirm('¿Estás seguro que deseas eliminar este cliente?')
    if (!ok) return
    this.clientService.deleteClient(id).subscribe({
      next: () => {
        this.popup.showSuccess('Cliente eliminado')
        this.gets()
      },
      error: (e: any) => {
        this.popup.showError(e?.error?.message || 'Error al eliminar cliente')
      }
    })
  }

  onEdit(id: string) {
    // open editar modal with the client object
    const found = this.clients.find(c => c._id === id)
    if (found) {
      this.editingClient = found
      return
    }

    // if not found in local list, fetch from backend
    this.clientService.findAll().subscribe({
      next: (list: IClient[]) => {
        const f = list.find(c => c._id === id)
        if (f) this.editingClient = f
      },
      error: () => {
        this.popup.showError('No se pudo cargar el cliente para editar')
      }
    })
  }

  onEditSaved(result: any) {
    this.editingClient = null
    this.gets()
  }

  applyLocalFilter() {
    const q = (this.inpSearch.value || '').toString().toLowerCase().trim();
    if (!q) {
      // restore full list
      this.clients = [...this.allClients];
      return;
    }

    this.clients = this.allClients.filter(p => {
      const name = (p.name || '').toString().toLowerCase();
      return name.includes(q) || (p.email || '').toString().toLowerCase().includes(q) || (p.cedula || '').toString().toLowerCase().includes(q);
    });
  }

}

