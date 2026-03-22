import { describe, it, expect } from 'vitest'
import { formatRelativeTime } from './relativeTime'

describe('formatRelativeTime', () => {
  const now = new Date('2026-03-22T12:00:00Z')

  it('returns "Just now" for timestamps less than 60s ago', () => {
    expect(formatRelativeTime('2026-03-22T11:59:30Z', now)).toBe('Just now')
  })

  it('returns "Just now" for future timestamps', () => {
    expect(formatRelativeTime('2026-03-22T12:05:00Z', now)).toBe('Just now')
  })

  it('returns minutes for 1-59 min ago', () => {
    expect(formatRelativeTime('2026-03-22T11:55:00Z', now)).toBe('5 min ago')
    expect(formatRelativeTime('2026-03-22T11:01:00Z', now)).toBe('59 min ago')
  })

  it('returns hours for 1-23h ago', () => {
    expect(formatRelativeTime('2026-03-22T10:00:00Z', now)).toBe('2h ago')
    expect(formatRelativeTime('2026-03-21T13:00:00Z', now)).toBe('23h ago')
  })

  it('returns days for 24h+ ago', () => {
    expect(formatRelativeTime('2026-03-20T12:00:00Z', now)).toBe('2d ago')
    expect(formatRelativeTime('2026-03-15T12:00:00Z', now)).toBe('7d ago')
  })
})
