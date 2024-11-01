const apiPath = process.env.PUBLIC_API_PATH || "http://localhost:9500";

export async function apiRequest(
  endpoint: string,
  method: string,
  body?: unknown,
  token?: string,
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer  ${token}'
`;
  }

  console.log(
    `Requesting ${apiPath}${endpoint} with method ${method} and headers`,
    headers,
  );


  const response = await fetch(`${apiPath}${endpoint}`, {
    method,
    headers,
    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error response:", errorBody);
    throw new Error(
      `HTTP error! status: ${response.status}, body: ${errorBody}`,
    );
  }

  return response.json();
}
