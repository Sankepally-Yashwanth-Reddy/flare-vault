import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SHARED_UI_IMPORTS } from '../../ui-standalone';

@Component({
  selector: 'app-action-buttons-renderer',
  standalone: true,
  imports: [...SHARED_UI_IMPORTS],
  templateUrl: './action-buttons-renderer.component.html',
  styleUrl: './action-buttons-renderer.component.scss'
})
export class ActionButtonsRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEdit(): void {
    if (this.params?.onEdit) {
      this.params.onEdit(this.params.data);
    }
  }

  onDelete(): void {
    if (this.params?.onDelete) {
      this.params.onDelete(this.params.data);
    }
  }
}
