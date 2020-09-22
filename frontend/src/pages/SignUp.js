import React, { useState } from 'react';
import '../styles/signup.css';
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const SignUp = (props) => {
	const [user, setUser] = useState({
			username: '',
			mail: '',
			pass: ''
	})
	const [error, setError] = useState({
		username: '',
		mail: '',
		pass: '',
		ok: false
	})
	const [send, setSend] = useState({
		status: false
	})
	
	const validation = user => {
		error.ok = true
		//RegEx
		const uname = RegExp(/^[a-zA-Z0-9._]+$/)
		const reMail = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
		const rePass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/)
		// username
		if(user.username === '') {
			error.username = 'No puede estar vacío'
			error.ok = false
		}
		else if(user.username.length < 3) {
			error.username = 'Debe tener tres letras mínimo'
			error.ok = false
		}
		else if(!uname.test(user.username)) {
			error.username = 'Solo puede contener letras, números, _ y .'
			error.ok = false
		}
		else error.username = ''
		// mail
		if(user.mail === '') {
			error.mail = 'No puede estar vacío'
			error.ok = false
		}
		else if(user.mail.length < 6) {
			error.mail = 'Debe tener seis letras mínimo'
			error.ok = false
		}
		else if(!reMail.test(user.mail)) {
			error.mail = 'Debe ser un mail válido example@server.com'
			error.ok = false
		}
		else error.mail = ''
		// pass
		if(user.pass === '') {
			error.pass = 'No puede estar vacío'
			error.ok = false
		}
		else if(user.pass.length < 5) {
			error.pass = 'Debe tener cinco letras mínimo'
			error.ok = false
		}
		else if(!rePass.test(user.pass)) {
			error.pass = 'Debe tener al menos una mayúscula, una minúscula y un numero'
			error.ok = false
		}
		else error.pass = ''
		//return
		return error.ok
	}

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
		if(validation(user)) {
			await props.createUser(user, setSend)
			setError({
				...error,
				ok: true
			})
		}
		else {
			send.status = false
			setSend({status: false})
			setError({
				...error,
				ok: false
			})
			toast.error(`Oops! Mira los campos`,{autoClose: 2000})
		}
	}
	
	const responseGoogle = async response => {
		let userG = {
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            pass: '1Qa'+response.profileObj.googleId,
            username:response.profileObj.email.substr(0,response.profileObj.email.indexOf('@')),
            mail:response.profileObj.email,
            urlPic:response.profileObj.imageUrl
		}
        await props.createUser(userG, setSend)
    }

	return (<>
		<div className="sign">
		<div className="form">
			<div className="logo" style={{backgroundImage: `url(${require('../images/icono.png')})`}}/>
			<form className="sign">
				<div className="inputBox">
					<label htmlFor="username"><i className="fas fa-id-card"></i></label>
					<input type="text" name="username" id="username" placeholder="Usuario" onChange={inputHandler} value={user.username}/>
				</div>
				<span className='error' style={!error.username ? {display: "none"} : {display: "inherit"} }>{error.username ? error.username : null }</span>
				<div className="inputBox">
					<label htmlFor="mail"><i className="fas fa-envelope"></i></label>
					<input type="text" name="mail" id="mail" placeholder="Email" onChange={inputHandler} value={user.mail}/>
				</div>
				<span className='error' style={!error.mail ? {display: "none"} : {display: "inherit"} }>{error.mail ? error.mail : null }</span>
				<div className="inputBox">
					<label htmlFor="pass"><i className="fas fa-lock"></i></label>
					<input type="password" name="pass" id="pass" onChange={inputHandler} value={user.pass} placeholder="Password" />
				</div>
				<span className='error' style={!error.pass ? {display: "none"} : {display: "inherit"} }>{error.pass ? error.pass : null }</span>
					<button onClick={submitHandler} disabled={send.status ? true : false}>{!send.status ? 'Crear cuenta' : <i className="fas fa-spinner fa-pulse"></i>}</button>
			</form>
			<GoogleLogin
				clientId="966528695098-gero4ime5uu402rk59matmpn0g29j0nk.apps.googleusercontent.com"
				buttonText="Crear cuenta con Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
			<p><NavLink to="/">Volver al Home</NavLink></p>
			<p><NavLink to="logIn">¡Tengo una cuenta!</NavLink></p>
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
	createUser: userActions.createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
