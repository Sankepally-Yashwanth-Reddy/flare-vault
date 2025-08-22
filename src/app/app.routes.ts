import { Routes } from '@angular/router';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './authentication/guards/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotesComponent } from './notes/notes.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
        path: '', component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'tasks', loadComponent: () => import('./tasks/tasks.component').then(m => m.TasksComponent)
            },
            {
                path: 'notes', loadComponent: () => import('./notes/notes.component').then(m => m.NotesComponent)
            },
            {
                path: 'settings', loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
            },
            {
                path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
            },
            {
                // Page Not Found Route
                path: '**', component: PageNotFoundComponent
            }
        ]
    }
];
