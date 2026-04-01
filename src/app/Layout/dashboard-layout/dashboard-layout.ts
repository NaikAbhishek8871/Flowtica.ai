import { Component } from '@angular/core';
import { Header } from '../../Shared/component/header/header';
import { Footer } from '../../Shared/component/footer/footer';
import { Sidebar } from '../../Shared/component/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  imports: [Header, Footer, Sidebar, RouterOutlet,CommonModule],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
newsItem: string[] = [
  
  ];
    isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
 
}


