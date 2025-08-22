import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  public signUp!: FormGroup

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private notifications: NotificationsService
  ) {
    this.signUp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  public passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { notMatching: true };
  }
  
  public onSignUpSubmit() {
    if (this.signUp.valid) {
      const { email, password, confirmPassword } = this.signUp.value;
  
      if (password !== confirmPassword) {
        this.notifications.show('error', 'Passwords do not match');
        return;
      }
  
      this.authService.signUpWithEmail(email, password)
        .then(async result => {
          const user = result.user;
          console.log('Email sign-up success:', result.user);
          this.authService.saveUser(result.user);
          await this.authService.saveUserToSupabase(result.user);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Sign-up error:', error.message);
          this.notifications.show('error', error.message || 'Failed to sign up. Please try again later.');
        });
    }
  }
  
  public onGoogleSignIn() {
    this.authService.signInWithGoogle()
      .then(async result => {
        const user = result.user;
        this.authService.saveUser(result.user);
        await this.authService.saveUserToSupabase(result.user);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Google sign-up error:', error);
      });
  }  
}
