import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
    // TranslateService,
    TranslatePipe,
    TranslateDirective
} from "@ngx-translate/core";
import { AgGridAngular } from "ag-grid-angular";
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  RowSelectionModule,
  RowSelectionOptions,
  ValidationModule,
} from "ag-grid-community";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CdkTrapFocus } from "@angular/cdk/a11y";
import { NgbOffcanvas, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';

ModuleRegistry.registerModules([
  RowSelectionModule,
  ClientSideRowModelModule,
  ...(process.env['NODE_ENV'] !== "production" ? [ValidationModule] : []),
]);

// app/shared/ui-standalone.ts
export const SHARED_UI_IMPORTS = [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    TranslatePipe,
    TranslateDirective,
    AgGridAngular,
    MatDialogModule,
    CdkTrapFocus,
    NgbOffcanvasModule,
];
  