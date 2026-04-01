import { Component, Input, HostListener, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar  {

  @Input() isOpen: boolean = true;
  @Input() sidebarMode: 'vertical' = 'vertical';

  @Output() closeSidebar = new EventEmitter<void>();

  plan: 'Free' | 'Creator' | 'Pro' = 'Creator';

  user = {
    name: 'Abhishek',
    email: 'abhishek@email.com',
    avatar: 'https://i.pravatar.cc/40'
  };

  private isMobile = window.innerWidth <= 768;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.closeSidebar.emit(); // 🔥 trigger parent to close
    }
  }
}
