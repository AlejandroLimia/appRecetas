const initialState = {
	urlPic: "", //? NOMBRE PENDIENTE DE CONFIRMAR
	token: "",
	username: "",
	likes: "",
	comments: null,
}

function authReducer(state = initialState, action) {
	switch (action.type) {
		case "USER_IN":
			localStorage.setItem("token", action.payload.token)
			return {
				...state,
				...action.payload,
			}
		case "LOGOUT_USER":
			localStorage.removeItem("token")
			return {
				...initialState,
			}
		case "GET_COM":
			console.log(action.payload)
			return {
				...state,
				comments: action.payload,
			}

		default:
			return state
	}
}

export default authReducer
