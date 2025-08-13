const BASE_URL = 'https://akil-backend.onrender.com';

export async function fetchOpportunities() {
try{
  const response = await fetch(`${BASE_URL}/opportunities/search`);
  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }
  const  data = await response.json();
  return data;
} catch (error) {
  console.error('Api Error:', error);
  return [];
}
}


export async function fetchOpportunityById(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/opportunities/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch opportunity');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Api Error:', error);
    return null;
  }
}
