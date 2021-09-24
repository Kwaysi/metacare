import { Model, Sequelize as DataTypes } from 'sequelize/types';
import { Comment } from '../../types';

interface CommentInstance extends Model<Comment>, Comment {}

export default function Comments(sequelize: DataTypes, DataTypes) {
  const comments = sequelize.define<CommentInstance>(
    'comments',
    {
      id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        validate: {
          isUUID: {
            args: 4,
            msg: 'id must be uuid',
          },
        },
      },
      ipAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      movieId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {}
  );

  // @ts-ignore
  comments.associate = function (models) {
    // associations can be defined here
  };

  return comments;
}
