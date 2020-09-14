const express = require('express');
const userController = require('../controllers/userController');
const validator = require('../config/validator');
const passport = require('../config/passport');
const recipesController = require('../controllers/recipesController')

const router = express.Router();


router.route("/recipes")
.get(recipesController.getAllRecipes)
.post(recipesController.newRecipe)
.put(recipesController.modifyRecipe)
.delete(recipesController.deleteRecipe)


module.exports = router; 