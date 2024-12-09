

const express = require('express');
const liveUpdateController = require('../Controllers/liveUpdate.controller');
const router = express.Router();
const multer = require('multer');
const {decodeToken} = require("../Helpers");

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

router.get('/view', liveUpdateController.viewLiveUpdate);
router.get('/view/:id', decodeToken ,liveUpdateController.viewLiveUpdateById);
router.post(
	'/create',
	decodeToken,
	upload.single('liveUpdate'),
	liveUpdateController.createLiveUpdate
);

module.exports = router;
