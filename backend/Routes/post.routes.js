

const express = require('express');
const postController = require('../Controllers/post.controller');
const router = express.Router();
const multer = require('multer');
const { decodeToken } = require('../Helpers');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'Assets/Images');
	},
	filename: function (req, file, cb) {
		const suffixForImage = Date.now() + Math.round(Math.random() * 1e9) + '-';
		cb(null, suffixForImage + file.originalname.split(' ').join(''));
	},
});

const upload = multer({ storage });

router.get('/view', postController.viewPost);
router.get('/view/:id', decodeToken , postController.viewPostByUserId);
router.get('/viewById/:id', postController.viewPostByPostId);
router.post('/create', decodeToken ,upload.single('postImage')  ,postController.createPost);
router.post('/delete/:id', postController.deletePostByPostId);
router.put('/update/:id', postController.updatePostByPostId);

module.exports = router;
