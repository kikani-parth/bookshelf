import { createContext, useState, useContext, ReactNode } from 'react';
import { useEffect } from 'react';
import { Book } from '../types';
import api from '../services/axiosInstance';
import { useAuth } from './AuthContext';
import { formatDate } from '../utils/formatDate';

interface IBookContext {
  readingList: Book[];
  finishedBooks: Book[];
  addToReadingList(book: Book): void;
  moveToFinished(bookId: string): void;
  removeFromReadingList(bookId: string): void;
  fetchReadingList(): Promise<void>;
  fetchFinishedBooks(): Promise<void>;
}

const BookContext = createContext<IBookContext | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);
  const { token } = useAuth();

  async function fetchReadingList() {
    if (!token) {
      console.log('user not found');
      return;
    }
    try {
      const response = await api.get(`/books?status=reading`);
      const formattedBooks: Book[] = response.data.map((book: Book) => ({
        ...book,
        publishedDate: formatDate(book.publishedDate),
      }));

      setReadingList(formattedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async function fetchFinishedBooks() {
    if (!token) {
      console.log('user not found');
      return;
    }
    try {
      const response = await api.get(`/books?status=finished`);
      const formattedBooks: Book[] = response.data.map((book: Book) => ({
        ...book,
        publishedDate: formatDate(book.publishedDate),
      }));

      setFinishedBooks(formattedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  async function addToReadingList(book: Book) {
    try {
      await fetchReadingList();
      await fetchFinishedBooks();

      // Check if book is in finishedBooks
      const isFinished = finishedBooks.some((b) => b.id === book.id);

      if (isFinished) {
        // If book exists in finished list, update status instead of re-adding
        await api.put(`/books/${book.id}/status`, { status: 'reading' });

        // Move book from finishedBooks to readingList
        setFinishedBooks((prev) => prev.filter((b) => b.id !== book.id));
        setReadingList((prevList) => [
          ...prevList,
          { ...book, status: 'reading' },
        ]);

        return;
      }

      // Check for duplicate in the latest reading list
      const isDuplicate = readingList.some((b) => b.id === book.id);

      if (isDuplicate) {
        console.log('Book already exists in reading list.');
        return;
      }

      // Remove the book from finishedBooks
      setFinishedBooks((prev) => prev.filter((b) => b.id !== book.id));

      // If book is completely new, add it to the database
      const response = await api.post(`/books`, {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        cover_image: book.cover_image,
        publishedDate: book.publishedDate,
        status: 'reading',
      });

      // Format the date before adding to state
      const formattedBook = {
        ...response.data,
        publishedDate: formatDate(response.data.publishedDate),
      };
      // add to reading list
      setReadingList((prevList) => [...prevList, formattedBook]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  async function moveToFinished(bookId: string) {
    try {
      const response = await api.put(`/books/${bookId}/status`, {
        status: 'finished',
      });

      // Remove from reading list
      setReadingList((prev) => prev.filter((b) => b.id !== bookId));

      const formattedBook = {
        ...response.data,
        publishedDate: formatDate(response.data.publishedDate),
      };

      // Add to finished books only if not already present
      setFinishedBooks((prev) => {
        const exists = prev.some((b) => b.id === bookId);
        return exists ? prev : [...prev, formattedBook];
      });
    } catch (error) {
      console.error('Error updating book status:', error);
    }
  }

  async function removeFromReadingList(bookId: string) {
    try {
      await api.delete(`/books/${bookId}`);

      setReadingList((prev) => prev.filter((b) => b.id !== bookId));
    } catch (error) {
      console.error('Error removing book:', error);
    }
  }

  return (
    <BookContext.Provider
      value={{
        readingList,
        finishedBooks,
        addToReadingList,
        moveToFinished,
        removeFromReadingList,
        fetchReadingList,
        fetchFinishedBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
