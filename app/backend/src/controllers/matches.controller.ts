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

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Match updated' });
  }

  public static async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = await MatchesService
      .createMatch({
        homeTeamGoals,
        awayTeamGoals,
        homeTeamId,
        awayTeamId });
    res.status(201).json(newMatch);
  }
}

export default MatchesController;
