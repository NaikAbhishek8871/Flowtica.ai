import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-integrations',
  imports: [CommonModule,FormsModule],
  templateUrl: './integrations.html',
  styleUrl: './integrations.css',
})
export class Integrations {
isInstagramConnected = false;

  connectInstagram() {
    this.isInstagramConnected = !this.isInstagramConnected;
    alert(this.isInstagramConnected ? 'Instagram Connected ✅' : 'Instagram Disconnected ❌');
  }
}

