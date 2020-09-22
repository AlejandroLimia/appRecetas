const Recipes = require('../models/Recipe');

const recipesController = {
    newRecipe: async (req, res) => {
		const { username, _id, urlPic } = req.user
        const createRecipe = new Recipes({
								...req.body,
								username,
								userId: _id,
								userPic: urlPic
							});
		
        createRecipe
        .save()
        .then((recipe) => {
            res.json({ success: true, recipe});
        })
        .catch((err) => {
            res.json({ success: false, error: err});
        });
    },
    getRecipes: async (req, res) => {
        const recipes = await Recipes.find({...req.params});
        res.json({
            success: true,
            recipes
        });
    },
    getRecipesByUserId: async (req, res) => {
        const recipes = await Recipes.find({...req.params});
        res.json({
            success: true,
            recipes:recipes
        });
    },
    getRecipeById: async (req,res) => {
        const recipeInfo= await Recipes.findOne({...req.params})
        res.json({
            success: true,
            recipeInfo: recipeInfo
        })
    },
    getRecipeByLikes:async(req,res) => {
        const likes = req.body
        if(likes.length === 0) return res.json({ success: true, recipeLikes:[]})
        let recipeLikes = []
        likes.map( async(id, index) => {
            const recipe  = await Recipes.findOne({_id: id})
            recipeLikes.push(recipe)
            if(index+1 === likes.length) return res.json({ success: true, recipeLikes:recipeLikes})
        })
    },
    deleteRecipe: async (req, res) =>{
		const id = req.body._id
        Recipes.findByIdAndDelete({_id: id})
        .then(() => res.json({success: true, res: "Su receta ha sido eliminada."}))
        .catch(err=>res.json({success:false, error: err}))
    },
    modifyRecipe: async(req, res)=>{
        Recipes.findOneAndUpdate({_id: req.body._id},{$set:{...req.body}})
        .then(()=> res.json({success: true, response: "Los datos se han modificado con éxito."}))
        .catch(err => res.json({success:false, error: err}))
	},
	uploadPhoto: (req, res) => { //Funcion para guardar las fotos
		const path = require('path');
		const file = req.files.pic
		const ruta = `${path.join(__dirname, '..', 'client', 'img')}/${req.body.nombre}.jpg`
		let error = null
		file.mv(ruta, err => {
		 		if (err) {
		 			error = 'Problemas al grabar la imagen';
				 }
				 else res.json({
					 success: !error ? true : false,
					 error
					})
		})	
	}
}
module.exports = recipesController
