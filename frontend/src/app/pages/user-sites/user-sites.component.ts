import { Component, OnInit, inject } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-sites.component.html',
  styleUrls: ['./user-sites.component.css']
})
export class UserSitesComponent implements OnInit {
  siteService = inject(SiteService);

  sites: any[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.fetchSites();
  }

  fetchSites() {
    this.siteService.getMySites().subscribe({
      next: (data) => {
        this.sites = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load sites';
        this.loading = false;
      }
    });
  }
}
