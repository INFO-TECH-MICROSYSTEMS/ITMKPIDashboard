# INFO TECH MICROSYSTEMS (ITM) - Deployment & Operations Guide

This guide provides instructions for starting, building, and deploying the **ITM Enterprise Website** application across various environments (local development, production preview, Docker containers, modern cloud hosting platforms, and dedicated web servers).

---

## 📋 Table of Contents
1. [Tech Stack & Architecture](#tech-stack--architecture)
2. [Prerequisites](#prerequisites)
3. [How to Start the Application](#how-to-start-the-application)
   - [A. Development Mode](#a-development-mode)
   - [B. Production Preview Mode](#b-production-preview-mode)
   - [C. Lightweight Local Static Server](#c-lightweight-local-static-server)
4. [Building for Production](#building-for-production)
5. [Deployment Strategies](#deployment-strategies)
   - [Option 1: Docker Container (Recommended for self-hosting/K8s)](#option-1-docker-container)
   - [Option 2: Modern Static Hosts (Vercel / Netlify / Cloudflare Pages)](#option-2-modern-static-hosts)
   - [Option 3: Dedicated Linux Server (Nginx)](#option-3-dedicated-linux-server-nginx)
   - [Option 4: AWS S3 + CloudFront](#option-4-aws-s3--cloudfront)
   - [Option 5: GitHub Pages](#option-5-github-pages)
6. [Single Page Application (SPA) Routing Rule](#single-page-application-spa-routing-rule)
7. [Automated CI/CD Workflow](#automated-cicd-workflow)
8. [Troubleshooting & FAQs](#troubleshooting--faqs)

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4
- **Routing:** React Router 7 (Single Page Application - SPA)
- **Icons:** Lucide React
- **Output:** Fully static HTML, CSS, JavaScript, and assets in the `./dist` directory.

---

## ⚙️ Prerequisites

- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **Package Manager:** npm (v9+)
- *(Optional)* **Docker:** If running or deploying via containers.

> [!NOTE]
> On Windows PowerShell, running `npm` directly may encounter execution policy restrictions (`PSSecurityException`). To circumvent this, use **`npm.cmd`** instead of `npm`, or run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`.

---

## 🚀 How to Start the Application

### A. Development Mode
Runs the local Vite dev server with Hot Module Replacement (HMR).

**On Windows:**
```powershell
# 1. Install dependencies (if not already installed)
npm.cmd install

# 2. Start dev server
npm.cmd run dev
```

**On Linux / macOS:**
```bash
npm install
npm run dev
```

- **Default URL:** [http://localhost:5173](http://localhost:5173)
- Changes in `src/` will instantly update in the browser.

---

### B. Production Preview Mode
Builds the application into optimized production bundles (`dist/`) and starts a local server to test the actual production build.

**On Windows:**
```powershell
# 1. Build the production assets
npm.cmd run build

# 2. Preview the production build locally
npm.cmd run preview
```

**On Linux / macOS:**
```bash
npm run build
npm run preview
```

- **Default URL:** [http://localhost:4173](http://localhost:4173)
- This closely simulates production performance and compression.

---

### C. Lightweight Local Static Server
If you want to serve the compiled `./dist` folder using a standalone Node.js static server:

```powershell
# Using npx serve (flags: -s for SPA fallback to index.html, -l for port)
npx.cmd serve -s dist -l 3000
```
Then visit [http://localhost:3000](http://localhost:3000).

---

## 📦 Building for Production

To generate the production artifacts:

```powershell
npm.cmd run build
```

The output files will be created in `./dist`:
```
dist/
├── assets/
│   ├── index-[hash].js      # Minified JavaScript bundle
│   └── index-[hash].css     # Optimized Tailwind CSS
├── Sudarsha_Wijenayake.png  # Asset images
├── vite.svg
└── index.html               # Main entry HTML
```

---

## 🌐 Deployment Strategies

Because this application is a **Client-Side Rendered Single Page Application (SPA)**, any server hosting it must route non-file requests to `index.html` so React Router can handle URL routing.

---

### Option 1: Docker Container

A production-ready [Dockerfile](file:///Dockerfile) and [nginx.conf](file:///nginx.conf) are provided in the repository root.

#### 1. Build the Docker Image
```bash
docker build -t itm-website:latest .
```

#### 2. Run the Container
```bash
docker run -d -p 8080:80 --name itm-app itm-website:latest
```

The application is now live at [http://localhost:8080](http://localhost:8080).

#### 3. Docker Compose Example (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  itm-website:
    build: .
    container_name: itm-website
    ports:
      - "80:80"
    restart: always
```
Run with:
```bash
docker compose up -d
```

---

### Option 2: Modern Static Hosts (Vercel / Netlify / Cloudflare Pages)

These platforms provide automatic CI/CD from Git repositories and edge CDN distribution.

#### Vercel
1. Import the repository in [Vercel](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Vercel automatically handles SPA fallback routing.

#### Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. To ensure SPA route refreshes work, add a `public/_redirects` file with:
   ```
   /*    /index.html   200
   ```

#### Cloudflare Pages
1. Select **Workers & Pages** -> **Create application** -> **Pages**.
2. Build preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

---

### Option 3: Dedicated Linux Server (Nginx)

If hosting on an Ubuntu/Debian VPS or AWS EC2:

1. Build the app locally or on your CI server:
   ```bash
   npm run build
   ```
2. Copy `./dist/*` to the server's web root (e.g., `/var/www/itmwebsite/dist`).
3. Configure Nginx (`/etc/nginx/sites-available/itmwebsite`):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       root /var/www/itmwebsite/dist;
       index index.html;

       # Enable Gzip
       gzip on;
       gzip_types text/plain text/css application/javascript application/json image/svg+xml;

       # Caching for assets with content hashes
       location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
           expires 1y;
           add_header Cache-Control "public, max-age=31536000, immutable";
           try_files $uri =404;
       }

       # SPA fallback routing
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
4. Test and reload Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```
5. Secure with Let's Encrypt SSL:
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

### Option 4: AWS S3 + CloudFront

1. **S3 Bucket:**
   - Create an S3 bucket (e.g. `itm-website-prod`).
   - Upload the contents of `./dist/` to the root of the bucket.
2. **CloudFront Distribution:**
   - Point the origin to your S3 bucket (using Origin Access Control).
   - In CloudFront **Error Pages**, configure custom error responses:
     - **HTTP Error Code:** `403: Forbidden` -> **Response Page Path:** `/index.html` -> **HTTP Response Code:** `200: OK`
     - **HTTP Error Code:** `404: Not Found` -> **Response Page Path:** `/index.html` -> **HTTP Response Code:** `200: OK`
   - Point Route 53 DNS records to the CloudFront distribution domain.

---

### Option 5: GitHub Pages

If deploying to GitHub Pages:
1. In `vite.config.ts`, set the repository sub-path if hosting under `<username>.github.io/<repo-name>`:
   ```ts
   export default defineConfig({
     base: '/<repo-name>/',
     // ...
   })
   ```
2. Deploy the `dist` directory using `gh-pages`:
   ```bash
   npm.cmd install -D gh-pages
   npx.cmd gh-pages -d dist
   ```

---

## 🔀 Single Page Application (SPA) Routing Rule

Because this app utilizes `react-router-dom` for internal paths (`/services/*`, `/tools`, `/contact`):

- **The Problem:** When a user visits [http://example.com/tools](http://example.com/tools) directly or presses browser Refresh, the web server looks for a physical directory `/tools/index.html`.
- **The Solution:** The server must rewrite/fallback all non-asset requests back to `/index.html`.
  - In Nginx: `try_files $uri $uri/ /index.html;`
  - In Apache: `RewriteRule ^ index.html [L]`
  - In Netlify: `/* /index.html 200`
  - In AWS CloudFront: Map 404 / 403 errors to `/index.html` with status `200`.

---

## 🤖 Automated CI/CD Workflow (GitHub Actions)

Create `.github/workflows/deploy.yml` to automatically verify, build, and deploy on each push:

```yaml
name: Build and Verify

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Linter
        run: npm run lint

      - name: Run Build
        run: npm run build

      - name: Verify Dist Artifacts
        run: |
          test -f dist/index.html
          echo "Production build verified successfully!"
```

---

## ❓ Troubleshooting & FAQs

### Q1: `npm : File ... npm.ps1 cannot be loaded because running scripts is disabled`
- **Cause:** Windows PowerShell execution policy blocks execution of `.ps1` scripts by default.
- **Fix:** Either run commands using `npm.cmd` (e.g. `npm.cmd run dev`, `npm.cmd run build`) or open PowerShell and run:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```

### Q2: 404 Not Found when reloading subpages (`/tools`, `/services/...`)
- **Cause:** Server is trying to serve a physical path rather than delegating routing to React Router.
- **Fix:** Ensure the web server has the SPA fallback rewrite rule configured (refer to [Single Page Application (SPA) Routing Rule](#single-page-application-spa-routing-rule)).

### Q3: How to test the production build on the local machine before releasing?
- Run:
  ```powershell
  npm.cmd run build
  npm.cmd run preview
  ```
  Open the browser to [http://localhost:4173](http://localhost:4173) to test the exact production bundle.
