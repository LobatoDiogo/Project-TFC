import TeamModel from '../database/models/team.model';
import MatchesModel, { MatchesAtributes } from '../database/models/match.model';

class MatchesService {
  public static async getMatches(): Promise<MatchesAtributes[]> {
    const matches = await MatchesModel.findAll({
      include:
        [{
          model: TeamModel,
          as: 'homeTeam',
          attributes: {
            exclude: ['id'],
          },
        },
        {
          model: TeamModel,
          as: 'awayTeam',
          attributes: {
            exclude: ['id'],
          },
        }],
    });
    return matches;
  }

  //  filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas
  public static async matchInProgress(query: string): Promise<MatchesAtributes[]> {
    const matches = await MatchesModel.findAll({
      where: { inProgress: JSON.parse(query) },
      include:
        [{
          model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] },
        },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] },
        }],
    });
    return matches;
  }
}

export default MatchesService;
