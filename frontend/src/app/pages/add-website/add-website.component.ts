import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../services/site.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-website',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-website.component.html',
  styleUrl: './add-website.component.css'
})
export class AddWebsiteComponent {
  siteForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private siteService: SiteService,
    private router: Router
  ) {
    this.siteForm = this.fb.group({
      urlname: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      alertEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.siteForm.invalid) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const newSite = {
      ...this.siteForm.value,
      owner: user.id
    };

    this.siteService.createSite(newSite).subscribe({
      next: () => this.router.navigate(['/user-sites']),
      error: err => this.errorMessage = err.error.message || 'Erreur lors de la création du site'
    });
  }

}
