const express = require('express');
const { Post, User, Like, Comment } = require('../models');

const router = express.Router();

const aws = require('aws-sdk')
const multer  = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
	region: 'ap-northeast-2',
})

const upload = multer({
	storage: multerS3({
		s3,
		bucket: 'minchanwoo-with',
		acl: 'public-read',
		key: function (req, file, cb) {
			cb(null, `post/${Date.now()}_${file.originalname}`)
		}
	})
})

router.post('/image_upload', upload.single('image'), async(req, res) => {
    res.send({image_url: req.file.location});
});

router.post('/:id', async (req, res) => {
    if (req.params.id === 'new') {
        const user_created = await Post.create({
            userId: req.session.user.id,
            title: req.body.title,
            text: req.body.text,
        })
        res.send({ id: user_created.id });
    } else {
        await Post.update(req.body, { id: req.params.id });
        res.send('ok');
    }
});

router.get('/:id', async (req, res) => {
    if (req.query.simple === 'true') {
        const post = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['text', 'title']
        });
        res.send({ post });
        return;
    }
    const post = await Post.findOne({ 
        where: { id: req.params.id },
        include: [
            {
                model: Like,
                attributes: ['id'],
                include: [{
                    model: User,
                    attributes: ['id', 'name'],
                }],
            },
            {
                model: Comment,
                attributes: ['id', 'text', 'createdAt'],
                include: [{
                    model: User,
                    attributes: ['id', 'name'],
                }],
            },
        ],
    });

    const user = req.session.user;

    const is_my_post = user
     ? user.id === post.userId
     : false;
    res.send({ post, is_my_post });
})

router.post('/:postId/comments', async (req, res) => {
    const result = await Comment.create({
        postId: req.params.postId,
        userId: req.session.user.id,
        text: req.body.text,
    });
    console.log('REUSLT!!', result);
    res.send({ result, user_name: req.session.user.name });
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