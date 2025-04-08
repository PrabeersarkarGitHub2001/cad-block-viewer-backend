const { Sequelize } = require('sequelize');
const config = require('../config.js').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.File = require('./File')(sequelize, Sequelize);
db.Block = require('./Block')(sequelize, Sequelize);

db.File.hasMany(db.Block, { foreignKey: 'fileId', onDelete: 'CASCADE' });
db.Block.belongsTo(db.File, { foreignKey: 'fileId' });

module.exports = db;
