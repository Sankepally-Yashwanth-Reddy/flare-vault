// tasks-model.ts

import { TranslateService } from '@ngx-translate/core';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { FV_CONSTANTS } from '../constants/constants';
import { ActionButtonsRendererComponent } from '../common/action-buttons-renderer/action-buttons-renderer.component';

export class TasksModel {
  private fvConstants = FV_CONSTANTS;

  constructor(private translate: TranslateService) {}

  public getTasksGridColumnDefs(
    onEdit: (row: any) => void,
    onDelete: (row: any) => void
  ): ColDef[] {
    return [
      {
        field: 'select',
        headerName: '',
        checkboxSelection: true,
        width: 50,
        headerCheckboxSelection: true,
        minWidth: 50,
        filter: false,
        sortable: false,
        resizable: false,
      },
      {
        field: this.translate.instant("TITLE_L"),
        headerName: this.fvConstants.TITLE_C,
        minWidth: 200,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 150,
        cellRenderer: ActionButtonsRendererComponent,
        cellRendererParams: {
          onEdit,
          onDelete,
        },
        sortable: false,
        filter: false,
        resizable: false,
      },
      { field: 'description', headerName: this.fvConstants.DESCRIPTION_C, minWidth: 300 },
      { field: 'status', headerName: this.fvConstants.STATUS_C, minWidth: 120 },
      { field: 'priority', headerName: this.fvConstants.PRIORITY_C, minWidth: 120 },
      { field: 'due_date', headerName: this.fvConstants.DUE_DATE_C, minWidth: 150 },
      {
        field: 'tags',
        headerName: this.fvConstants.TAGS_C,
        minWidth: 150,
        valueFormatter: (params) => params.value?.join(', '),
      },
      { field: 'created_at', headerName: this.fvConstants.CREATED_AT_C, minWidth: 150 },
      { field: 'updated_at', headerName: this.fvConstants.UPDATED_AT_C, minWidth: 150 },
    ];
  }

  public TASKS_GRID_DEFAULT_COL_DEF: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
    filter: true,
  };

  public readonly TASKS_ROW_SELECTION: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };
}
