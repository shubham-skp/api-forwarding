# API Forwarding

Demo of forwarding data from a Python (Flask) backend to a React frontend, using the Vite dev-server proxy so the browser only ever talks to one origin.

## Stack

| Layer    | Tech                                    |
| -------- | --------------------------------------- |
| Backend  | Python 3.14, Flask 3.1, flask-cors       |
| Frontend | React 19, Vite 8                        |
| Dev proxy| Vite `server.proxy` -> `localhost:8000`  |

## Project structure

```
.
├── backend/
│   ├── app.py        # Flask app, serves JSON from data.json
│   └── data.json     # data served by GET /api/data
├── src/
│   ├── App.jsx       # fetches /api/data and renders it
│   └── main.jsx
└── vite.config.js    # dev proxy: /api -> http://localhost:8000
```

## How the forwarding works

1. `src/App.jsx` calls `fetch('/api/data')` — a **relative** path, so no hardcoded host.
2. In dev, Vite's dev server matches the `/api` prefix (`vite.config.js:7-14`) and proxies the request to the Flask server on port 8000.
3. Flask reads `backend/data.json`, returns it as JSON via `jsonify` (`backend/app.py:14-25`).
4. The response travels back through the proxy to React, which stores it in state and renders it.

Because the browser only ever requests same-origin `/api/...`, there is no CORS preflight in practice. `flask-cors` is still enabled (`backend/app.py:11`) so you can also hit the API directly from another client.

## Setup

### 1. Backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install flask flask-cors
```

### 2. Frontend

```bash
npm install
```

## Running

Two terminals:

```bash
# Terminal 1 — Flask on port 8000
source .venv/bin/activate
python backend/app.py
```

```bash
# Terminal 2 — Vite on port 5173
npm run dev
```

Open http://localhost:5173.

## API

| Method | Endpoint       | Description                                   |
| ------ | -------------- | --------------------------------------------- |
| GET    | `/api/data`    | Returns the contents of `backend/data.json`   |
| GET    | `/api/health`  | Returns `{"status": "ok"}` for connectivity   |

Error responses are JSON: `404` if `data.json` is missing, `500` if it is malformed.

```bash
curl http://localhost:8000/api/data
curl http://localhost:8000/api/health
```

## Frontend behaviour

`src/App.jsx` keeps three pieces of state — `data`, `loading`, `error` — and exposes a `fetchData` callback (`src/App.jsx:9`) wrapped in `useCallback` so the auto-fetch `useEffect` (`src/App.jsx:30-32`) does not re-run on every render.

- Fetches on mount, and again on **Refresh Data**
- Shows an error panel with a hint to start Flask if the request fails
