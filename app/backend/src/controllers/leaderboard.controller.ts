import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class leaderboardController {
  public static async getHomeLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getHomeLeaderboard();
    return res.status(200).json(leaderboard);
  }
}

export default leaderboardController;
