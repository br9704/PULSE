import { SESSION_ROTATION_MS } from '@/constants/occupancy'

// Module-scoped — intentionally lost on page reload (privacy-by-design).
// Never persisted to localStorage, sessionStorage, or any database.
let currentSessionId: string | null = null
let sessionCreatedAt: number = 0

/**
 * Returns the current anonymous session UUID, generating a new one
 * if none exists or the current one has expired (30-minute rotation).
 *
 * @param now - Injectable time for testing. Defaults to current time.
 */
export function getSessionId(now?: Date): string {
  const currentTime = (now ?? new Date()).getTime()

  if (!currentSessionId || currentTime - sessionCreatedAt >= SESSION_ROTATION_MS) {
    currentSessionId = crypto.randomUUID()
    sessionCreatedAt = currentTime
  }

  return currentSessionId
}

/** @internal Reset session state. Exported for testing only. */
export function resetSessionId(): void {
  currentSessionId = null
  sessionCreatedAt = 0
}
