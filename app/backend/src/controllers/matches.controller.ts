import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  public static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query as { inProgress: string };
    const matches = inProgress ? await MatchesService.matchInProgress(inProgress)
      : await MatchesService.getMatches();
    res.status(200).json(matches);
  }
}

export default MatchesController;
