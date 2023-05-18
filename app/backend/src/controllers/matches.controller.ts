import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  public static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query as { inProgress: string };
    const matches = inProgress ? await MatchesService.matchInProgress(inProgress)
      : await MatchesService.getMatches();
    res.status(200).json(matches);
  }

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await MatchesService.finishMatch(Number(id));
    res.status(200).json({ message: 'Match finished', match });
  }
}

export default MatchesController;
