import axios from 'axios';

const API_URL = 'https://91bd-62-248-208-88.ngrok-free.app/api/auth';

export async function registerUser(username: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/register`, {
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
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // Returns user info & token
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to log in');
  }
}
