import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { SHARED_UI_IMPORTS } from '../../ui-standalone';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [...SHARED_UI_IMPORTS],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() title = 'Dialog';
  @Input() show = false;
  @Output() closed = new EventEmitter<void>();


  close() {
    this.closed.emit();
  }
}
