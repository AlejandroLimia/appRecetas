const initialState = {
	urlPic: '',
	token: '',
	username: '',
    likes: [],
    userInfo: null,
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
            }
        case 'LIKES':
            return{
                ...state,
                likes: action.payload
            }
		case "GET_COM":
			return {
				...state,
				comments: action.payload,
			}
		case "GET_LIKES":
			return{
				...state, userLikes:action.payload
			}
		default:
			return state
	}
}

export default authReducer;
