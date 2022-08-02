import express from 'express';
import {} from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('signup', signup);
export default router;
