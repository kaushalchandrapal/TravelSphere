

const mongoose = require('mongoose');

const liveUpdateSchema = new mongoose.Schema({
	userId: {
		type: Number,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('liveUpdate', liveUpdateSchema);
