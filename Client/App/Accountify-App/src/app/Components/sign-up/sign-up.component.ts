import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,                // For common directives
    ReactiveFormsModule,          // For reactive forms
    MatFormFieldModule,           // Material form field
    MatInputModule,               // Material input field
    MatButtonModule,              // Material buttons
    MatCardModule,                 // Material card
    TranslateModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  goBack() {
    this.router.navigate(['']);  // Change '/home' to your desired route
  }
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder , private router:Router) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    });
  }

  // Submit function
  onSubmit(): void {
    if (this.signUpForm?.valid) {
      console.log(this.signUpForm.value);  // Handle sign-up logic
    } else {
      console.log('Form is invalid');
    }
  }

  // Helper to access form controls easily in the template
   get f() {
    return this.signUpForm?.controls;
  }
}
