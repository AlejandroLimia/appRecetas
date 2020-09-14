const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		trim: true
	},
	mail: {
		type: String,
		required: true,
		trim: true
	},
	pass: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		trim: true
	},
	urlPic: {
		type: String,
		default: false,
		trim: true
	},
	likes: {
		type: Array,
		default: []
	}
})

const User = mongoose.model('user', userSchema);

module.exports = User;