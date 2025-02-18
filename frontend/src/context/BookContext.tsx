import { createContext, useState, useContext, ReactNode } from 'react';
import { Book } from '../types';

interface IBookContext {
  readingList: Book[];
  finishedBooks: Book[];
  addToReadingList(book: Book): void;
  moveToFinished(bookId: string): void;
  removeFromReadingList(bookId: string): void;
}

const BookContext = createContext<IBookContext | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);

  const addToReadingList = (book: Book) => {
    setReadingList((prevList) => {
      if (prevList.some((b) => b.id === book.id)) return prevList; // Avoid duplicates
      return [...prevList, book];
    });
  };

  const moveToFinished = (bookId: string) => {
    const book = readingList.find((b) => b.id === bookId);
    if (book) {
      setFinishedBooks((prevList) => {
        if (prevList.some((b) => b.id === book.id)) return prevList; // Avoid duplicates
        return [...prevList, book];
      });
      setReadingList((prevList) => prevList.filter((b) => b.id !== book.id));
    }
  };

  const removeFromReadingList = (bookId: string) => {
    setReadingList((prev) => prev.filter((b) => b.id !== bookId));
  };

  return (
    <BookContext.Provider
      value={{
        readingList,
        finishedBooks,
        addToReadingList,
        moveToFinished,
        removeFromReadingList,
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
