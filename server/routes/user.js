const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

router.post('/join', async (req, res, next) => {
	const { name, nick, password, password_confirm, email } = req.body;
	
	try {
		const exUser = await User.find({ where:{ email: email } });
		
		if (exUser) {
			return;
		}
		const hash = await bcrypt.hash(password, 12);
		var result = await User.create({
			name,
			nick,
			email,
			password: hash,            
		});
		return result;
	} catch(error) {
		return next(error);
	}
});

module.exports = router;