import axios from 'axios';
import { RUTA_API } from '../../constants';
import { toast } from 'react-toastify';

const recipeActions = {
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
