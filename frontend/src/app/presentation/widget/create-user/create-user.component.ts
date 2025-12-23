import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  private fb = inject(FormBuilder);

  @Output() create = new EventEmitter<{ username: string; password: string; role: string }>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-]{2,50}$')]],
    password: ['', [Validators.required]],
    role: ['Vendedor'],
  });

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.create.emit({
      username: (this.form.value.username) ?? '',
      role: (this.form.value.role) ?? 'Vendedor',
      password: (this.form.value.password) ?? '',
    });
    this.form.reset({ role: 'Vendedor' });
  }

  onCancel() {
    this.cancel.emit();
  }
  
}
