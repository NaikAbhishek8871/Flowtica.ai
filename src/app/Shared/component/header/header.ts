import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../models/App.models';
 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {

  private router = inject(Router);
  private elRef = inject(ElementRef);

  @Input() isOpen: boolean = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  showUserMenu = false;

  user: User = {
    name: 'Abhishek',
    email: 'abhishek@email.com',
    avatar: ''
  };

  // 👉 Default LIGHT MODE
  isDarkMode = false;

  ngOnInit() {
    // 🌞 Default = LIGHT
    document.body.classList.add('light-theme');
  }

  onToggle() {
    this.toggleSidebar.emit();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  // 🎯 TOGGLE ONLY (NO STORAGE)
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    const body = document.body;

    if (this.isDarkMode) {
      body.classList.remove('light-theme'); // 🌑 DARK
    } else {
      body.classList.add('light-theme'); // ☀️ LIGHT
    }
  }

  onLogout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showUserMenu = false;
    }
  }
}