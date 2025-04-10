const API_URL = 'http://127.0.0.1:5000/'


export const request = async <TResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<TResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const URL = `${API_URL}${endpoint}`;

  const response = await fetch(URL, {
    headers: headers,
    method: options?.method ? options?.method :'GET'
  });

  if (response.ok) {
    if (response.status === 204) {
      return {} as TResponse;
    }

    return await response.json();
  }

  const error = await response.json();

  throw new Error(error.message);
};