const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function refreshToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) throw new Error('Failed to refresh token');

  const data = await res.json();
  localStorage.setItem('token', data.accessToken);
  return data.accessToken;
}

export async function $api(path: string, options: RequestInit = {}, isRetry = false): Promise<any> {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };


  console.log('API Request:', { url: `${BASE_URL}${path}`, config });

  const response = await fetch(`${BASE_URL}${path}`, config);

  if (response.status === 401 && !isRetry) {
    try {
      const newToken = await refreshToken();

      const retryHeaders: HeadersInit = {
        ...headers,
        Authorization: `Bearer ${newToken}`,
      };

      const retryConfig: RequestInit = {
        ...options,
        headers: retryHeaders,
        credentials: 'include',
      };

      return await $api(path, retryConfig, true);
    } catch (err) {
      console.error('Refresh token failed:', err);
      throw err;
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const jsonData = await response.json();
  console.log('API Response data:', jsonData)
  return response.json();
}
