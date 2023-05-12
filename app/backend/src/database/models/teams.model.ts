import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

export interface TeamAtributes {
  id: number;
  teamName: string;
}

export type TeamCreationalAtributes = Optional<TeamAtributes, 'id'>;

class TeamModel extends Model<TeamAtributes, TeamCreationalAtributes> implements TeamAtributes {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'teams',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default TeamModel;
