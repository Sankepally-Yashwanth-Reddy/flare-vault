import { TranslateService } from '@ngx-translate/core';
import { ColDef, RowSelectionOptions } from 'ag-grid-community';
import { FV_CONSTANTS } from '../constants/constants';
import { ActionButtonsRendererComponent } from '../common/action-buttons-renderer/action-buttons-renderer.component';


let fvConstants = FV_CONSTANTS

// Make this a function that returns the column defs with handlers passed in

export function getTasksGridColumnDefs(
  translate: TranslateService,
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
      field: 'title',
      headerName: translate.instant('TITLE_L'),
      minWidth: 200,
    },
    {
      field: 'actions',
      headerName: translate.instant('ACTIONS_L'),
      minWidth: 150,
      cellRendererSelector: () => {
        return { component: 'actionButtonsTemplate' };
      },
      sortable: false,
      filter: false,
      resizable: false,
    },    
    { field: 'description', headerName: translate.instant("DESCRIPTION_L"), minWidth: 300 },
    { field: 'status', headerName: translate.instant("STATUS_L"), minWidth: 120 },
    { field: 'priority', headerName: translate.instant("PRIORITY_L"), minWidth: 120 },
    { field: 'due_date', headerName: translate.instant("DUE_DATE_L"), minWidth: 150 },
    {
      field: 'tags',
      headerName: translate.instant("TAGS_L"),
      minWidth: 150,
      valueFormatter: (params) => params.value?.join(', '),
    },
    { field: 'created_at', headerName: translate.instant("CREATED_AT_L"), 
      minWidth: 150 },
    { field: 'updated_at', headerName: translate.instant("UPDATED_AT_L"), 
      minWidth: 150 },
  ];
}


export const TASKS_GRID_DEFAULT_COL_DEF: ColDef = {
  flex: 1,
  minWidth: 100,
  sortable: true,
  resizable: true,
  filter: true,
};

export const TASKS_ROW_SELECTION: RowSelectionOptions | 'single' | 'multiple' = {
  mode: 'multiRow',
};