const initialState = {
    recipes:[],
    recipe: [],
    userRecipes:[],
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_RECIPES":
            return {...state, recipes: action.payload}
        case "USER_RECIPES":
            return {...state, userRecipes: action.payload}
        default: 
            return state
    }
}
export default recipesReducer