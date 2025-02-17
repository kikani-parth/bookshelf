import api from './axiosInstance';
import { Book } from '../types';

export async function searchBooks(query: string) {
  try {
    const response = await api.get<Book[]>('books/search', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
}
