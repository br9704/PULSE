import { describe, expect, it, beforeEach } from 'vitest'
import { getSessionId, resetSessionId } from './sessionId'
import { SESSION_ROTATION_MS } from '@/constants/occupancy'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

beforeEach(() => {
  resetSessionId()
})

describe('getSessionId', () => {
  it('returns a valid UUID v4', () => {
    const id = getSessionId()
    expect(id).toMatch(UUID_REGEX)
  })

  it('returns the same ID within the 30-minute window', () => {
    const t0 = new Date('2026-03-19T12:00:00Z')
    const t1 = new Date(t0.getTime() + SESSION_ROTATION_MS - 1000) // 29min 59s later

    const id1 = getSessionId(t0)
    const id2 = getSessionId(t1)
    expect(id1).toBe(id2)
  })

  it('returns a different ID after the 30-minute window', () => {
    const t0 = new Date('2026-03-19T12:00:00Z')
    const t1 = new Date(t0.getTime() + SESSION_ROTATION_MS) // exactly 30 min later

    const id1 = getSessionId(t0)
    const id2 = getSessionId(t1)
    expect(id1).not.toBe(id2)
    expect(id2).toMatch(UUID_REGEX)
  })

  it('never returns an empty string', () => {
    const id = getSessionId()
    expect(id.length).toBeGreaterThan(0)
  })

  it('resetSessionId forces a new ID', () => {
    const t = new Date('2026-03-19T12:00:00Z')
    const id1 = getSessionId(t)
    resetSessionId()
    const id2 = getSessionId(t)
    expect(id1).not.toBe(id2)
  })
})
