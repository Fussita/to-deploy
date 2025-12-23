import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PopUpService } from '../../services/toast';
import { AuthRequest } from '../../../services/auth.services';
import { UserStore } from '../../../config/use-store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private popup = inject(PopUpService);
  private authService = inject(AuthRequest)

  ngOnInit() {}

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  submitting = false;

  onSubmit() {
    if (this.form.invalid) {
      this.popup.showError('Ingrese usuario y contraseña');
      return;
    }

    this.submitting = true;
    const { username, password } = this.form.value as { username: string; password: string };

    this.authService.login({
      username: username,
      password: password
    }).subscribe({
      next: (e: any) => {
        const user = UserStore.getInstance()
        user.setUser({ token: e.token, ...e.user })
        this.popup.showSuccess('Ingreso exitoso')
        this.router.navigateByUrl('/home')
      },
      error: (e) => {
        this.submitting = false;
        this.popup.showError(e.error.message);
      }
    })

  }
}
