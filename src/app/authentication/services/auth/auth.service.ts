import { Inject, Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../../../environment';
import { Router } from '@angular/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  environment.supabase.url,
  environment.supabase.key
)

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseApp = initializeApp(environment.firebase);
  private auth: Auth = getAuth(this.firebaseApp);
  public user: any;

  constructor(private router: Router) { }

  public signInWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  public signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public signUpWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Optional: store user in localStorage
  public saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  async saveUserToSupabase(user: any) {
    const metadata = user.metadata || {};
  
    const userData = {
      id: user.uid,
      email: user.email,
      email_verified: user.emailVerified,
      created_at: metadata.creationTime ? new Date(metadata.creationTime).toISOString() : new Date().toISOString(),
      last_login_at: metadata.lastSignInTime ? new Date(metadata.lastSignInTime).toISOString() : new Date().toISOString(),
      provider: user.providerData?.[0]?.providerId || 'unknown'
    };
  
    const { error } = await supabase
      .from('users')
      .upsert(userData);
  
    if (error) {
      console.error('[🔥 Supabase Error] Failed to save user:', error);
    } else {
      // console.log('[✅ Supabase] User saved/updated');
    }
  }
  

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }

  public getCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('[🔥 AuthService] Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  public isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return user !== null && user !== undefined;
  }

  public getUserAvatar(): string {
    const user = this.getCurrentUser();
    if (user && user.photoURL) {
      return user.photoURL;
    }
    return 'assets/images/avatar.png'; // Default avatar
  }

  /**
   * @description: Get the initials of the current user.
   *
   * @return {*}  {string}
   * @memberof AuthService
   */
  public getUserInitials(): string {
    const user = this.getCurrentUser();
    if (user) {
      const name = user.displayName || user.email || 'User';
      const initials = name.split(' ').map((word: string) => word.charAt(0).toUpperCase()).join('');
      return initials;
    }
    return 'U'; // Default initial if no user is logged in
  }

  public getUserEmail(): string {
    const user = this.getCurrentUser();
    if (user) {
      return user.email || 'No email provided';
    }
    return 'No user logged in';
  }

  public getUserDisplayName(): string {
    const user = this.getCurrentUser();
    if (user) {
      return user.displayName || user.email || 'User';
    }
    return 'Guest'; // Default display name if no user is logged in
  }
}
