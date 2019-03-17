module.exports = (sequelize, DataTypes) => {
		return sequelize.define('like', {
        
    }, {
				timestamps: true,
				paranoid: true,
		})
};