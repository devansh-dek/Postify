import express from 'express';
import { createTweet, getTweet } from '../../controller/tweet-controller.js';
import { toggleLike } from '../../controller/like-controller.js';
import { createComment } from '../../controller/comment-controller.js';
import { signup, login } from '../../controller/auth-controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/tweet', authenticate, createTweet)
router.get('/tweets/:id', getTweet);
router.post('/like/toggle', authenticate, toggleLike);
router.post('/comments', authenticate, createComment);

export default router;