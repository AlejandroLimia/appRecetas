const Comment = require("../models/Comment")

const commentController = {
	postComment: (req, res) => {
		const newComment = new Comment({ ...req.body })
		newComment
			.save()
			.then(resp => res.json({ success: true, resp }))
			.catch(error => res.json({ success: false, error }))
	},
	getComments: async (req, res) => {
		const comments = await Comment.find({ ...req.params })
		res.json({ success: true, comments })
	},
	deleteCommentById: (req, res) => {
		
		Comment.findByIdAndDelete(req.params.id)
			.then(resp => res.json({ success: true, resp }))
			.catch(error => res.json({ success: false, error }))
		
	},
	modifyCommentById: (req, res) => {
		const { commentId, comment } = req.body
		Comment.findByIdAndUpdate(commentId, { comment }, { new: true })
			.then(comment => res.json({ success: true, comment }))
			.catch(error => res.json({ success: false, error }))
	},
}

module.exports = commentController
