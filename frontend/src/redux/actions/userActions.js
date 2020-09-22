import axios from "axios"
import { RUTA_API } from "../../constants"
import { toast } from "react-toastify"

const authActions = {
	createUser: (user, set = null ) => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API+'/api/user/register', user)
            if(response.data.success === "false") {
                set({status: false})
                let errors = response.data.error.errors;
				if(errors.username !== undefined) toast.error(errors.username.message);
				if(errors.mail !== undefined ) toast.error(errors.mail.message);
				return;
			}
			else {
				toast.success(`Cuenta creada!`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						urlPic: response.data.urlPic,
						username: response.data.username,
						likes: response.data.likes,
					},
				})
			}
			return response
		}
	},
	loginUser: user => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API + "/api/user/login", user)
			if (!response.data.success) {
				toast.error(response.data.error)
				return response.data.error
			} else {
				toast.success(`Bienvenidx ${response.data.username}!`)
				dispatch({
					type: "USER_IN",
					payload: {
						token: response.data.token,
						urlPic: response.data.urlPic,
						username: response.data.username,
						likes: response.data.likes,
					},
				})
			}
		}
	},
	logoutUser: () => {
		return (dispatch, getState) => {
			toast.info("See you later! =D")
			dispatch({
				type: "LOGOUT_USER",
			})
		}
    },
    userInformation: (id) => {
        return async (dispatch, getState) => {
			const response = await axios.get(`${RUTA_API}/api/user/n/${id}`)
            dispatch({
                type: 'GET_USER_INFO',
                payload: response.data.userInfo
            })
        }
    },
	authUser: (token) => {
		return async (dispatch, getState) => {
			let response
			try {
				response = await axios.get(RUTA_API + "/api/user/login", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
			} catch {
				return false
			}
			const {urlPic, username, likes} = response.data
			dispatch({
				type: "USER_IN",
				payload: {
					urlPic,
					token,
					username,
					likes,
				},
			})
		}
	},
	modifyUser:	user => {
		return async (dispatch, getState) => {
			const response = await axios.put(RUTA_API + "/api/user/modifyUser", user, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': "Bearer " + getState().userReducer.token,
				}
			})
			if(response.data.success) {
				toast.success('Cambios guardados!')
			}
			else {
				toast.error('Ha habido un problema')
			}

		}
    },
    addLike:(user) => {
        return async (dispatch, getState) => { 
            const response = await axios.put(`${RUTA_API}/api/user/addLike`,user)
            dispatch({
                type:'LIKES',
                payload:response.data.likes
            })
        }
    },
    delateLike:(user) => {
        return async (dispatch, getState) => { 
            const response = await axios.put(`${RUTA_API}/api/user/delateLike`,user)
            dispatch({
                type:'LIKES',
                payload:response.data.likes
            })
        }
    },
	newComment: comment => {
		return async (dispatch, getState) => {
			const response = await axios.post(
				RUTA_API+ "/api/comment/",
				comment
			)
		}
	},
	getComments: recipeId => {
		return async (dispatch, getState) => {
			const response = await axios.get(
				`${RUTA_API}/api/comment/${recipeId}`
			)
			dispatch({
				type: "GET_COM",
				payload: response.data.comments,
			})
		}
	},
	deleteComment: commentId => {
		return async (dispatch, getState) => {
			const response = await axios.delete(`${RUTA_API}/api/comment/${commentId}`)
		}
	},
	editComment: edited => {
		return async (dispatch, getState) => {
			const response = await axios.put(
				RUTA_API + "/api/comment",
				edited
			)
			if (response.data.success === true) {
				toast.success("Comentario editado")
			} else {
				toast.error("Ocurrió un error")
			}
		}
	},
	profileLikes: (likes) =>{
		return async (dispatch, getState) => {
			const response = await axios.post(
				RUTA_API + "/api/recipes/likes", likes
			)
			if (response.data.success === false) {
				toast.error("Ocurrió un error")
			}
			dispatch({
				type:'GET_LIKES',
				payload: response.data.recipeLikes
			})
		}
	}
}

export default authActions
