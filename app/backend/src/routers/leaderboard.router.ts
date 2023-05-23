import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter
  .get('/home', leaderboardController.getHomeLeaderboard);

export default leaderboardRouter;
