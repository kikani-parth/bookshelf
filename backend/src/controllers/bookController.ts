import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

interface VolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail: string;
  };
  publishedDate?: string;
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

interface GoogleBooksApiResponse {
  items: Book[];
}

export async function searchBooks(req: Request, res: Response) {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  try {
    const response = await axios.get<GoogleBooksApiResponse>(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${GOOGLE_BOOKS_API_KEY}`
    );

    const books = response.data.items.map((book) => ({
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(', '),
      description: book.volumeInfo.description,
      publishedDate: book.volumeInfo.publishedDate,
      coverImage: book.volumeInfo.imageLinks?.thumbnail,
    }));

    res.status(200).json(books);
    // res.status(200).json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}
