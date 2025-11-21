import { useMemo } from 'react'
import { motion } from 'framer-motion'

function buildPath(points) {
  if (!points.length) return ''
  const [first, ...rest] = points
  let d = `M ${first.x},${first.y}`
  for (let i = 0; i < rest.length; i++) {
    const p = rest[i]
    const prev = i === 0 ? first : rest[i - 1]
    const mx = (prev.x + p.x) / 2
    d += ` C ${mx},${prev.y} ${mx},${p.y} ${p.x},${p.y}`
  }
  return d
}

export default function AreaChart({ data = [], height = 160 }) {
  const { lineD, areaD } = useMemo(() => {
    if (!data || data.length === 0) return { lineD: '', areaD: '' }
    const min = Math.min(...data)
    const max = Math.max(...data)
    const pad = 6
    const h = 100 - pad * 2
    const scaleY = (v) => {
      if (max === min) return 50
      return 100 - pad - ((v - min) / (max - min)) * h
    }
    const stepX = 100 / (data.length - 1)
    const pts = data.map((v, i) => ({ x: i * stepX, y: scaleY(v) }))
    const line = buildPath(pts)
    const area = `${line} L 100,100 L 0,100 Z`
    return { lineD: line, areaD: area }
  }, [data])

  return (
    <div className="relative w-full" style={{ height }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id="chartStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(96,165,250,0.35)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.05)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {areaD && (
          <motion.path
            d={areaD}
            fill="url(#chartFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
        {lineD && (
          <>
            <motion.path
              d={lineD}
              stroke="url(#chartStroke)"
              strokeWidth="1.8"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.path
              d={lineD}
              stroke="url(#chartStroke)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </>
        )}
      </svg>
    </div>
  )
}
