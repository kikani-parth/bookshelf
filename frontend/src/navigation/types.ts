import { Book } from '../types';

export type RootStackParamList = {
  Main: undefined;
  BookDetails: { book: Book };
  Auth: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
