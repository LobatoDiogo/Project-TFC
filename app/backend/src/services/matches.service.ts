import TeamModel from '../database/models/team.model';
import MatchesModel, { MatchesAtributes } from '../database/models/match.model';

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
}

export default MatchesService;
