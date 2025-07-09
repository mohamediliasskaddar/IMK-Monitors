
import { Component, OnInit, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebare/sidebare.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { AddWebsiteComponent } from '../add-website/add-website.component';
import { UserSitesComponent } from '../user-sites/user-sites.component';
import { SitesStatusComponent } from '../sites-status/sites-status.component';
import { ProfileComponent } from '../profile/profile.component';
import { AdminSitesComponent } from "../admin-sites/admin-sites.component";
import { LoginComponent } from "../login/login.component";
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf,
    SidebarComponent,
    UsersListComponent,
    AddWebsiteComponent,
    UserSitesComponent,
    SitesStatusComponent,
    ProfileComponent, AdminSitesComponent,
   LoginComponent,
   NavbarComponent,
    ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedSection = '';
  userRole: string | null = null;

  private platformId = inject(PLATFORM_ID); // Pour savoir si on est dans le navigateur

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Ceci ne sera exécuté que dans le navigateur
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      //added
       console.log('User from localStorage:', user);
      if (user && user.role) {
      this.userRole = user.role;
      this.selectedSection = user.role === 'admin' ? 'users-list' : 'add-website';
      console.log('User role:', this.userRole);
      console.log('Selected section:', this.selectedSection);
    } else {
      console.log('No user role found.');
    }
    }
  }

  onSectionSelected(section: string) {
    this.selectedSection = section;
  }
}
