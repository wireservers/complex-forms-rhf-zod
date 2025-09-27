
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store, togglePaused } from './store'
import { useEffect, useRef, useState } from 'react'
import { startFeed, Point } from './feed'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

function Chart() {
  const paused = useSelector((s: any) => s.controls.paused)
  const [data, setData] = useState<Point[]>([])
  const stopRef = useRef<() => void>()

  useEffect(() => {
    if (!paused) {
      stopRef.current = startFeed((p) => {
        setData((d) => {
          const next = [...d, p]
          return next.slice(-60) // keep last 60 points
        })
      })
    }
    return () => { stopRef.current && stopRef.current() }
  }, [paused])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="t" tickFormatter={(v) => new Date(v).toLocaleTimeString()} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="v" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

function Dashboard() {
  const dispatch = useDispatch()
  const paused = useSelector((s: any) => s.controls.paused)
  return (
    <div style={{padding: 24}}>
      <h1>Realtime Telemetry</h1>
      <button onClick={() => dispatch(togglePaused())}>
        {paused ? 'Resume' : 'Pause'}
      </button>
      <Chart />
    </div>
  )
}

export function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  )
}
