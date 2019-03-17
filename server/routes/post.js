const express = require('express');
const { Post, User, Like } = require('../models');

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
    const post = await Post.findOne({ 
        where: { id: req.params.id },
        include: [{
            model: Like,
            attributes: ['id'],
            include: [{
                model: User,
                attributes: ['id', 'name'],
            }],
        }],
    });

    const user = req.session.user;

    const is_my_post = user
     ? user.id === post.userId
     : false;
    res.send({ post, is_my_post });
})

router.get('/', async(req, res) => {
    const page = Number(req.query.page);
    const items_per_page = Number(req.query.items_per_page);
    const posts = await Post.findAll({
        order: [
            ['id', 'DESC'],
        ],
        include: [{
            model: User,
            attributes: ['name', 'id']
        }],
        offset: (page - 1) * items_per_page,
        limit: items_per_page,
    });
    const count = await Post.count();
    const total_page = Math.ceil(count / items_per_page);
    res.send({ posts, total_page });
})

router.delete('/:id', async(req, res) => {
    const post = await Post.findOne({ where: { id: req.params.id }});
    if (req.session.user.id === post.userId) {
        await Post.destroy({where: {id: req.params.id}});
        res.send({ id: req.params.id });
    } else {
        res.status(500).send({errorMessage: 'not authorized'});
    }
})

module.exports = router;