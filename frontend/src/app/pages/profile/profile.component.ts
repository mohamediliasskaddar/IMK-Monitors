import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, FormsModule, TranslateModule ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);

  profileForm: FormGroup;
  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.min(0)],
      gender: ['', Validators.required],
      // role non éditable
      role: [{ value: '', disabled: true  }]
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getProfile().subscribe({
        next: user => {
          this.profileForm.patchValue({
            name: user.name,
            email: user.email,
            age: user.age,
            gender: user.gender,
            role: user.role
            
          });
          console.log(user);
          this.loading = false;

        },
        error: err => {
          this.errorMessage = err.error?.message || 'Impossible de charger le profil';
          this.loading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) return;
    const updateData = this.profileForm.getRawValue(); // inclut role mais backend peut ignorer
    this.userService.updateProfile(updateData).subscribe({
      next: () => {
        this.successMessage = 'Profil mis à jour avec succès';
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Erreur mise à jour';
      }
    });
  }
}
