const mongoose = require("mongoose")
const RecipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    ingredients:{
        type: Array,
        required: true
    },
    recipe: {
        type: String,
        required: true
	},
	importantContain:{
		type: Array,
		default: []
	},
		diet:{
		type: Array,
		required: true
    },
    difficulty:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0,
    },
    urlPic:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.ObjectId, ref: "user"
    },
    userPic:{
        type: String
    },
    duration:{
		type: Number,
		required: true
    }
},{timestamps:true})
const Recipes = mongoose.model("recipe", RecipeSchema)
module.exports = Recipes



// Recipe
// 	_id
// 	title string
// 	description string
// 	ingredients [ {
// 					quantity,
// 					ingredient
// 				}]
// 	recipe string
// 	importantContains [array]
// 	diet [array]
// 	difficulty string
// 	createdAt: date/string
// 	likes: ? / number
// 	urlPic: string
// 	userId: objectID
// 	userPic: string/uri