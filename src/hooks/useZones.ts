import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { BuildingZone } from '@/types'

interface UseZonesResult {
  zones: BuildingZone[]
  isLoading: boolean
  error: string | null
}

export function useZones(): UseZonesResult {
  const [zones, setZones] = useState<BuildingZone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchZones() {
      const { data, error: fetchError } = await supabase
        .from('building_zones')
        .select('*')

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setIsLoading(false)
        return
      }

      setZones((data as BuildingZone[]) ?? [])
      setIsLoading(false)
    }

    fetchZones()

    return () => { cancelled = true }
  }, [])

  return { zones, isLoading, error }
}
