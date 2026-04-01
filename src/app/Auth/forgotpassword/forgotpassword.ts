import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authservice } from '../../Core/Services/AuthService/authservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,   // ⭐ IMPORTANT
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {

  forgotForm!: FormGroup;

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: Authservice
  ) {
    this.forgotForm = this.fb.group({
      LoginId: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {

    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const payload = this.forgotForm.value;

    this.authService.forgotPassword(payload.LoginId).subscribe({

  next: (res) => {

    this.isLoading = false;

    this.successMessage = "Reset password link sent to your email.";

    this.forgotForm.reset();

  },

  error: (err) => {

    this.isLoading = false;

    console.log(err);

    this.errorMessage = err.error || "Server error. Please try again.";

  }

});

  }
}