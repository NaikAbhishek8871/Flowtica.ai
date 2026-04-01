 import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Authservice } from '../../Core/Services/AuthService/authservice';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  loginForm!: FormGroup;
  showPassword = false;
  errorMessage = '';
  isLoading = false;
  toastr: any;

  constructor(
    private authService: Authservice,
    private fb: FormBuilder,
     private router: Router
  ) {


    this.loginForm = this.fb.group({
      userLoginIdOremail: ['', Validators.required],
      userLoginPassword: ['', [Validators.required, Validators.minLength(8)]]
    });


  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
   loginUser() {

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  this.errorMessage = '';

  const { userLoginIdOremail, userLoginPassword } = this.loginForm.value;

  this.authService.login(userLoginIdOremail, userLoginPassword).subscribe({

    next: (response: any) => {

  this.isLoading = false;

  if (response.accessToken) {
    this.authService.setToken(response.accessToken); // ✅ FIXED
  }

  this.router.navigate(['app/dashboard']);
},

    error: (error) => {

      this.isLoading = false;

      if (error.status === 401) {
        this.errorMessage = "Invalid Login Credentials";
      } else {
        this.errorMessage = "Server Error. Please try again.";
      }
    }
  });
}}