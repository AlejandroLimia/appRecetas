import userReducer from "./userReducer";
const { combineReducers } = require("redux");
import recipeReducer from "./recipeReducer";


const rootReducer = combineReducers({
	userReducer,
	recipeReducer,

})

export default rootReducer;