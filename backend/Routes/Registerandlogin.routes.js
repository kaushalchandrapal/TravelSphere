const express = require('express');
const userController = require('../Controllers/Registerandlogin.controller');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'Assets/Images');
	},
	filename: function (req, file, cb) {
		const suffixForImage = Date.now() + Math.round(Math.random() * 1e9) + '-';
		cb(null, suffixForImage + file.originalname.split(' ').join(''));
        console.log("filewwww" , file);
        
	},
});

const upload = multer({ storage });

router.post('/register',upload.single("profilePic"), userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
