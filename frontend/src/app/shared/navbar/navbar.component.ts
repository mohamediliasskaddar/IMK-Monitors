import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private translate = inject(TranslateService);

  selectedLang!: string;
  darkMode!: boolean;

  ngOnInit() {
    // 1️⃣ Récupération des valeurs
    this.selectedLang = localStorage.getItem('lang') || 'en';
    this.darkMode = JSON.parse(localStorage.getItem('darkMode') || 'false');

    // 2️⃣ Application
    this.translate.setDefaultLang(this.selectedLang);
    this.translate.use(this.selectedLang);

    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  switchLanguage(lang: string) {
    this.selectedLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}
