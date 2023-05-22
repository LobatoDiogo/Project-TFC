import TeamModel from '../database/models/team.model';
import MatchesModel, { MatchesAtributes } from '../database/models/match.model';
import NotFoundError from '../utils/NotFoundError';

export interface INewMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

class MatchesService {
  public static async getMatches(): Promise<MatchesAtributes[]> {
    const matches = await MatchesModel.findAll({
      include:
        [{
          model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] },
        }],
    });
    return matches;
  }

  public static async matchInProgress(query: string): Promise<MatchesAtributes[]> {
    const matches = await MatchesModel.findAll({
      where: { inProgress: JSON.parse(query) },
      include:
        [{
          model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] },
        }],
    });
    return matches;
  }

  public static async finishMatch(id: number): Promise<MatchesAtributes> {
    const match = await MatchesModel.findByPk(id);

    if (!match) throw new NotFoundError('Match not found');

    if (match) {
      match.inProgress = false;
      await match.save();
    }
    return match?.toJSON() as MatchesAtributes;
  }

  public static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await MatchesModel.findByPk(id);
    if (match) {
      match.homeTeamGoals = homeTeamGoals;
      match.awayTeamGoals = awayTeamGoals;
      match.save();
    }
  }

  public static async createMatch(params: INewMatch): Promise<MatchesAtributes> {
    const match = await MatchesModel.create({
      ...params,
      inProgress: true,
    });
    return match;
  }
}
export default MatchesService;
