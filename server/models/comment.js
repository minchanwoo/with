module.exports = (sequelize, DataTypes) => {
		return sequelize.define('comment', {
				text: DataTypes.TEXT,
    }, {
				timestamps: true,
				paranoid: true,
		})
};