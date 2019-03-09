const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user')(sequelize, Sequelize);
const Post = require('./post')(sequelize, Sequelize);

Post.belongsTo(User);

module.exports = {
    sequelize,
    Sequelize,
    User,
    Post,
};
