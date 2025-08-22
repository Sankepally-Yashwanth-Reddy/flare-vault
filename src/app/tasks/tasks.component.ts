import {
  Component,
  OnInit,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { SHARED_UI_IMPORTS } from '../shared/ui-standalone';
import { Title } from '@angular/platform-browser';
import { TasksService } from '../services/tasks/tasks.service';
import {
  ClientSideRowModelModule,
  GridApi,
  ModuleRegistry,
  RowSelectionModule,
  ValidationModule,
  NumberFilterModule,
  TextFilterModule,
  PaginationModule,
  ColDef,
} from 'ag-grid-community';
import {
  getTasksGridColumnDefs,
  TASKS_GRID_DEFAULT_COL_DEF,
  TASKS_ROW_SELECTION,
} from '../shared/templates/tasks-template';
import {
  MatDialog,
} from '@angular/material/dialog';
import { NotificationsService } from '../services/notifications/notifications.service';
import { AutofocusDirective } from '../directives/autofocus/autofocus.directive';
import { TasksModel } from '../shared/models/tasks-modal';
import { TranslateService } from '@ngx-translate/core';

ModuleRegistry.registerModules([
  RowSelectionModule,
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
  ...(process.env['NODE_ENV'] !== 'production' ? [ValidationModule] : []),
]);

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [...SHARED_UI_IMPORTS, AutofocusDirective],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TasksComponent implements OnInit {
  private tasksModel!: TasksModel;
  public tasks: any[] = [];
  public rowData: any[] = this.tasks;
  public loading = false;

  public columnDefs: ColDef[];
  public defaultColDef = TASKS_GRID_DEFAULT_COL_DEF;
  public rowSelection = TASKS_ROW_SELECTION;

  public isListView = true;
  public isGridView = false;
  public isKanbanView = false;
  public showTaskDialog = false;
  public showNotification = false;
  public animateRefreshIconTime = 0;
  public paginationSize = signal<number>(20);

  public newTask: any = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: null,
    tagsString: '',
    notifications_enabled: true,
  };

  constructor(
    private title: Title,
    private tasksService: TasksService,
    public dialog: MatDialog,
    private notifications: NotificationsService,
    private translate: TranslateService
  ) {
    this.columnDefs = getTasksGridColumnDefs(
      this.translate,
    );
  }

  ngOnInit(): void {
    this.title.setTitle('FlareVault - Tasks');
    this.getTasks();
  }

  public getTasks(): void {
    this.loading = true;
    this.tasksService
      .getTasksForCurrentUser()
      .then((tasks) => {
        this.rowData = tasks;
      })
      .catch((error) => {
        this.notifications.show(
          'error',
          error.message || 'Failed to fetch tasks. Please try again later.'
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }

  public toggleView(view: 'list' | 'grid' | 'kanban'): void {
    this.isListView = view === 'list';
    this.isGridView = view === 'grid';
    this.isKanbanView = view === 'kanban';
    this.refreshTasks();
  }

  /**
   * @description Submits a new task to the server.
   * Validates the task title and constructs the payload
   * @return {*}  {Promise<void>}
   * @memberof TasksComponent
   */
  async submitTask(): Promise<void> {
    // Validate the task title before submission
    if (!this.newTask.title?.trim()) {
      this.notifications.show('error', 'Title is required.');
      return;
    }

    // Construct the task payload
    const taskPayload = {
      ...this.newTask,
      tags:
        this.newTask.tagsString
          ?.split(',')
          .map((tag: string) => tag.trim())
          .filter(Boolean) || [],
    };

    // Remove tagsString from the payload as it's not needed for the API
    delete taskPayload.tagsString;

    // Call the service to create the task
    const created = await this.tasksService.createTask(taskPayload);

    if (created) {
      this.getTasks();
      this.resetTaskForm();
      this.notifications.show('success', 'Task created successfully.');
    } else {
      this.notifications.show(
        'error',
        'Task creation failed. Please try again.'
      );
    }
  }

  resetTaskForm(): void {
    this.newTask = {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      due_date: null,
      tagsString: '',
      notifications_enabled: true,
    };
  }

  editTask(row: any): void {
    console.log('Edit:', row);
  }

  deleteTask(row: any): void {
    console.log('Delete:', row);
  }

  public refreshTasks(): void {
    this.animateRefreshIconTime = Date.now();
    this.getTasks();
    this.loading = true;

    setTimeout(() => {
      this.animateRefreshIconTime = 0;
    }, 1000);
  }
}
