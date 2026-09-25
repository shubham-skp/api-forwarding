# API Forwarding Demo

A full-stack application demonstrating seamless local API request forwarding and proxying between a **React (Vite)** frontend and a **Python (Flask)** backend.

---

## 📸 Overview

This repository demonstrates how to avoid CORS issues and hardcoded backend URLs in development by forwarding frontend requests directly to a local Python backend service via a proxy setup.

- **Frontend:** Built with React + Vite. Uses standard `fetch('/api/data')` requests forwarded seamlessly to the backend.
- **Backend:** Built with Python + Flask. Serves JSON data loaded dynamically from `backend/data.json` along with system health endpoints.

---
