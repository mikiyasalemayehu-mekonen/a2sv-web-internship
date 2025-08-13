const BASE_URL = "https://akil-backend.onrender.com";

export async function fetchOpportunities() {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/search`);
    if (!response.ok) {
      throw new Error("Failed to fetch opportunities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}


export async function fetchOpportunityById(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch opportunity");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

const TOKEN_KEY = "token";
function getAuthHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function fetchBookmarks() {
  const res = await fetch(`${BASE_URL}/bookmarks`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function toggleBookmark(eventID: string, isBookmarked: boolean) {
  const url = `${BASE_URL}/bookmarks/${eventID}`;
  const method = isBookmarked ? "DELETE" : "POST";

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to toggle bookmark");
}

