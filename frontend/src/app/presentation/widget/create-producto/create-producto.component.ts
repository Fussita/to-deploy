import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../../interfaces/product';

@Component({
  selector: 'app-create-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.scss']
})
export class CreateProductoComponent {
  private fb = inject(FormBuilder);
  saving = false;

  @Output() create = new EventEmitter<{ name: string; price: number; stock: number; description: string, iva: boolean }>();
  @Output() close = new EventEmitter<void>();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{2,100}$')]],
    price: [1, [Validators.required, Validators.min(1)]],
    stock: [1, [Validators.required, Validators.min(1)]],
    description: ['', [ Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,\\.\\-áéíóúÁÉÍÓÚñÑüÜ]{8,200}$') ]],
    iva: [true] 
  });

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.create.emit({
      name: (this.form.value.name) ?? '',
      description: (this.form.value.description) ?? '',
      price: (this.form.value.price) ?? 0,
      stock: (this.form.value.stock) ?? 0,
      iva: (this.form.value.iva) ?? true
    });
    this.form.reset({});
  }


  onClose() {
    this.close.emit();
  }
}
