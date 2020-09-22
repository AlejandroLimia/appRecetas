import axios from "axios"
import { RUTA_API } from "../../constants"
import { toast } from "react-toastify"

const recipeActions = {
	createRecipe: (recipe, foto) => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + "/api/recipes", recipe, {
				headers: {
					'Authorization': "Bearer " + getState().userReducer.token,
				}
			})
			
			if(response.data.success) {
				foto.append('nombre', response.data.recipe._id)				
				const responseFoto = await axios.post(RUTA_API + "/api/recipes/n/foto", foto, {
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': "Bearer " + getState().userReducer.token,
					}
				})
				if(responseFoto.data.success) toast.success("Receta Guardada")
				else toast.error("Fallo al guardar la imagen")
			}
			else toast.error("Fallo")
		}
	},
	modifyRecipe: recipe => {
		return async (dispatch, getState) => {
            const response = await axios.put(RUTA_API + "/api/recipes", recipe)
		}
	},
	getRecipe: recipeId => {
		return async (dispatch, getState) => {
			const selectedRecipe = await axios.get(
				`${RUTA_API}/api/recipe/${recipeId}`
			)
			dispatch({
				type: "GET_RECIPE",
				payload: selectedRecipe.data.recipeInfo,
			})
		}
	},
	userRecipes: username => {
		return async(dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/recipes/user/${username}`)
			dispatch({
				type: "USER_RECIPES",
				payload: response.data.recipes,
			})
		}
	},
	//comentario
	getRecipes: diet => {
		return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/recipes/${diet}`)
            dispatch({
                type:'GET_RECIPES',
                payload: response.data.recipes
            });

        };
    },
    filterRecipes : title => {
        return async (dispatch, getState) => {
            const recipes = getState().recipeReducer.recipes;
            const filterRecipes = recipes.filter(recipe => recipe.title.indexOf(title) !== -1);
            dispatch({
                type: 'REC_FILTER',
                payload: filterRecipes
            });
        }
	}
}
export default recipeActions
