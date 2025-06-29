import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Récupérer le profil du user connecté
  getProfile(): Observable<any> {
    // si tu as une route GET /api/users/me, sinon GET /api/users/:id
    return this.http.get<any>(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour le profil
  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/me`, data, { headers: this.getAuthHeaders() });
  }
}
