import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../authentication/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, MatTooltipModule, RouterModule, TranslatePipe, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  public currentUser: string = '';
  public isNotificationPanelOpen = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  public toggleNotificationPanel() {
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
  }

  public closeNotificationPanel() {
    this.isNotificationPanelOpen = false;
  }

  public getUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.displayName || user.email || 'User' : 'Guest';
  }

  public getUserAvatar(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.photoURL || 'assets/avatars/avatar-1.png' : 'assets/avatars/avatar-2.png';
  }

  public getUserInitials(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      const name = user.displayName || user.email || 'User';
      const initials = name.split(' ').map((word: string) => word.charAt(0).toUpperCase()).join('');
      return initials;
    }
    return 'U'; // Default initial if no user is logged in
  }


  public getUserEmail(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      return user.email || 'No email provided';
    }
    return 'No user logged in';
  }
}
