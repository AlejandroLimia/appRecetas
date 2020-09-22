import React, { useState } from 'react';
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions';
import '../styles/login.css';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


const Login = (props) => {

	const [user, setUser] = useState({
			mail: '',
			pass: ''
	})
	const [send, setSend] = useState({
		status: false
	})

	const inputHandler = (e) => {
		const valor = e.target.value;
		const campo = e.target.name;
		setUser({
				...user,
				[campo]: valor
		})
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		send.status = true
		setSend({status: true})
		if(user.pass === '' || user.mail === '') {
			toast.error('Por favor, completa todos los campos')
			send.status = false
			setSend({status: false})
		}
		else {
			await props.loginUser(user)
			send.status = false
			setSend({status: false})
		}
	}

	const responseGoogle = async response => {
		let userG = {
            pass: '1Qa'+response.profileObj.googleId,
            mail:response.profileObj.email
		}
		await props.loginUser(userG)
    }

	return (<>
		<div className="sign">
				<div className="form">
					<div className="logo" style={{backgroundImage: `url(${require('../images/icono.png')})`}}/>
					<form className="sign">
						<span className="title">INGRESAR</span>
						<div className="inputBox">
							<label htmlFor="mail"><i className="fas fa-envelope"></i></label>
							<input className="inputForm" type="text" name="mail" id="mail" placeholder="Email" onChange={inputHandler} value={user.mail}/>
						</div>
						<div className="inputBox">
							<label htmlFor="pass"><i className="fas fa-lock"></i></label>
							<input className="inputForm" type="password" name="pass" id="pass" onChange={inputHandler} value={user.pass} placeholder="Contraseña" />
						</div>
						<button onClick={submitHandler} disabled={send.status ? true : false}>{!send.status ? 'Ingresar' : <i className="fas fa-spinner fa-pulse"></i>}</button>
					</form>
					<div className="googleButton">
					<GoogleLogin
					clientId="966528695098-gero4ime5uu402rk59matmpn0g29j0nk.apps.googleusercontent.com"
					buttonText="Login con Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
					/>
					</div>
					<p><NavLink to="/">Volver al Home</NavLink></p>
				</div>
			</div>
	</>)

}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}

const mapDispatchToProps = {
	loginUser: userActions.loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);