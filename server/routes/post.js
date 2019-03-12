const express = require('express');
const { Post, User } = require('../models');

const router = express.Router();

const POST_PER_PAGE = 2;

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

router.get('/', async(req, res) => {
    const page = Number(req.query.page);
    const posts = await Post.findAll({
        order: [
            ['id', 'DESC'],
        ],
        include: [{
            model: User,
            attributes: ['name', 'id']
        }],
        offset: (page - 1) * POST_PER_PAGE,
        limit: POST_PER_PAGE,
    });
    const count = await Post.count();
    const total_page = Math.ceil(count / POST_PER_PAGE);
    res.send({ posts, total_page });
})

module.exports = router;