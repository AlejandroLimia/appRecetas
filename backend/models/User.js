mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	mail: {
		type: String,
		required: true,
        trim: true,
        unique: true
    },
    description:{
        type:String,
        trim:true
    },
	pass: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
        trim: true,
		unique: true
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
userSchema.plugin(uniqueValidator,{ message: '{PATH} alredy used'});
module.exports = User;
