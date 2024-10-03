const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	profilePic: {
		type: String,
	},
	socialMediaHandle: {
		type: String,
	},
	userBio: {
		type: String,
	},
	userEmail: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('user', userSchema);