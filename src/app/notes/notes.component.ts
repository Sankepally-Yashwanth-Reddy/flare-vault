import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SHARED_UI_IMPORTS } from '../shared/ui-standalone';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [...SHARED_UI_IMPORTS],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  constructor(private title: Title,
  ) {}
  
  ngOnInit(): void {
    this.title.setTitle('FlareVault - Home');
  }
}
