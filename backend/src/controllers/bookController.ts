import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import axios from 'axios';
import pool from '../config/db';

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

export async function addBook(req: Request, res: Response) {
  //   const { userId } = req.user;
  const { userId } = res.locals.user;

  const { title, author, description, coverImage, publishedDate } = req.body;

  if (!title || !author) {
    res.status(400).json({ error: 'Title and author are required' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO books (user_id, title, author, description, cover_image_url, published_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, author, description, coverImage, publishedDate]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
}

export async function getBooks(req: Request, res: Response) {
  const { userId } = res.locals.user;

  try {
    const result = await pool.query('SELECT * FROM books WHERE user_id = $1', [
      userId,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Books not found' });
      return;
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
}

export async function deleteBook(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const { id } = req.params; // this is book's id

  try {
    const result = await pool.query(
      'DELETE FROM books WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ error: 'Book not found or unauthorized to delete' });
      return;
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
}
