import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStore } from '../../../config/use-store';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent {
  @Input() client: { _id?: string; name?: string; email?: string; phone?: string; address?: string } | null = null;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  user = UserStore.getInstance()

  
}
