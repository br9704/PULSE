/** Format an ISO timestamp as a human-readable relative time string. */
export function formatRelativeTime(isoString: string, now?: Date): string {
  const then = new Date(isoString).getTime()
  const current = (now ?? new Date()).getTime()
  const diffMs = current - then

  if (diffMs < 0) return 'Just now'

  const seconds = Math.floor(diffMs / 1000)
  if (seconds < 60) return 'Just now'

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
