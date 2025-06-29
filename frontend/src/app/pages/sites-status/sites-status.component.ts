import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-sites-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sites-status.component.html',
  styleUrls: ['./sites-status.component.css']
})
export class SitesStatusComponent implements OnInit {
  private siteService = inject(SiteService);
  statuses: Array<{ id: string; urlname: string; url: string; lastStatus: string; lastChecked: string }> = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.siteService.getSiteStatuses().subscribe({
      next: data => { this.statuses = data; this.loading = false; },
      error: err => { this.error = err.error?.message || 'Failed to load statuses'; this.loading = false; }
    });
  }
}
