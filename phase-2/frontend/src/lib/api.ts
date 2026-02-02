// Strip trailing slashes and /items prefix if present in the environment variable
const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  .replace(/\/+$/, '')
  .replace(/\/items$/, '');

const API_URL = BASE_URL;

export class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(response.status, errorData.detail || 'An error occurred');
  }
  return response.json();
}

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`);
    return handleResponse<T>(response);
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return handleResponse<T>(response);
  },
};