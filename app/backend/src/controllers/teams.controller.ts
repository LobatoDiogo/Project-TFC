import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  public static async findall(req: Request, res: Response) {
    const teams = await TeamService.findAll();
    return res.json(teams);
  }

  public static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findById(Number(id));
    return res.json(team);
  }
}

export default TeamController;
