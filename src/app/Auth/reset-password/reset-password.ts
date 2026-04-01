 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Authservice } from '../../Core/Services/AuthService/authservice';

@Component({
selector: 'app-reset-password',
standalone: true,
imports: [CommonModule, ReactiveFormsModule, RouterLink],
templateUrl: './reset-password.html',
styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {

resetForm!: FormGroup;

errorMessage: string = '';
successMessage: string = '';
isLoading: boolean = false;

showNewPassword: boolean = false;
showConfirmPassword: boolean = false;

constructor(
private fb: FormBuilder,
private authService: Authservice,
private route: ActivatedRoute,
private router: Router
) {}

ngOnInit(): void {


// create form
this.resetForm = this.fb.group({
  newPassword: ['', [Validators.required, Validators.minLength(8)]],
  confirmPassword: ['', [Validators.required]]
});

// get token from URL
const token = this.route.snapshot.queryParamMap.get('token');

if (token) {
  localStorage.setItem('resetToken', token);
}


}

/* Toggle Password Visibility */

toggleNewPassword(): void {
this.showNewPassword = !this.showNewPassword;
}

toggleConfirmPassword(): void {
this.showConfirmPassword = !this.showConfirmPassword;
}

/* Reset Password API */

resetPassword(): void {


if (this.resetForm.invalid) {
  this.resetForm.markAllAsTouched();
  return;
}

const newPassword = this.resetForm.value.newPassword;
const confirmPassword = this.resetForm.value.confirmPassword;

// check password match
if (newPassword !== confirmPassword) {
  this.errorMessage = "Passwords do not match";
  return;
}

const token = localStorage.getItem('resetToken');

if (!token) {
  this.errorMessage = "Invalid or expired reset link";
  return;
}

this.isLoading = true;
this.errorMessage = '';

this.authService.resetPassword(token, newPassword)
  .subscribe({

    next: (res: any) => {

      this.isLoading = false;

      this.successMessage = "Password reset successfully. Redirecting to login...";

      localStorage.removeItem('resetToken');

      this.resetForm.reset();

      // redirect after 3 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    },

    error: (err) => {

      this.isLoading = false;

      this.errorMessage = err?.error || "Server error. Please try again!";
    }

  });


}

}
