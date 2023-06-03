import { QueryTypes } from 'sequelize';
import getHomeTeams from '../utils/QueryHome';
import sequelize from '../database/models';
import getAwayTeams from '../utils/QueryAway';
import getAllTeams from '../utils/QueryTableGeral';

class LeaderboardService {
  public static async getHomeLeaderboard() {
    const leaderboard = await sequelize.query(getHomeTeams, { type: QueryTypes.SELECT });
    return leaderboard;
  }

  public static async getAwayLeaderboard() {
    const leaderboard = await sequelize.query(getAwayTeams, { type: QueryTypes.SELECT });
    return leaderboard;
  }

  public static async getLeaderboard() {
    const leaderboard = await sequelize.query(getAllTeams, { type: QueryTypes.SELECT });
    return leaderboard;
  }
}

export default LeaderboardService;
