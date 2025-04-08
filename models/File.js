module.exports = (sequelize, DataTypes) => {
    return sequelize.define('File', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploadDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  };
  