import axios from 'axios';

export interface Document {
  title: string;
  description: string;
  link: string;
}

/**
 * Fetch the list of documents available for the logged‑in user.
 * Expected endpoint: GET /api/docs
 */
export const fetchDocuments = async (): Promise<Document[]> => {
  const response = await axios.get<Document[]>('/api/docs');
  return response.data;
};

/**
 * Retrieve the current authenticated user.
 * Expected endpoint: GET /api/auth/me
 * Returns an object with a `username` property.
 */
export const fetchCurrentUser = async (): Promise<{ username: string }> => {
  const response = await axios.get<{ username: string }>('/api/auth/me');
  return response.data;
};

/**
 * Perform logout using Spring Security CSRF protection.
 * Expected endpoint: POST /logout
 * CSRF token is read from the meta tag rendered by Spring Security:
 *   <meta name="_csrf" content="..."/>
 *   <meta name="_csrf_header" content="..."/>
 */
export const logout = async (): Promise<void> => {
  const token = document.querySelector('meta[name="_csrf"]')?.getAttribute('content');
  const headerName = document.querySelector('meta[name="_csrf_header"]')?.getAttribute('content');

  if (!token || !headerName) {
    throw new Error('CSRF token or header not found');
  }

  await axios.post(
    '/logout',
    {},
    {
      headers: {
        [headerName]: token,
      },
    }
  );
};