import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Building } from '@/types'

interface UseBuildingsResult {
  buildings: Building[]
  isLoading: boolean
  error: string | null
}

export function useBuildings(): UseBuildingsResult {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchBuildings() {
      const { data, error: fetchError } = await supabase
        .from('buildings')
        .select('*')

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setIsLoading(false)
        return
      }

      setBuildings((data as Building[]) ?? [])
      setIsLoading(false)
    }

    fetchBuildings()

    return () => { cancelled = true }
  }, [])

  return { buildings, isLoading, error }
}
