# IMK‑Monitors

**IMK‑Monitors** is a full‑stack web application (MEAN‑style + JWT auth) for automated uptime monitoring of websites, with alerting (email/SMS), reports, and a responsive Bootstrap 5 UI supporting light/dark mode and two languages (EN/FR).

---

## 📚 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Internationalization & Theming](#internationalization--theming)
- [Cron & Configuration](#cron--configuration)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🚀 Features

- **User & Admin roles** (register/login, JWT‑protected routes)
- **Add websites** to monitor, set global check interval
- **Automated status checks** (cron‑driven, with consecutive‑failure alert emails)
- **Real‑time dashboard**
    - Users see their profile, own sites and statuses 
    - Admin sees all sites + owners, can filter UP/DOWN, update global interval  of checking status
- **Reports & logs** stored in MongoDB
- **Responsive UI** with Bootstrap 5, light/dark mode, i18n (EN/FR)
- **Standalone Angular components** and Express/Lambda‑style backend

---

## 🖼️ Screenshots

> Store screenshots in `docs/images/`. Reference them here as thumbnails or links.

> login   :
 ![Login](/uis/login.png) 

Register ![Add Site](/uis/register.png) 

 > Sites status: 
 ![Dashboard](/uis/siteStatus.png) 

 > Users list : 
 ![ Users list ](/uis/usersList.png) 
 
> Add a website to monitor:
 ![ add ](/uis/addSite.png) 

*Tip:* Don’t embed full‑size images directly to keep README fast to load—use thumbnails or link to a `docs/` gallery.

---

## 🛠️ Tech Stack

**Frontend:**
- Angular (Standalone Components)
- Bootstrap 5.3.7
- ngx‑translate for i18n
- ngx‑forms & Angular Router

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT auth (bcrypt + jsonwebtoken)>
- node‑cron for scheduling
- nodemailer (Amazon SNS not developed yet ) for alerts

---

## 🔧 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- MongoDB URI (local or cloud)

### Installation

```bash
# Clone
git clone https://github.com/your‑org/IMK‑Monitors.git
cd IMK‑Monitors

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
Environment Variables

#Create backend/.env with:
MONGO_URI=your_mongo_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
CHECK_INTERVAL_MINUTES=5
ALERT_EMAIL=youremail@example.com
ALERT_PASS=your_smtp_password
```
### Usage
1. Start the backend


```bash
cd backend
node server.js
```
2. Start the frontend
```bash
cd frontend
ng serve
```
Open http://localhost:4200 in your browser.

🏗️ Architecture & Folder Structure
bash
Copier
Modifier
IMK-Monitors/
├── backend/
│   ├── models/      # Mongoose schemas (User, Site, Log, Config)
│   ├── routes/      # Express routers (auth, users, sites, logs, config)
│   ├── middleware/  # JWT auth + role guards
│   ├── monitor.js   # cron logic: axios checks + email alerts
│   ├── emailService.js
│   ├── server.js
│   ├── monitor.js
│   └── .env
└── frontend/
│   ├── src/app/
    │   ├── pages/   # Angular standalone pages (login, dashboard, profile…)
    │   ├── shared/  #navbare and sidebar
    │   ├── services/ user, auth, site
    │   ├── components/
    │   └── app.routes.ts
    ├── assets/
    │   └── i18n/    # en.json, fr.json
    ├── styles.css
    └── main.ts
🌐 Internationalization & Theming:
  
  > i18n via ngx‑translate + JSON files (assets/i18n/en.json, fr.json)

  > Dark/Light: toggle adds/removes .dark-mode on <body> and uses CSS variables or Bootstrap’s data-bs-theme.

⏰ Cron & Configuration
Global interval stored in MongoDB “Config” collection (key: checkInterval)

Initial value seeded from .env

Cron job reads it before each run: adjusts check frequency without restarting.

🐞 Troubleshooting
CORS errors: ensure cors() is set before routes in server.js.

403 Forbidden: verify JWT token and user role.

No translate pipe: import TranslateModule in standalone components.

Layout issues: switch to <router-outlet> + child routes in DashboardComponent.

📄 License
MIT © Your Name / Organization
For support, contact Mohamed Iliass Kaddar.

## 📧 Contact
For support, contact [Mohamed Iliass Kaddar](mailto:moahmediliassk@gmail.com).

**Written in Angular, compiled with love – imk 25**
