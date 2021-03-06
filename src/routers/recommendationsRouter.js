import { Router } from 'express';
import * as recommendationsController from '../controllers/recommendationsController.js';

const router = new Router();

router.post('', recommendationsController.AddSong);
router.post('/:id/upvote', recommendationsController.upVote);
router.post('/:id/downvote', recommendationsController.downVote);
router.get('/random', recommendationsController.randomSong);
router.get('/top/:amount', recommendationsController.topSongs);

export default router;
