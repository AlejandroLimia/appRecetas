const initialState = {
    recipes:[],
    recipe: null,
    userRecipes:[],
    filterRecipes :[]
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_RECIPES":
            return {...state, recipes: action.payload}
        case "GET_RECIPE":
            return {...state, recipe: action.payload}
        case "USER_RECIPES":
            return {...state, userRecipes: action.payload}
        case "REC_FILTER":
            return {...state, filterRecipes: action.payload}
        default: 
            return state
    }
}
export default recipesReducer
