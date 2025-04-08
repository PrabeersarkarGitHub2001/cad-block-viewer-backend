module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Block', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      x: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      y: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      properties: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    });
  };
  