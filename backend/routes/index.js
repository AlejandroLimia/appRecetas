const express = require('express');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController')
const validator = require('../config/validator');
const passport = require('../config/passport');
const recipesController = require('../controllers/recipesController')

const router = express.Router();

router.route("/user/register")
.post(validator.validateUser,userController.createUser)

router.route("/user/login")
.get(passport.authenticate('jwt',{session: false}), userController.decodeUser)
.post(userController.loginUser)

router.route("/comment/:recipeId")
.get(commentController.getComments)

router.route("/comment")
.post(commentController.postComment)
.delete(commentController.deleteCommentById)
.put(commentController.modifyCommentById)

router.route("/recipes/:diet")
.get(recipesController.getRecipes)

router.route("/recipes/:userId")
.get(recipesController.getRecipes)

router.route("/recipes/:_id")
.get(recipesController.getRecipeById)

router.route("/recipes")
.get(recipesController.getRecipes)
.post(recipesController.newRecipe)
.put(recipesController.modifyRecipe)
.delete(recipesController.deleteRecipe)

module.exports = router; 

