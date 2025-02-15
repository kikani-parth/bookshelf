import express from 'express';
import { searchBooks, addBook } from '../controllers/bookController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/search', searchBooks);
router.post('/', addBook);

export default router;
