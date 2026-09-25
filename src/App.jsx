import { useEffect, useState, useCallback } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Uses Vite proxy in dev (vite.config.js) -> forwards to Flask http://localhost:8000
      // In production, configure VITE_API_URL or ensure same origin
      const response = await fetch('/api/data')
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}))
        throw new Error(errBody.error || `HTTP ${response.status}: ${response.statusText}`)
      }
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Forwarding Demo</h1>
      <p>
        Data from <code>backend/data.json</code> via Flask <code>GET /api/data</code>
      </p>

      <button
        onClick={fetchData}
        disabled={loading}
        style={{ padding: '0.5rem 1rem', marginBottom: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Loading...' : 'Refresh Data'}
      </button>

      {loading && <p>Loading data from Python API...</p>}

      {error && (
        <div style={{ color: '#b00020', background: '#ffebee', padding: '1rem', borderRadius: '8px' }}>
          <strong>Error:</strong> {error}
          <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
            Make sure Flask is running: <code>python backend/app.py</code> (port 8000)
          </p>
        </div>
      )}

      {data && !loading && !error && (
        <div>
          <h2 style={{ marginTop: '1rem' }}>{data.name} ({data.type})</h2>
          <p>
            <strong>ID:</strong> {data.id} | <strong>PPU:</strong> ${data.ppu}
          </p>

          <h3>Batters</h3>
          <ul>
            {data.batters?.batter?.map((b) => (
              <li key={b.id}>
                {b.type} <span style={{ color: '#666' }}>({b.id})</span>
              </li>
            ))}
          </ul>

          <h3>Toppings</h3>
          <ul>
            {data.topping?.map((t) => (
              <li key={t.id}>
                {t.type} <span style={{ color: '#666' }}>({t.id})</span>
              </li>
            ))}
          </ul>

          <details style={{ marginTop: '1.5rem' }}>
            <summary style={{ cursor: 'pointer' }}>Raw JSON</summary>
            <pre
              style={{
                background: '#f5f5f5',
                padding: '1rem',
                borderRadius: '8px',
                overflow: 'auto',
                textAlign: 'left',
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  )
}

export default App
