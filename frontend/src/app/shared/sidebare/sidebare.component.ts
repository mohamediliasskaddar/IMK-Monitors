import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf,],
  templateUrl: './sidebare.component.html',
  styleUrls: ['./sidebare.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() userRole: string = '';     // ← recevoir le rôle
  @Output() sectionSelected = new EventEmitter<string>();
  selectedSection: string = '';
    constructor( private router : Router , private auth : AuthService) {}



  ngOnInit() {
    // plus besoin de récupérer ici, le parent passe userRole
  }

  select(section: string) {
    this.selectedSection = section;
    this.sectionSelected.emit(section);
  }
 logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
