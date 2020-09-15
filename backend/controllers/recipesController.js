const Recipes = require('../models/Recipe');

const recipesController = {
    newRecipe: async (req, res) => {
        const createRecipe = new Recipes({...req.body});

        createRecipe
        .save()
        .then((recipe) => {
          res.json({ success: true, recipe: recipe });
        })
        .catch((err) => {
          res.json({ success: false, error: err});
        });
    },
    getRecipes: async (req, res) => {
        const recipes = await Recipes.find({...req.params});
        res.json({
            success: true,
            recipes: recipes,
        });
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
    }
}
module.exports = recipesController
