import { Component } from '@angular/core';
import { TopBarComponent } from "./top-bar/top-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, TopBarComponent, SideBarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
