---
id: bee4a07e-1ac6-4417-8982-6de813c64e26
title: "The Privacy Firewall"
type: note
project: "PULSE"
tags:
  - "#note"
  - "#project"
  - "#ld/living"
  - "#stack/react"
  - "#status/dormant"
  - "#cluster/university"
status: dormant
created: "2026-08-17"
updated: "2026-08-19"
source_path: "/Users/brunojaamaa/Desktop/PULSE/src/lib/privacy.test.ts"
---

# The Privacy Firewall 🟢

**Zero GPS coordinates reach a server, and the claim is executable rather than documented.**
`src/lib/privacy.test.ts` holds **6** tests that fail the build if the property is violated.

## What actually crosses the wire

1. The browser reads GPS through the Geolocation API.
2. `src/lib/zoneDetection.ts` matches the point against building polygons locally with Turf.js.
   The function is pure and a test asserts it has no side effects.
3. Only a `zone_id` is sent.
4. `src/lib/sessionId.ts` rotates the session identifier every **30 minutes**. Identifiers exist
   only in memory inside an Edge Function and are never written to a table.
5. There is no analytics SDK of any kind.

## The six assertions

`privacy.test.ts` makes each of the following impossible:

- Persisting a session id.
- Writing a session id in an Edge Function `insert`, `upsert` or `update`.
- Putting a coordinate in a request body.
- Adding an analytics SDK.
- Exposing the Google Places key to the client.
- Giving `zoneDetection` a side effect.

This is the pattern worth stealing from the project: asserting the **property** rather than the
instance turns a test from a record of what someone thought to check into a constraint on the
whole codebase.

## Why it is built this way

Once a raw coordinate reaches a server, "we never see where you are" becomes a claim about
server-side behaviour that nobody outside the project can check. Reducing the wire format to a
zone identifier makes the promise verifiable by a stranger with the network tab open. That is
the whole argument, and it is why the point-in-polygon test lives on the device even though it
would be cheaper to run on a server.

## The knock-on cost

Three features in `PRD.md` are ruled out by this, permanently rather than temporarily: friend
presence, personalised recommendations and the analytics dashboard all require user accounts,
which contradict what the app is for. The README lists them as deliberately out of scope, not
deferred. See [[(Note) Designed and Never Built]].

## Related

[[(Note) System Architecture]] · [[(Note) The Test Suite]] ·
[[(Note) The Four Load-Bearing Decisions]] · [[(Index) 10 Architecture]]
