import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private apiUrl = 'http://localhost:3000/api/sites';
  private configUrl = 'http://localhost:3000/api/config';

  constructor(private http: HttpClient) {}

  // 🔐 Génère les headers avec le token JWT
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Récupère la liste de tous les sites + owner + dernier statut (admin)
  getAllSiteStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/status/all`, {
      headers: this.getAuthHeaders()
    });
  }

  // Met à jour l'intervalle de vérification pour un site donné
  // updateCheckInterval(siteId: string, checkInterval: number): Observable<any> {
  //   return this.http.put<any>(
  //     `${this.apiUrl}/${siteId}`,
  //     { checkInterval },
  //     { headers: this.getAuthHeaders() }
  //   );
  // }

  // 🟢 Get the status of all monitored sites (from backend endpoint /api/sites/status)
getSiteStatuses(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/status`, {
    headers: this.getAuthHeaders()
  });
}

 // Récupérer l'intervalle global
  // getCheckInterval(): Observable<{ checkIntervalMinutes: number }> {
  //   return this.http.get<{ checkIntervalMinutes: number }>(
  //     `${this.configUrl}/check-interval`,
  //     { headers: this.getAuthHeaders() }
  //   );
  // }

  // Mettre à jour l'intervalle global
  // updateCheckIntervalValue(minutes: number): Observable<{ checkIntervalMinutes: number }> {
  //   return this.http.put<{ checkIntervalMinutes: number }>(
  //     `${this.configUrl}/check-interval`,
  //     { checkIntervalMinutes: minutes },
  //     { headers: this.getAuthHeaders() }
  //   );
  // }
// Met à jour l'intervalle de vérification global (admin seulement)
updateCheckIntervalValue(newInterval: number): Observable<any> {
  return this.http.put<any>(
    `${this.apiUrl.replace('/sites', '/config')}/check-interval`,
    { checkInterval: newInterval },
    { headers: this.getAuthHeaders() }
  );
}

 

  // ➕ Ajouter un nouveau site
  createSite(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { headers: this.getAuthHeaders() });
  }

  // 📋 Récupérer tous les sites de l'utilisateur connecté
  getMySites(): Observable<any> {
  return this.http.get(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
}


  // 🔍 Récupérer un site par ID
  getSiteById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // ✏️ Modifier un site
  updateSite(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.getAuthHeaders() });
  }

  // 🗑️ Supprimer un site
  deleteSite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // ➕ Nouvelle méthode pour récupérer la config
getCheckInterval(): Observable<{ checkIntervalMinutes: number }> {
  return this.http.get<{ checkIntervalMinutes: number }>(
    `${this.apiUrl.replace('/sites','')}/config/check-interval`,
    { headers: this.getAuthHeaders() }
  );
}

}
