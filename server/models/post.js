module.exports = (sequelize, DataTypes) => {
	return sequelize.define('post', {
        title: DataTypes.STRING(100),
        text: DataTypes.TEXT,
    }, {
		timestamps: true,
		paranoid: true,
	})
};