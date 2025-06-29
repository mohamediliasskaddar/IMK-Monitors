// import { Component, OnInit } from '@angular/core';
// import { SidebarComponent } from '../../shared/sidebare/sidebare.component';
// import { NgIf } from '@angular/common';
// import { UsersListComponent } from '../users-list/users-list.component';
// import { NewSiteComponent } from '../new-site/new-site.component';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [NgIf,
//     SidebarComponent,
//     UsersListComponent,
//     NewSiteComponent
//   ],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   userRole: string = '';       // ← ajouté
//   selectedSection = '';

//   ngOnInit(): void {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     this.userRole = user.role || '';

//     // Harmonise les noms :
//     this.selectedSection = this.userRole === 'admin'
//       ? 'users-list'   // doit correspondre à *ngIf*
//       : 'new-sites';
//   }

//   onSectionSelected(section: string) { 
//     this.selectedSection = section;
//   }
// }
import { Component, OnInit, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebare/sidebare.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { AddWebsiteComponent } from '../add-website/add-website.component';
import { UserSitesComponent } from '../user-sites/user-sites.component';
import { SitesStatusComponent } from '../sites-status/sites-status.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf,
    SidebarComponent, 
    UsersListComponent,
    AddWebsiteComponent,
    UserSitesComponent,
    SitesStatusComponent,
    ProfileComponent
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
