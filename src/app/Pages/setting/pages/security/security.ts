import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-security',
  imports: [CommonModule,FormsModule],
  templateUrl: './security.html',
  styleUrl: './security.css',
})
export class Security {
password = { current: '', new: '', confirm: '' };
  showPassword = { current: false, new: false, confirm: false };
  message = { type: '', text: '' };

  get hasMinLength() {
    return this.password.new.length >= 8;
  }

  get hasUpper() {
    return /[A-Z]/.test(this.password.new);
  }

  get hasNumberOrSymbol() {
    return /[\d\W]/.test(this.password.new);
  }

  get isPasswordValid() {
    return this.hasMinLength && this.hasUpper && this.hasNumberOrSymbol;
  }

  toggleVisibility(field: 'current' | 'new' | 'confirm') {
    this.showPassword[field] = !this.showPassword[field];
  }

  changePassword() {
    this.message = { type: '', text: '' };

    if (!this.isPasswordValid) {
      this.showMessage('error', 'The new password does not meet all security requirements.');
      return;
    }

    if (this.password.new !== this.password.confirm) {
      this.showMessage('error', 'New passwords do not match. Please try again.');
      return;
    }
    
    this.showMessage('success', 'Your password has been successfully updated.');
    this.password = { current: '', new: '', confirm: '' };
    this.showPassword = { current: false, new: false, confirm: false };
  }

  forgotPassword() {
    this.showMessage('info', 'A password reset link has been sent to your email.');
  }

  showMessage(type: 'success' | 'error' | 'info', text: string) {
    this.message = { type, text };
    setTimeout(() => {
      if (this.message.text === text) {
        this.message = { type: '', text: '' };
      }
    }, 5000);
  }
}

