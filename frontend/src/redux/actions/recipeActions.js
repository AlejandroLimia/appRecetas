import axios from 'axios'
import { RUTA_API } from '../../constants'
import { toast } from 'react-toastify'

const recipeActions ={
    newRecipe: recipe => {
        return async (dispatch, getState) => {
            const response = await axios.post(RUTA_API+'/api/recipes', recipe);
            /*dispatch({
                type:"NEW_RECIPE",
                payload: toast.success("Su receta creada exitosamente."),
            })*/
        };
    },
    modifyRecipe: recipe =>{
        return async (dispatch, getState) => {
            const response = await axios.put(RUTA_API+'/api/recipes', recipe)
        }
    },
    getRecipe: (recipeId) =>{
        return async (dispatch, getState)=>{
            //const recipes = getState().recipesReducer.recipes;
            // const selectedRecipe = null;

            // if(!recipes) 
            //     selectedRecipe = await axios.get(`${RUTA_API}/api/recipes/${recipeId}`);
            // else
            //     selectedRecipe = recipes.filter((recipe)=> recipe._Id === recipeId);

            // dispatch({
            //     type: "GET_RECIPE",
            //     payload: recipes? selectedRecipe[0]:selectedRecipe.data.recipe,
			// });
			const selectedRecipe = await axios.get(`${RUTA_API}/api/recipe/${recipeId}`);
			dispatch({
			    type: "GET_RECIPE",
			    payload: selectedRecipe.data.recipeInfo
			});

        };
    },
    userRecipes: (userId) =>{
        return(dispatch, getState)=>{
            const response = axios.get(`${RUTA_API}'/api/recipes/${userId}`)
            dispatch({
                type: "USER_RECIPES",
                payload: response.data.recipes
            })
        }  
    },
    //comentario
    getRecipes : diet => {
        return async (dispatch, getState) => {
			console.log(`${RUTA_API}'/api/recipes/${diet}`)
			const response = await axios.get(`${RUTA_API}/api/recipes/${diet}`);
			console.log(response)
            dispatch({
                type:'GET_RECIPES',
                payload: response.data.recipes
            });

        };
    },
    /*filterRecipes : () => {
        return async (dispatch, getState) => {
            const recipes = getState().recipeReducer.recipes
            recipes.filter()
                
        }
    }*/
}
export default recipeActions
