import { QueryTypes } from 'sequelize';
import getHomeTeams from '../utils/QueryHome';
import sequelize from '../database/models';

class LeaderboardService {
  public static async getHomeLeaderboard() {
    const leaderboard = await sequelize.query(getHomeTeams, { type: QueryTypes.SELECT });
    return leaderboard;
  }
}

export default LeaderboardService;
