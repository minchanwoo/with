module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		name: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		nick: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		provider: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: 'local',
		},
	}, {
		timestamps: true,
		paranoid: true,
	})
};