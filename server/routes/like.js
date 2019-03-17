const express = require('express');

const { Like } = require('../models');

const router = express.Router();

router.post('/:postId', async(req, res) => {
    const user = req.session.user;

    if (!user || !user.id) {
        res.status(500).send({ errorMessage: 'not logged in' });
        return;
    }
    const like = await Like.findOne({ where: { postId: req.params.postId, userId: user.id }});
    if (like) {
        await like.destroy();
        res.send({ result: 'DELETED', user: { name: user.name, id: user.id } })
        return;
    }
    await Like.create({
        userId: user.id,
        postId: req.params.postId,
    });
    res.send({ result: 'ADDED', user: { name: user.name, id: user.id } });
});

module.exports = router;