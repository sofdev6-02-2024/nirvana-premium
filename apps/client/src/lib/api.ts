const apiPath = process.env.PUBLIC_API_PATH || "http://localhost:9500"; // Fallback for development

export async function apiRequest(endpoint: string, method: string, body?: any, token?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${apiPath}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}