# API Forwarding Demo

A full-stack application demonstrating seamless local API request forwarding and proxying between a **React (Vite)** frontend and a **Python (Flask)** backend.

---

## 📸 Overview

This repository demonstrates how to avoid CORS issues and hardcoded backend URLs in development by forwarding frontend requests directly to a local Python backend service via a proxy setup.

- **Frontend:** Built with React + Vite. Uses standard `fetch('/api/data')` requests forwarded seamlessly to the backend.
- **Backend:** Built with Python + Flask. Serves JSON data loaded dynamically from `backend/data.json` along with system health endpoints.

---

## 📁 Repository Structure

```text
API Forwarding/
├── .venv/              # Python virtual environment (ignored by git)
├── backend/
│   ├── app.py          # Flask API server
│   └── data.json       # Sample JSON data file
├── dist/               # Production build output
├── node_modules/       # Node.js dependencies
├── public/
│   ├── favicon.svg     # Favicon
│   └── icons.svg       # SVG icons
├── src/
│   ├── assets/
│   │   └── hero.png    # App assets/images
│   ├── App.css         # App component styles
│   ├── App.jsx         # Main React UI fetching /api/data
│   ├── index.css       # Global CSS styles
│   └── main.jsx        # React DOM entry point
├── .gitignore          # Git ignore rules
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML entry page
├── package-lock.json   # Locked dependency tree
├── package.json        # Frontend dependencies & scripts
├── README.md           # Documentation
└── vite.config.js      # Vite development proxy configuration
