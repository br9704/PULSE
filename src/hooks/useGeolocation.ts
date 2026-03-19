import { useEffect, useRef, useState, useCallback } from 'react'

interface Position {
  latitude: number
  longitude: number
  accuracy: number
}

export interface GeolocationState {
  position: Position | null
  error: GeolocationPositionError | null
  isWatching: boolean
}

/**
 * Subscribes to the Geolocation API via watchPosition.
 *
 * - Pauses when the page is hidden (app backgrounded)
 * - Resumes when the page becomes visible again
 * - Cleans up on unmount
 */
export function useGeolocation(): GeolocationState {
  const [position, setPosition] = useState<Position | null>(null)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [isWatching, setIsWatching] = useState(false)
  const watchIdRef = useRef<number | null>(null)

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) return

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setError(null)
        setIsWatching(true)
      },
      (err) => {
        setError(err)
        setPosition(null)
        setIsWatching(false)
      },
      { enableHighAccuracy: true },
    )

    watchIdRef.current = id
    setIsWatching(true)
  }, [])

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsWatching(false)
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      // Geolocation not available — set a synthetic error
      setError({ code: 2, message: 'Geolocation not supported', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as GeolocationPositionError)
      return
    }

    startWatching()

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        stopWatching()
      } else {
        startWatching()
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      stopWatching()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [startWatching, stopWatching])

  return { position, error, isWatching }
}
