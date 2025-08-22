import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterModule } from '@angular/router';

interface navItem {
  icon: string;
  route: string;
  label: string;
  isDisabled?: boolean;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatTooltipModule, MatIconModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {

  isSidebarOpen: boolean = false;

  public navItems: navItem[] = [
    { icon: 'fv-home-color-icon', route: '/home', label: 'Home', isDisabled: false },
    { icon: 'fv-tasks-svg-icon', route: '/tasks', label: 'Tasks', isDisabled: false },
    // { icon: 'fv-note-book-icon', route: '/notes', label: 'Notes', isDisabled: false },
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
