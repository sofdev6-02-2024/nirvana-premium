export const API_PATH = process.env.PUBLIC_API_PATH ?? 'http://localhost:9500';

interface ApiRequestOptions {
  endpoint: string;
  method: string;
  body?: unknown;
  token?: string;
  revalidate?: number;
  params?: Record<string, string | number>;
}

export async function apiRequest<T>({
  endpoint,
  method,
  body,
  token,
  revalidate,
  params,
}: ApiRequestOptions): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const queryParams = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)]),
      ).toString()
    : '';

  const url = `${API_PATH}/api${endpoint}${queryParams}`;
  console.log(`🚀 Making API request to: ${url}`);

  const options: RequestInit = {
    method,
    headers,
    body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
  };

  if (revalidate !== undefined) {
    options.next = { revalidate };
  }

  try {
    const response = await fetch(url, options);
    console.log(`📥 Response status: ${response.status}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`❌ API Error for ${url}:`, {
        status: response.status,
        body: errorBody,
        headers: Object.fromEntries(response.headers.entries()),
      });
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    const data = await response.json();
    console.log(`✅ Successful response from ${url}`, { dataPreview: data });
    return data;
  } catch (error) {
    console.error(`❌ API Request Failed for ${url}:`, error);
    throw error;
  }
}
