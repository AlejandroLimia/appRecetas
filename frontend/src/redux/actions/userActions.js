import axios from 'axios'
import { RUTA_API } from '../../constants'
import { toast } from 'react-toastify'

const authActions = {
	createUser: (user, set) => {
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
					type: 'USER_IN',
					payload: {
						token: response.data.token,
						urlPic: response.data.urlPic,
						username: response.data.username,
						likes: response.data.likes
					}
				})
			}
			return response
		}
	},
	loginUser: user => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API+'/api/user/login', user)
			console.log(response.data)
			if(!response.data.success) {
				toast.error(response.data.error)
				return response.data.error
			}
			else {
				toast.success(`Bienvenidx ${response.data.username}!`)
				dispatch({
					type: 'USER_IN',
					payload: {
						token: response.data.token,
						urlPic: response.data.urlPic,
						username: response.data.username,
						likes: response.data.likes
					}
				})
			}
		}
	},
	logoutUser: () => {
		return (dispatch, getState) => {
			toast.info('See you later! =D')
			dispatch({
				type: 'LOGOUT_USER'
			})
		}
	},
	authUser: (token) => {
		return async (dispatch, getState) => {
			let response;
			try {
				response = await axios.get(RUTA_API+'/api/user/login', {
					headers: {
						Authorization: 'Bearer ' + token
					}
				})
			}
			catch {
				return false
			}
			
			const {urlPic, username, likes} = response.data
			dispatch({
				type: 'USER_IN',
				payload: {
					urlPic,
					token,
					username,
					likes
				}
			})
		}
	}
}

export default authActions;
