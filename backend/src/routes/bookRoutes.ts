import express from 'express';
import {
  searchBooks,
  addBook,
  getBooks,
  deleteBook,
  updateBookStatus,
} from '../controllers/bookController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/search', searchBooks);
router.post('/', addBook);
router.get('/', getBooks);
router.put('/:id/status', updateBookStatus);
router.delete('/:id', deleteBook);

export default router;
