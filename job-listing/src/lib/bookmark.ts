export async function toggleBookmark(
  eventId: string,
  currentlyBookmarked: boolean,
  token: string,
  baseUrl = process.env.NEXT_PUBLIC_API_BASE
) {
  if (!token) throw new Error("No token");
  const method = currentlyBookmarked ? "DELETE" : "POST";
  const res = await fetch(`${baseUrl}/bookmarks/${eventId}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // POST endpoint expects an empty body per your API; we can pass an empty object
    body: method === "POST" ? JSON.stringify({}) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to update bookmark");
  }

  // Return parsed response if any
  try {
    return await res.json();
  } catch {
    return null;
  }
}
