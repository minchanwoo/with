const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

router.get('/info', (req, res) => {
	res.send({ user: req.session.user });
});

router.post('/join', async (req, res, next) => {
	const { name, nick, password, password_confirm, email } = req.body;

	try {
		if (!/^([a-z0-9A-Z_]+)@(naver|gmail)\.com$/.test(email)) {
			throw new Error('naver.com 나 gmail.com 으로만 가입 가능합니다.');
		} else if (!/^[a-z0-9A-Z]{8,16}$/.test(password)) {
			throw new Error('비밀번호는 8자 이상, 16자 이하여야 합니다.');
		} else if (!/[a-z]+/.test(password) || !/[A-Z]+/.test(password) || !/[0-9]+/.test(password)) {
			throw new Error('비밀번호에는 영문 대문자, 영문 소문자, 숫자가 각각 1글자 이상 포함되어야 합니다.');
		} else if (password !== password_confirm) {
			throw new Error('비밀번호와 비밀번호 확인값이 다릅니다.');
		}
	
		const exUserByEmail = await User.find({ where:{ email: email } });
		if (exUserByEmail) {
			throw new Error('기존에 가입된 이메일 주소입니다.');
		}

		const exUserByName = await User.find({ where:{ name: name } });
		if (exUserByName) {
			throw new Error('기존에 가입된 이름입니다.');
		}

		const exUserByNick = await User.find({ where:{ nick: nick } });
		if (exUserByNick) {
			throw new Error('기존에 가입된 닉네임입니다.');
		}
		const hash = await bcrypt.hash(password, 12);
		var result = await User.create({
			name,
			nick,
			email,
			password: hash,            
		});
		res.send({ result: result });
	} catch(error) {
		res.status(500).send({errorMessage: error.message});
	}
});

router.post('/login', async(req, res) => {
	const { email, password } = req.body;
	try {
		const userByEmail = await User.find({ where: { email: email }});
		if (!userByEmail) {
			throw new Error('사용자가 없습니다.')
		}
		const compare = bcrypt.compareSync(password, userByEmail.password);
		if (!compare) {
			throw new Error('비밀번호가 틀렸습니다.');
		}
		res.status(200).send('ok');
		req.session.user = {
			name: userByEmail.name,
			email: userByEmail.email
		};
		req.session.save();
	} catch(error) {
		res.status(500).send({errorMessage: error.message});
	}
})

router.post('/logout', (req, res)=> {
	req.session.destroy();
	console.log('LOGOUT SUCCESS!!');
});

module.exports = router;