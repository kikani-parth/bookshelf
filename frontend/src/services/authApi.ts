import api from './axiosInstance';

export async function registerUser(username: string, password: string) {
  try {
    const response = await api.post('auth/register', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Failed to register');
  }
}

// Login user
export async function loginUser(username: string, password: string) {
  try {
    const response = await api.post('auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to log in');
  }
}
