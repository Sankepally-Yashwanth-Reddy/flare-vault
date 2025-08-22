import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/services/auth/auth.service';

const supabase = createClient(
  environment.supabase.url,
  environment.supabase.key
)

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  /*
  create table public.tasks (
  id uuid not null default gen_random_uuid (),
  user_id text not null,
  title text not null,
  description text null,
  status text null default 'todo'::text,
  priority text null default 'medium'::text,
  due_date timestamp with time zone null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  tags text[] null,
  attachments jsonb null,
  checklist jsonb null,
  notifications_enabled boolean null default true,
  constraint tasks_pkey primary key (id),
  constraint tasks_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE,
  constraint tasks_priority_check check (
    (
      priority = any (array['low'::text, 'medium'::text, 'high'::text])
    )
  ),
  constraint tasks_status_check check (
    (
      status = any (
        array['todo'::text, 'in_progress'::text, 'done'::text]
      )
    )
  )
) TABLESPACE pg_default;
  */

  constructor(private http: HttpClient, private authService: AuthService) { }

  async getTasksForCurrentUser(filters: { status?: string, priority?: string } = {}): Promise<any[]> {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser?.uid) {
      console.warn('[⚠️ TasksService] No current user found');
      return [];
    }

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', currentUser.uid)
      .order('due_date', { ascending: true });

    if (filters.status) query = query.eq('status', filters.status);
    if (filters.priority) query = query.eq('priority', filters.priority);

    const { data, error } = await query;

    if (error) {
      console.error('[🔥 Supabase Error] Failed to fetch tasks:', error);
      return [];
    }

    return data || [];
  }


  // create task
  async createTask(task: any): Promise<boolean> {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser?.uid) {
      console.warn('[⚠️ TasksService] No current user found');
      return false;
    }

    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...task,
        user_id: currentUser.uid,
        created_at: now,
        updated_at: now,
      });

    if (error) {
      console.error('[🔥 Supabase Error] Failed to create task:', error);
      return false;
    }

    return true;
  }


  // edit (update) task
  async updateTask(taskId: string, updates: any): Promise<any> {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date()
      })
      .eq('id', taskId)
      .single();

    if (error) {
      console.error('[🔥 Supabase Error] Failed to update task:', error);
      return null;
    }

    return data;
  }

  // delete task
  async deleteTask(taskId: string): Promise<boolean> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('[🔥 Supabase Error] Failed to delete task:', error);
      return false;
    }

    return true;
  }

  async deleteBulkTasks(taskIds: string[]): Promise<boolean> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .in('id', taskIds);

    if (error) {
      console.error('[🔥 Supabase Error] Failed to bulk delete:', error);
      return false;
    }

    return true;
  }


}
