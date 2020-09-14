import axios from 'axios'
import { RUTA_API } from '../../constants'
//import { toast } from 'react-toastify'

const authActions = {
	createUser: user => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API+'/api/user/register', user)
			if(!response.data.success) {
				// if(response.data.error.indexOf('Mail') !== -1) toast.error('Mail alredy in use')
				// if(response.data.error.indexOf('Username') !== -1) toast.error('Username alredy in use')
				// if(response.data.error.indexOf('error') !== -1) toast.error('Something goes wrong! Please refresh, try again')
				return response.data.error
			}
			else {
				//toast.success(`Account created!`)
				dispatch({
					type: 'USER_IN',
					payload: {
						token: response.data.response.token,
						urlPic: response.data.response.urlPic,
						username: response.data.response.username,
						likes: response.data.response.likes
					}
				})
			}
			return response
		}
	},
	loginUser: user => {
		return async (dispatch, getState) => {
			const response = await axios.post(RUTA_API+'/api/user/login', user)
			if(!response.data.success) {
				//toast.error(response.data.error)
				return response.data.error
			}
			else {
				//toast.success(`Welcome ${response.data.response.username}!`)
				dispatch({
					type: 'USER_IN',
					payload: {
						token: response.data.response.token,
						urlPic: response.data.response.urlPic,
						username: response.data.response.username,
						likes: response.data.response.likes
					}
				})
			}
		}
	},
	logoutUser: () => {
		return (dispatch, getState) => {
			//toast.info('See you later! =D')
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