import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.scss']
})
export class CreateClienteComponent {
  private fb = inject(FormBuilder);
  //private createRequest = new CreateProductRequest();

  saving = false;

  @Output() create = new EventEmitter<{ name: string; email: string; phone: string; address: string, cedula: string }>();
  @Output() cancel = new EventEmitter<void>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{3,100}$')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/i)]],
    phone: ['', [ Validators.required, Validators.pattern('^\\d{11}$') ]],
    address: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{4,200}$') ]],
    cedula: ['', [ Validators.required, Validators.pattern('^\\d{1,9}$') ]],
  }); 

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.create.emit({
      name: (this.form.value.name) ?? '',
      email: (this.form.value.email) ?? '',
      phone: (this.form.value.phone) ?? '',
      address: (this.form.value.address) ?? '',
      cedula: (this.form.value.cedula) ?? ''
    });
    this.form.reset({});
  }

  onCancel() {
    this.cancel.emit();
  }
}
