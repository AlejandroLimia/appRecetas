import React, { useState, useEffect } from 'react';
import '../styles/signup.css';
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const SignUp = (props) => {
	const [user, setUser] = useState({
			firstName: '',
			lastName: '',
			urlPic: '',
			username: '',
			mail: '',
			pass: ''
	})
	const [error, setError] = useState({
		firstName: '',
		lastName: '',
		urlPic: '',
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
		const alphanum = RegExp(/^\w+$/)
		const reMail = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
		const rePass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/)
		//firstName
		if(user.firstName === '') {
			error.firstName = 'No puede estar vacío'
			error.ok = false
		}
		else if(user.firstName.length < 3) {
			error.firstName = 'Debe tener tres letras mínimo'
			error.ok = false
		}
		else if(!alphanum.test(user.firstName)) {
			error.firstName = 'Solo puede contener letras'
			error.ok = false
		}
		else error.firstName = ''
		// lastName
		if(user.lastName === '') {
			error.lastName = 'No puede estar vacío'
				error.ok = false
		}
		else if(user.lastName.length < 3) {
			error.lastName = 'Debe tener tres letras mínimo'
			error.ok = false
		}
		else if(!alphanum.test(user.lastName)) {
			error.lastName = 'Solo puede contener letras'
			error.ok = false
		}
		else error.lastName = ''
		// urlPic
		if(user.urlPic === '') {
			error.urlPic = 'No puede estar vacío'
			error.ok = false
		}
		else if(user.urlPic.length < 10) {
			error.urlPic = 'Debe tener diez letras mínimo'
			error.ok = false
		}
		else if(user.urlPic.toLowerCase().indexOf('http://') !== 0 && user.urlPic.toLowerCase().indexOf('https://') !== 0) {
			error.urlPic = 'Debe ser una URL válida'
			error.ok = false
		}
		else error.urlPic = ''
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
			await props.createUser(user)
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
			toast.error(`Oops! Check out the fields`,{autoClose: 2000})
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
        await props.createUser(userG)
    }

	return (<>
		<div className="sign">
		<div className="form">
			<form className="sign">
				<div className="inputBox">
					<label htmlFor="firstName"><i className="fas fa-user"></i></label>
					<input type="text" name="firstName" id="firstName" placeholder="Nombre" onChange={inputHandler} value={user.firstName}/>
				</div>
				<span className='error' style={!error.firstName ? {display: "none"} : {display: "inherit"} }>{error.firstName ? error.firstName : null }</span>
				<div className="inputBox">
					<label htmlFor="lastName"><i className="far fa-user"></i></label>
					<input type="text" name="lastName" id="lastName" placeholder="Apellido" onChange={inputHandler} value={user.lastName}/>
				</div>
				<span className='error' style={!error.lastName ? {display: "none"} : {display: "inherit"} }>{error.lastName ? error.lastName : null }</span>
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
					<label htmlFor="urlPic"><i className="fas fa-image"></i></label>
					<input type="text" name="urlPic" id="urlPic" placeholder="URL Foto de perfil" onChange={inputHandler} value={user.urlPic}/>
				</div>
				<span className='error' style={!error.urlPic ? {display: "none"} : {display: "inherit"} }>{error.urlPic ? error.urlPic : null }</span>
				<div className="inputBox">
					<label htmlFor="pass"><i className="fas fa-lock"></i></label>
					<input type="password" name="pass" id="pass" onChange={inputHandler} value={user.pass} placeholder="Password" />
				</div>
				<span className='error' style={!error.pass ? {display: "none"} : {display: "inherit"} }>{error.pass ? error.pass : null }</span>
					<button onClick={submitHandler} disabled={send.status ? true : false}>{!send.status ? 'Crear cuenta' : <i className="fas fa-spinner fa-pulse"></i>}</button>
			</form>
			<GoogleLogin
				clientId="966528695098-3ndge8hti2067veeniuubta4l64f08do.apps.googleusercontent.com"
				buttonText="Crear cuenta con Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
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
	createUser: userActions.createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);