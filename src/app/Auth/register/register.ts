 import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Authservice } from '../../Core/Services/AuthService/authservice';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
selector:'app-register',
standalone:true,
imports:[CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
templateUrl:'./register.html',
styleUrls:['./register.css']
})

export class Register {

registerForm!: FormGroup;

isLoading=false;

errorMessage='';

successMessage='';

showPassword=false;

constructor(
private fb:FormBuilder,
private authService:Authservice,
private router:Router
){

this.registerForm=this.fb.group({

userName:['',Validators.required],

userLoginId:['',Validators.required],

email:['',[Validators.required,Validators.email]],

userLoginPassword:['',[Validators.required,Validators.minLength(8)]]

});

}

togglePassword(){

this.showPassword=!this.showPassword;

}

registerUser(){

if(this.registerForm.invalid){

this.registerForm.markAllAsTouched();

return;

}

this.isLoading=true;

const body={

id:0,

userName:this.registerForm.value.userName,

userLoginId:this.registerForm.value.userLoginId,

email:this.registerForm.value.email,

userLoginPassword:this.registerForm.value.userLoginPassword

};

this.authService.registerUser(body).subscribe({

next:(response:any)=>{

this.isLoading=false;

this.successMessage="User Registered Successfully";

this.registerForm.reset();

setTimeout(()=>{

this.router.navigate(['/login']);

},1500);

},

error:(error)=>{

this.isLoading=false;

this.errorMessage="Registration Failed";

}

});

}

}