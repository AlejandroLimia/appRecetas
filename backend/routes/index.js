const express = require('express');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController')
const validator = require('../config/validator');
const passport = require('../config/passport');

const router = express.Router();

router.route('/user/register')
.post(userController.createUser)

router.route('/user/login')
.post(userController.loginUser)


router.route("/comment/:recipeId")
.get(commentController.getComments)

router.route("/comment")
.post(commentController.postComment)
.delete(commentController.deleteCommentById)
.put(commentController.modifyCommentById)



.get((req, res) => res.send('Hola'));


module.exports = router; 
