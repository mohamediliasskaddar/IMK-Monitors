import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';

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

  ngOnInit() {
    // plus besoin de récupérer ici, le parent passe userRole
  }

  select(section: string) {
    this.selectedSection = section;
    this.sectionSelected.emit(section);
  }
}
