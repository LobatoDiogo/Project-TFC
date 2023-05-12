import TeamModel, { TeamAtributes } from '../database/models/team.model';

class TeamService {
  public static async findAll(): Promise<TeamAtributes[]> {
    const teams = await TeamModel.findAll();
    return teams.map((team) => team.toJSON());
  }

  public static async findById(id: number): Promise<TeamAtributes> {
    const team = await TeamModel.findOne({
      where: { id },
    });

    if (!team) throw new Error('Team not found');

    return team.toJSON();
  }
}

export default TeamService;
