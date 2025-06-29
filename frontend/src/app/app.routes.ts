import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserSitesComponent } from './pages/user-sites/user-sites.component';
import { AddWebsiteComponent } from './pages/add-website/add-website.component';
import { SitesStatusComponent } from './pages/sites-status/sites-status.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ou vers login plus tard
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'add-website', component: AddWebsiteComponent},
  { path: 'users-list', component:UsersListComponent},
  { path: 'user-sites', component:UserSitesComponent},
  { path: 'sites-status', component: SitesStatusComponent },
  { path: 'profile', component: ProfileComponent }

  // tu ajouteras ensuite : { path: 'login', component: LoginComponent }, etc.
];
