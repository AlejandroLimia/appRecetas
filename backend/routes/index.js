const express = require("express")
const userController = require("../controllers/userController")
const commentController = require("../controllers/commentController")
const validator = require("../config/validator")
const passport = require("../config/passport")
const recipesController = require("../controllers/recipesController")

const router = express.Router()

router.route("/user/register")
.post(validator.validateUser,userController.createUser)

router.route("/user/n/:_id")
.get(userController.getUserInformation)

router.route("/user/modifyUser")
.put(userController.editUser)

router.route("/user/login")
.get(passport.authenticate('jwt',{session: false}), userController.decodeUser)
.post(userController.loginUser)

router.route("/comment/:recipeId")
.get(commentController.getComments)

router.route("/comment")
.post(commentController.postComment)
.put(commentController.modifyCommentById)

router.route("/comment/:id")
.delete(commentController.deleteCommentById)

router.route("/recipes/:diet")
.get(recipesController.getRecipes)

router.route("/recipes/likes")
.post(recipesController.getRecipeByLikes)

router.route("/recipes/user/:username").get(recipesController.getRecipesByUserId)

router.route("/recipe/:_id")
.get(recipesController.getRecipeById)
.delete(recipesController.deleteRecipe)

router.route("/recipes")
.get(recipesController.getRecipes)
.post(passport.authenticate('jwt',{session: false}), recipesController.newRecipe)
.put(recipesController.modifyRecipe)

router.route("/recipes/n/foto")
.post(passport.authenticate('jwt',{session: false}), recipesController.uploadPhoto)

module.exports = router;
