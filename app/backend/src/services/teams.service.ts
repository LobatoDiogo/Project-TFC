import NotFoundError from '../utils/NotFoundError';
import TeamModel, { TeamAtributes } from '../database/models/team.model';

class TeamService {
  public static async findAll(): Promise<TeamAtributes[]> {
    const teams = await TeamModel.findAll();
    // return teams.map((team) => team.toJSON());
    return teams;
  }

  public static async findById(id: number): Promise<TeamAtributes> {
    const team = await TeamModel.findOne({
      where: { id },
    });

    if (!team) throw new NotFoundError('Team does not exists');

    return team.toJSON();
  }
}

export default TeamService;
