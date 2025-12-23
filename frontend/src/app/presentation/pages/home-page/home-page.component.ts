import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../widget/navbar/navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  showNavbar = false;

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  closeNavbar() {
    this.showNavbar = false;
  }
}
