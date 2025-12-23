import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserStore } from '../../../../config/use-store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 
  user = UserStore.getInstance()
  router = inject(Router)

  goWhere(url: string){
    this.router.navigateByUrl(url)
  }

  logout() {
    try {
      UserStore.getInstance().cleanUser();
    } catch (err) {
      // ignore
    }
    this.router.navigateByUrl('/login');
  }
}
