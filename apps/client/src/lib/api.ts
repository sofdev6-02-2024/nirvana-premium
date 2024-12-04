export const API_PATH = process.env.PUBLIC_API_PATH ?? 'http://localhost:9500';

interface ApiRequestOptions {
  endpoint: string;
  method: string;
  body?: unknown;
  token?: string;
  revalidate?: number;
  params?: Record<string, string | number>;
}

export interface ApiError {
  status?: number;
  message?: string;
}

export async function apiRequest<T>({
  endpoint,
  method,
  body,
  token,
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

  if (params) {
    console.log('🔍 Query Parameters:', JSON.stringify(params, null, 2));
  }

  if (method !== 'GET' && body) {
    console.log('📤 Request Body:', JSON.stringify(body, null, 2));
  }

  if (token) console.log('🔐 Authentication: Token Provided');
  if (body) console.log('📦 Request Body:', body);

  const options: RequestInit = {
    method,
    headers,
    body: method !== 'GET' && body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);
    console.log(`📥 Response status: ${response.status}`);
    console.log(
      '📋 Response Headers:',
      JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2),
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`❌ API Error for ${url}:`, {
        status: response.status,
        body: errorBody,
        headers: Object.fromEntries(response.headers.entries()),
      });
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    if (response.status === 201) {
      return undefined as T;
    }
    if (response.status === 200) {
      const data = await response.json();
      console.log(`✅ Successful response from ${url}`, { dataPreview: data });
      return data;
    }

    if (response.status === 204) {
      return null as T;
    }

    throw new Error(`Unhandled response status: ${response.status}`);
  } catch (error) {
    console.error(`❌ API Request Failed for ${url}:`, error);
    throw error;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'status' in error;
}
