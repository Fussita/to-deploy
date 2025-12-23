import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IUser } from '../../../interfaces/user';
import { UsersRequest } from '../../../services/users.services';
import { HttpErrorResponse } from '@angular/common/http';
import { PopUpService } from '../../services/toast';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent implements OnChanges {
  private fb = inject(FormBuilder)
  private userReq = inject(UsersRequest)
  private popup = inject(PopUpService)

  @Input() user?: IUser | null = null
  @Input() userId?: string | null = null
  @Output() saved = new EventEmitter<any>()
  @Output() cancelled = new EventEmitter<void>()

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-]{2,50}$')]],
    password: ['', Validators.required],
    role: ['user', Validators.required]
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.form.patchValue({
        username: this.user.username ?? '',
        password: this.user.password ?? '',
        role: this.user.role ?? 'user'
      })
    }
  }

  cancel() {
    this.cancelled.emit()
  }

  onSubmit() {
    const id = this.userId ?? this.user?._id
    if (!id) {
      this.saved.emit({ error: 'No user id provided' })
      return
    }

    const values = this.form.value
    const payload: any = {}
    ;['username','password','role'].forEach((k: string) => {
      const val = (values as any)[k]
      const original = (this.user as any)?.[k]
      if (val !== undefined && val !== null && val !== '' ) {
        if (original === undefined || val !== original) {
          payload[k] = val
        }
      }
    })

    if (Object.keys(payload).length === 0) {
      this.popup.showInfo('Sin cambios por guardar')
    }

    this.userReq.update(id, payload).subscribe({
      next: (res: any) => {
        this.popup.showSuccess('Cambios guardados')
        this.saved.emit()        
      },
      error: (err: HttpErrorResponse) => {
        this.popup.showError(err.error.message);
        this.saved.emit()
      }
    })
  }

}
