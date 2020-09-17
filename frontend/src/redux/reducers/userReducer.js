const initialState = {
	urlPic: '', //? NOMBRE PENDIENTE DE CONFIRMAR
	token: '',
	username: '',
    likes: '',
    userInfo: null
}

function authReducer(state = initialState, action) {
	switch (action.type) {
		case 'USER_IN':
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload
			};
		case 'LOGOUT_USER':
			localStorage.removeItem('token')
			return {
				...initialState
        };
        case 'GET_USER_INFO':
            return{
                ...state,
                userInfo: action.payload
            };
        case 'USER_EDIT':
            return{
                ...state,
                urlPic: action.payload.urlPic,
                username: action.payload.username
                };
		default:
			return state;
	}
}

export default authReducer;
