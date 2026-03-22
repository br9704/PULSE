interface AmenityChipProps {
  icon: string
  label: string
}

export default function AmenityChip({ icon, label }: AmenityChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs"
      style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-uom-blue)' }}
    >
      {icon} {label}
    </span>
  )
}
