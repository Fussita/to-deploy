import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from '../../widget/create-user/create-user.component';
import { EditarUsuarioComponent } from '../../widget/editar-usuario/editar-usuario.component';
import { IUser } from '../../../interfaces/user';
import { UsersRequest } from '../../../services/users.services';
import { PopUpService } from '../../services/toast';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    CreateUserComponent,
    EditarUsuarioComponent,
    ReactiveFormsModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  
  users: IUser[] = []
  showCreateForm = false;
  editingUser: IUser | null = null;
  private allUsers: IUser[] = [];
  userService = inject(UsersRequest)  
  private popup = inject(PopUpService)
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
    this.userService.findAll().subscribe({
      next: (e: any) => {
        this.users = e
        console.log(e)
        this.allUsers = Array.isArray(e) ? e : [];
      }
    })
  }
  openCreateUser() {
     this.showCreateForm = true; }

  closeCreateUser() {
     this.showCreateForm = false; }

  onCreate(newUser: { username: string, password: string, role: string }) {
    this.userService.registerUser({ ...newUser }).subscribe({
      next: (e: any) => {
        this.popup.showSuccess('Usuario agregado')
        this.gets()
      },
      error: (e: any) => {
        this.popup.showError(e.error.message)
      }
    })
    this.showCreateForm = false;
  }

  deleteUser(id: string) {
    const ok = window.confirm('¿Estás seguro que deseas eliminar este usuario?')
    if (!ok) return
    this.userService.delete(id).subscribe({
      next: (e: any) => {
        this.popup.showSuccess('Usuario eliminado')
        this.gets()
      },
      error: (e: any) => {
        this.popup.showError(e?.error?.message || 'Error al eliminar usuario')
      }
    })  
  }

  editUser(id: string) {
    const found = this.users.find(u => u._id === id)
    if (found) { this.editingUser = found; return }
    this.userService.findAll().subscribe({
      next: (list: any) => {
        const f = (list as IUser[]).find(u => u._id === id)
        if (f) this.editingUser = f
      },
      error: () => this.popup.showError('No se pudo cargar el usuario para editar')
    })
  }

  handleEditSaved(result: any) {
    this.editingUser = null
    this.gets()
  }

   applyLocalFilter() {
    const q = (this.inpSearch.value || '').toString().toLowerCase().trim();
    if (!q) {
      // restore full list
      this.users = [...this.allUsers];
      return;
    }

    this.users = this.allUsers.filter(p => {
      const name = (p.username || '').toString().toLowerCase();
      return name.includes(q);
    });
  }
}
