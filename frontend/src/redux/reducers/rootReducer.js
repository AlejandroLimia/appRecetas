import userReducer from "./userReducer";
import recipeReducer from "./recipeReducer";
const { combineReducers } = require("redux");
const rootReducer = combineReducers({
	userReducer,
	recipeReducer,
})

export default rootReducer;
