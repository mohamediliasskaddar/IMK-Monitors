import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteService } from '../../services/site.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-admin-sites',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './admin-sites.component.html',
  styleUrls: ['./admin-sites.component.css']
})
export class AdminSitesComponent implements OnInit {
  private siteService = inject(SiteService);

  // Tous les sites avec leur dernier statut
  statuses: Array<{
    id: string;
    urlname: string;
    url: string;
    ownerName: string;
    ownerEmail: string;
    lastStatus: string;
    lastChecked: string | null;
    // plus besoin de checkInterval par site
  }> = [];

  // Pour le filtrage
  filter: 'all' | 'up' | 'down' = 'all';
  loading = true;
  error: string | null = null;

  // INTERVALLE GLOBAL
  globalInterval!: number;
  intervalLoading = true;
  intervalError: string | null = null;

  ngOnInit(): void {
    this.loadGlobalInterval();
    this.loadStatuses();
  }

  private loadGlobalInterval(): void {
    this.siteService.getCheckInterval().subscribe({
      next: cfg => {
        this.globalInterval = cfg.checkIntervalMinutes;
        this.intervalLoading = false;
      },
      error: err => {
        this.intervalError = err.error?.message || 'Failed to load interval';
        this.intervalLoading = false;
      }
    });
  }

  saveGlobalInterval(): void {
    if (this.globalInterval < 1) return;
    this.siteService.updateCheckIntervalValue(this.globalInterval).subscribe({
      next: () => {},
      error: err => alert(err.error?.message || 'Failed to update interval')
    });
  }

  loadStatuses(): void {
    this.loading = true;
    this.siteService.getAllSiteStatuses().subscribe({
      next: data => {
        this.statuses = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || 'Failed to load sites';
        this.loading = false;
      }
    });
  }

  get filteredStatuses() {
    if (this.filter === 'all') return this.statuses;
    return this.statuses.filter(s => s.lastStatus === this.filter);
  }

  onFilterChange(value: 'all'|'up'|'down') {
    this.filter = value;
  }
}
