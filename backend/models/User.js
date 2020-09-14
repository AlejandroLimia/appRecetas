const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	mail: {
		type: String,
		required: true
	},
	pass: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	urlPic: {
		type: String,
		default: false
	},
	likes: {
		type: Array,
		default: []
	}
})

const User = mongoose.model('user', userSchema);

module.exports = User;