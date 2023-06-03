import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter
  .get('/', leaderboardController.getLeaderboard)
  .get('/home', leaderboardController.getHomeLeaderboard)
  .get('/away', leaderboardController.getAwayLeaderboard);

export default leaderboardRouter;
