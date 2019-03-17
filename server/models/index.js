const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user')(sequelize, Sequelize);
const Post = require('./post')(sequelize, Sequelize);
const Like = require('./like')(sequelize, Sequelize);

Post.belongsTo(User);
Post.hasMany(Like);

Like.belongsTo(User);
Like.belongsTo(Post);

module.exports = {
    sequelize,
    Sequelize,
    User,
    Post,
    Like,
};
