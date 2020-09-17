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
    username:{
        type: String,
        required: true
    },
    ingredients:{
        type: Array,
        required: true
},
    recipe: {
        type: Array,
        required: true
	},
	importantContain:{
		type: Array,
		default: []
    },
    diet:{
		type: String,
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
