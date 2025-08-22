import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SHARED_UI_IMPORTS } from '../../shared/ui-standalone';
import {
  TranslateService,
} from "@ngx-translate/core";
import { NotificationsService } from '../../services/notifications/notifications.service';
import { I18nService } from '../../services/i18n/i18n.service';
// import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

interface language {
  icon: string;
  code: string;
  name: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SHARED_UI_IMPORTS, MatProgressSpinnerModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  public signIn!: FormGroup
  public xPosition: MatSnackBarHorizontalPosition = 'end';
  public yPosition: MatSnackBarVerticalPosition = 'top';
  public isLoading = false;
  public showNotification = false;
  public languages: language[] = [];


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar, private translate: TranslateService, private notification: NotificationsService,
    private i18n: I18nService, private notificationsService: NotificationsService 
  ) {
    this.signIn = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // this.translate.addLangs(['de_DE', 'en_US']);
    // this.translate.setDefaultLang('en_US');
    // this.translate.use('en_US');

    this.languages = this.i18n.languages;
  }

  ngOnInit(): void {

  }

  /**
   * @description: Submit the sign-in form and authenticate the user with email and password.
   *
   * @memberof SignInComponent
   */
  public onSignInSubmit() {
    if (this.signIn.valid) {
      const { email, password } = this.signIn.value;
      this.isLoading = true;
      this.authService.signInWithEmail(email, password)
        .then(async result => {
          // console.log('Email sign-in success:', result.user);
          this.authService.saveUser(result.user);
          await this.authService.saveUserToSupabase(result.user);
          // this.isLoading = true;
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('Email sign-in error:', error.message);
          // Optional: show toast or error message
          // this._snackBar.open(this.translate.instant('SIGN_IN_FAILURE_L'), 'Splash', {
          //   horizontalPosition: this.xPosition,
          //   verticalPosition: this.yPosition,
          // });
          this.notificationsService.show('error', this.translate.instant('SIGN_IN_FAILURE_L', { error: error.message }) || 'Failed to sign in. Please try again later.');
        });
    }
  }

  /**
   * @description: Sign in with Google authentication.
   *
   * @memberof SignInComponent
   */
  public onGoogleSignIn() {
    this.isLoading = true;
    this.authService.signInWithGoogle()
      .then(async result => {
        const user = result.user;
        // console.log('Google sign-in successful:', user);
        localStorage.setItem('user', JSON.stringify(user));
        // TODO: Route to dashboard or save token
        this.authService.saveUser(result.user);
        await this.authService.saveUserToSupabase(result.user);
        // this.isLoading = true;
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Google sign-in error:', error);
      });
  }


  public changeLanguage(lang: string) {
    this.i18n.changeLanguage(lang);
    // this.showNotification = true;
    // this._snackBar.open(this.translate.instant('LANGUAGE_CHANGED'), 'Close', {
    //   horizontalPosition: this.xPosition,
    //   verticalPosition: this.yPosition,
    //   duration: 3000
    // });
  }
}
