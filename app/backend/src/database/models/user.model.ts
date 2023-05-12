import { DataTypes, Model, Optional } from 'sequelize';
import db from '.';

export interface UserAtributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type UserCreationalAtributes = Optional<UserAtributes, 'id'>;

class UserModel extends Model<UserAtributes, UserCreationalAtributes> implements UserAtributes {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default UserModel;
