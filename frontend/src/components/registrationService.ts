import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? '';

export interface RegistrationData {
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface FieldErrors {
  [field: string]: string;
}

export interface RegistrationResponse {
  success: boolean;
  errors?: FieldErrors;
}

/**
 * Sends registration data to the backend.
 */
export const registerUser = async (
  data: RegistrationData
): Promise<RegistrationResponse> => {
  const response = await axios.post<RegistrationResponse>(`${API_BASE}/registration`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};