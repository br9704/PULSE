/** Share or copy a building deeplink. Returns true on success. */
export async function shareBuilding(buildingId: string, buildingName: string): Promise<boolean> {
  const url = `${window.location.origin}/map?building=${buildingId}`

  // Try native share API (mobile)
  if (navigator.share) {
    try {
      await navigator.share({ title: `${buildingName} — UniSpace`, url })
      return true
    } catch {
      // User cancelled or share failed — fall through to clipboard
    }
  }

  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    return false
  }
}
