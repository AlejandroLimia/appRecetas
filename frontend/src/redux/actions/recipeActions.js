import axios from 'axios'
import { RUTA_API } from '../../constants'
import { toast } from 'react-toastify'

const recipeActions ={
    newRecipe: recipe => {
        return async (dispatch, getState) => {
            const response = await axios.post(RUTA_API+'/api/recipes', recipe)
            /*dispatch({
                type:"NEW_RECIPE",
                payload: toast.success("Su receta creada exitosamente."),
            })*/
        }
    },
    modifyRecipe: recipe =>{
        return async (dispatch, getState) => {
            const response = await axios.put(RUTA_API+'/api/recipes', recipe)
        }
    },
    getRecipe: (recipeId) =>{
        return(dispatch, getState)=>{
            const data= getState()
            const selectedRecipe = data.recipesReducer.recipes.filter((recipe)=> recipe._Id === recipeId)
            dispatch({
                type: "GET_RECIPE",
                payload: selectedRecipe[0],
            })
        }    
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
    getRecipes : diet => {
        return async (dispatch, getState) => {
        const response = axios.get(`${RUTA_API}'/api/recipes/${diet}`);
            dispatch({
                type:'GET_RECIPES',
                payload: response.data.recipes
            });

        }
    },
    /*filterRecipes : () => {
        return async (dispatch, getState) => {
            const recipes = getState().recipeReducer.recipes
            recipes.filter()
                
        }
    }*/
}
export default recipeActions
