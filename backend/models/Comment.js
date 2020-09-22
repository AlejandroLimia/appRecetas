const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		require: true,
		trim: true,
	},
	recipeId: {
		type: mongoose.Schema.ObjectId,
		ref: "recipes",
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	userPic: {
		type: String,
	},
})
const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment
