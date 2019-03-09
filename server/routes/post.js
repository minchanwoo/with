const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.post('/new', async (req, res) => {
    try {
        const user_created = await Post.create({
            userId: req.session.user.id,
            title: req.body.title,
            text: req.body.text,
        })
        res.send({ id: user_created.id });
    } catch (e)  {
        console.log(e);
    }
});

router.get('/:id', async (req, res) => {
    const post = await Post.find({ where: { id: req.params.id }});

    const user = req.session.user;

    const is_my_post = user
     ? user.id === post.userId
     : false;
    res.send({ post, is_my_post });
})

module.exports = router;