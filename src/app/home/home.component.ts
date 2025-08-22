import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SHARED_UI_IMPORTS } from '../shared/ui-standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...SHARED_UI_IMPORTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private title: Title) {}
  
  ngOnInit(): void {
    this.title.setTitle('FlareVault - Home');
  }
}
