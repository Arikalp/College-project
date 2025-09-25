# Glancer - Articles & Blogs Platform

A modern web platform for articles and blogs covering technology, space, and more.

## Deployment on Vercel

### 1. Environment Variables Setup
In Vercel Dashboard → Project Settings → Environment Variables, add:
- `API_KEY`: Your API key
- `DATABASE_URL`: Your database URL (if needed)
- `SECRET_KEY`: Your secret key

### 2. Deploy Steps
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Deploy automatically

### 3. API Usage
Use serverless functions in `/api` folder for secure API calls:
```javascript
// Example usage in your frontend
const data = await apiCall('/api/example');
```

## Local Development
```bash
npm install -g vercel
vercel dev
```

## Project Structure
- `css/` - Stylesheets
- `js/` - JavaScript files
- `assets/` - Images and media
- `pages/` - HTML pages
- `api/` - Serverless functions