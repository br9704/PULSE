import { useCallback, useState } from 'react'
import Map from '@/components/Map'
import { useBuildings } from '@/hooks/useBuildings'

export default function MapPage() {
  const { buildings, error } = useBuildings()
  const [_selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null)

  const handleBuildingClick = useCallback((id: string) => {
    setSelectedBuildingId(id)
    console.log('[Pulse] Building selected:', id)
  }, [])

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-bg-primary text-[var(--color-text-secondary)]">
        <p>Failed to load buildings: {error}</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full relative">
      <Map buildings={buildings} onBuildingClick={handleBuildingClick} />
    </div>
  )
}
