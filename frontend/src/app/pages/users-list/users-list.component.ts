import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule,TranslateModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);

  users: any[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: data => {
        this.users = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || 'Impossible de charger les utilisateurs';
        this.loading = false;
      }
    });
  }

  onDelete(userId: string) {
    if (!confirm('Supprimer cet utilisateur ? Cette action est irréversible.')) {
      return;
    }
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u._id !== userId);
      },
      error: err => {
        alert(err.error?.message || 'Erreur lors de la suppression');
      }
    });
  }

  onEdit(userId: string) {
    this.router.navigate(['/admin/users', userId]);
  }

  onView(userId: string) {
    this.router.navigate(['/admin/users', userId]);
  }
}
