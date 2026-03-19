import { describe, expect, it, beforeEach } from 'vitest'
import {
  getDataQuality,
  expirePositions,
  computeOccupancyPct,
  computeTrend,
  recordPosition,
} from './aggregation'

const NOW = Date.now()
const THIRTY_MINUTES = 30 * 60 * 1000

describe('getDataQuality', () => {
  it('returns "none" for undefined sessions', () => {
    expect(getDataQuality(undefined, NOW)).toBe('none')
  })

  it('returns "none" for empty sessions map', () => {
    expect(getDataQuality(new Map(), NOW)).toBe('none')
  })

  it('returns "live" when newest session is within 60s', () => {
    const sessions = new Map([['s1', NOW - 30_000]]) // 30s ago
    expect(getDataQuality(sessions, NOW)).toBe('live')
  })

  it('returns "stale" when all sessions are older than 60s', () => {
    const sessions = new Map([['s1', NOW - 90_000]]) // 90s ago
    expect(getDataQuality(sessions, NOW)).toBe('stale')
  })

  it('returns "live" if any session is fresh even when others are stale', () => {
    const sessions = new Map([
      ['s1', NOW - 90_000], // stale
      ['s2', NOW - 10_000], // fresh
    ])
    expect(getDataQuality(sessions, NOW)).toBe('live')
  })
})

describe('expirePositions', () => {
  let positions: Map<string, Map<string, number>>

  beforeEach(() => {
    positions = new Map()
  })

  it('removes sessions older than 30 minutes', () => {
    positions.set('zone-1', new Map([
      ['s1', NOW - THIRTY_MINUTES - 1000], // expired
      ['s2', NOW - 1000], // fresh
    ]))

    const expired = expirePositions(positions, NOW)
    expect(expired).toBe(1)
    expect(positions.get('zone-1')?.size).toBe(1)
    expect(positions.get('zone-1')?.has('s2')).toBe(true)
  })

  it('removes zone entry when all sessions expired', () => {
    positions.set('zone-1', new Map([
      ['s1', NOW - THIRTY_MINUTES - 1000],
    ]))

    expirePositions(positions, NOW)
    expect(positions.has('zone-1')).toBe(false)
  })

  it('returns 0 when nothing to expire', () => {
    positions.set('zone-1', new Map([['s1', NOW]]))
    expect(expirePositions(positions, NOW)).toBe(0)
  })

  it('handles empty map', () => {
    expect(expirePositions(positions, NOW)).toBe(0)
  })
})

describe('computeOccupancyPct', () => {
  it('computes correct percentage', () => {
    expect(computeOccupancyPct(50, 200)).toBe(25)
  })

  it('caps at 100%', () => {
    expect(computeOccupancyPct(300, 200)).toBe(100)
  })

  it('returns 0 for zero capacity', () => {
    expect(computeOccupancyPct(10, 0)).toBe(0)
  })

  it('returns 0 for zero count', () => {
    expect(computeOccupancyPct(0, 200)).toBe(0)
  })
})

describe('computeTrend', () => {
  it('returns "stable" when prev is null', () => {
    expect(computeTrend(50, null)).toBe('stable')
  })

  it('returns "filling" when current > prev + 5', () => {
    expect(computeTrend(60, 50)).toBe('filling')
  })

  it('returns "emptying" when current < prev - 5', () => {
    expect(computeTrend(40, 50)).toBe('emptying')
  })

  it('returns "stable" when within threshold', () => {
    expect(computeTrend(53, 50)).toBe('stable')
  })

  it('returns "stable" at exactly +5 (not strictly greater)', () => {
    expect(computeTrend(55, 50)).toBe('stable')
  })

  it('returns "filling" at +6', () => {
    expect(computeTrend(56, 50)).toBe('filling')
  })
})

describe('recordPosition', () => {
  it('adds a new zone and session', () => {
    const positions = new Map<string, Map<string, number>>()
    recordPosition(positions, 'zone-1', 'session-a', NOW)

    expect(positions.has('zone-1')).toBe(true)
    expect(positions.get('zone-1')?.get('session-a')).toBe(NOW)
  })

  it('updates timestamp for existing session', () => {
    const positions = new Map<string, Map<string, number>>()
    recordPosition(positions, 'zone-1', 'session-a', NOW - 10_000)
    recordPosition(positions, 'zone-1', 'session-a', NOW)

    expect(positions.get('zone-1')?.get('session-a')).toBe(NOW)
  })

  it('tracks multiple sessions in same zone', () => {
    const positions = new Map<string, Map<string, number>>()
    recordPosition(positions, 'zone-1', 'session-a', NOW)
    recordPosition(positions, 'zone-1', 'session-b', NOW)

    expect(positions.get('zone-1')?.size).toBe(2)
  })

  it('tracks sessions across different zones', () => {
    const positions = new Map<string, Map<string, number>>()
    recordPosition(positions, 'zone-1', 'session-a', NOW)
    recordPosition(positions, 'zone-2', 'session-b', NOW)

    expect(positions.size).toBe(2)
  })
})
