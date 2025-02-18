import { Book } from '../types';

export type RootStackParamList = {
  Main: undefined;
  BookDetails: { book: Book };
};
