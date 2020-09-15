const initialState = {
    recipes:[],
    recipe: [],
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_RECIPES":
            return {...state, recipes: action.payload}
        default: 
            return state
    }
}
export default recipesReducer