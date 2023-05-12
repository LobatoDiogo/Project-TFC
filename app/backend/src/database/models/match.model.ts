import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

export interface MatchesAtributes {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type MatchesCreationalAtributes = Optional<MatchesAtributes, 'id'>;

class MatchesModel
  extends Model<MatchesAtributes, MatchesCreationalAtributes>
  implements MatchesAtributes {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'matches',
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeamId', as: 'homeMatches' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'awayMatches' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default MatchesModel;
