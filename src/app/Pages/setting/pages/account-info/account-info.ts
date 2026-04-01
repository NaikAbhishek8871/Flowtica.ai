import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-info',
  imports: [CommonModule,FormsModule],
  templateUrl: './account-info.html',
  styleUrl: './account-info.css',
})
export class AccountInfo {
user = {
    name: 'Abhishek Naik',
    email: 'abhishek@gmail.com',
    avatar: 'https://i.pravatar.cc/100',
    username: 'abhishek_naik',
    mobile: '9525969688',
    age: 28,
    dob: '1996-01-01'
  };

  updateProfile() {
    alert('Profile Updated ✅');
  }

}
