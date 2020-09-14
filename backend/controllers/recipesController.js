const Recipes = require('../models/Recipe');

const recipesController = {
    newRecipe: async (req, res) => {
        const { title, description, ingredients, urlPic, userPic, userId, importantContains, recipe, difficulty, diet} = req.body
        const createRecipe = new Recipe({
            title,
            description, 
            ingredients, 
            urlPic, 
            userPic, 
            userId, 
            importantContains, 
            recipe, 
            difficulty, 
            diet,
        });
        createRecipe
        .save()
        .then((recipe) => {
          res.json({ success: true, recipe: recipe });
        })
        .catch((err) => {
          res.json({ success: false, error: err});
        });
    },
    getAllRecipes: async (req, res) => {
        const recipes = await Recipes.find();
        res.json({
            success: true,
            recipes: recipes,
        });
    },
    deleteRecipe: async (req, res) =>{
        const id = req.params.id
        Recipes.findByIdAndDelete({_id: id})
        .then(() => res.json({success: true, res: "Su receta ha sido eliminada."}))
        .catch(err=>res.json({success:false, error: err}))
    },
    modifyRecipe: async(req, res)=>{
        Recipes.findOneAndUpdate({_id: req.body.id},{$set:{...req.body}})
        .then(()=> res.json({success: true, response: "Los datos se han modificado con éxito."}))
        .catch(err => res.json({success:false, error: err}))
    }
}
module.exports = recipesController