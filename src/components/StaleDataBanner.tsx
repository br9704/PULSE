import { useEffect, useState } from 'react'
import { STALE_DATA_THRESHOLD_MS } from '@/constants/occupancy'

interface StaleDataBannerProps {
  lastUpdated: Date | null
}

export default function StaleDataBanner({ lastUpdated }: StaleDataBannerProps) {
  const [isStale, setIsStale] = useState(false)
  const [agoText, setAgoText] = useState('')

  useEffect(() => {
    if (!lastUpdated) {
      setIsStale(false)
      return
    }

    const check = () => {
      const age = Date.now() - lastUpdated.getTime()
      // Only show stale banner for recently-live data (< 1 hour old)
      // Don't show for data that was never live (seed data from days ago)
      const MAX_STALE_DISPLAY_MS = 60 * 60 * 1000 // 1 hour
      if (age > STALE_DATA_THRESHOLD_MS && age < MAX_STALE_DISPLAY_MS) {
        setIsStale(true)
        const mins = Math.floor(age / 60_000)
        setAgoText(mins < 1 ? 'just now' : `${mins} min ago`)
      } else {
        setIsStale(false)
      }
    }

    check()
    const interval = setInterval(check, 10_000)
    return () => clearInterval(interval)
  }, [lastUpdated])

  if (!isStale) return null

  return (
    <div
      className="px-4 py-2 text-xs text-center"
      style={{
        backgroundColor: 'rgba(245, 166, 35, 0.15)',
        color: 'var(--color-moderate)',
        borderBottom: '1px solid rgba(245, 166, 35, 0.3)',
      }}
    >
      Data last updated {agoText}
    </div>
  )
}
