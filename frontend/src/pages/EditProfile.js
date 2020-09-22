import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css'
import { toast } from 'react-toastify';
import '../styles/editarUsuario.css'
import homeBackgroundOne from "../images/homeBackgroundOne.png"
import homeBackgroundTwo from "../images/homeBackgroundTwo.png"
import userActions from '../redux/actions/userActions';
import {NavLink} from "react-router-dom"
import { RUTA_API } from '../constants';

const Profile = (props) => {
    const [user, setUser] = useState({
        firstName: props.userInfo.firstName || '',
        lastName: props.userInfo.lastName || '',
        urlPic: props.userInfo.urlPic || '',
        username: props.userInfo.username,
        descriptionEdit: props.userInfo.description || '',
        pass:''
})

const [mod, setMod] = useState(true)
	
const [error, setError] = useState({
    firstName: '',
    lastName: '',
    urlPic: '',
    username: '',
    descriptionEdit:'',
    mail: '',
    ok: false
})
const validation = user => {
    error.ok = true
    //RegEx
    const uname = RegExp(/^[a-zA-Z0-9._]+$/)
    const alphanum = RegExp(/^\w+$/)
    const reMail = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
    const rePass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/)
    //firstName
    if(user.firstName !== '') {

        if(user.firstName.length < 3 ) {
            error.firstName = 'Debe tener tres letras mínimo'
            error.ok = false
        }
        else if(!alphanum.test(user.firstName)) {
            error.firstName = 'Solo puede contener letras'
            error.ok = false
        }
        else error.firstName = ''
    }
    
    // lastName
    if(user.lastName !== '') {
        if(user.lastName.length < 3) {
            error.lastName = 'Debe tener tres letras mínimo'
            error.ok = false
        }
        else if(!alphanum.test(user.lastName)) {
            error.lastName = 'Solo puede contener letras'
            error.ok = false
        }
        else error.lastName = ''
        
    }
    
    // urlPic
   
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

    //Description
    if(user.descriptionEdit !== '') {

        if(user.descriptionEdit.length < 3 ) {
            error.descriptionEdit = 'Debe tener tres letras mínimo'
            error.ok = false
        }
        else error.descriptionEdit = ''
    }
    return error.ok
}
const [send, setSend] = useState({
    status: false
})

    const inputHandler = (e) => {
		const valor = e.target.name === 'urlPic' ? e.target.files[0] : e.target.value
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
			const formData = new FormData()
			formData.append('pic', user.urlPic)
			formData.append('firstName', user.firstName)
			formData.append('lastName', user.lastName)
			formData.append('username', user.username)
			formData.append('description', user.descriptionEdit)
			formData.append('mail', user.mail)
			
			await props.modifyUser(formData)
			props.history.goBack()
			setMod(!mod)
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

    const [ChangePass, setChangePass] = useState({
        Pass: false
    })
    
    const viewChangePass =  e =>{
        e.preventDefault()
        setChangePass ({
         ...ChangePass,
         Pass: !ChangePass.Pass
     })
    }
    
  return (
      <>
      	<Header/>
          <div id="divBlanco"></div>
          <img id="homeBackgroundOne" src={homeBackgroundOne}/>
          <img id="homeBackgroundTwo" src={homeBackgroundTwo}/>
          <h3 id="EditarPerfilTitulo">Editar Perfil:</h3>
          <div id="todoEditarUsuario">
                <div id="pictureInfoandDecription">
                     <div id="PictureAndInfoUser">
                     {props.user.urlPic === "false"
                        ?<div id="userPicture" id="sinfotologueado" className="fotoHeader" id="usuariosinfoto" style={{width:"25vh", height:"25vh",padding:"8vw 8vw", backgroundColor:"white", border: "2px solid #abc120", borderRadius:"100%", marginTop:"4vh",marginLeft:"4vh", display:"flex", justifyContent:"center", alignItems:"center" }}><p style={{color:"#abc120", fontWeight: "bold", marginBottom: "unset", fontSize:"150%"}}>{props.user.username.substr(0,1).toUpperCase()}</p></div>
                         :  <div id="userPicture" style={{backgroundImage: `url(${props.user.urlPic === "true" ? `${RUTA_API}/${props.user.username}.jpg` : props.user.urlPic})`, width:"25vh", height:"25vh"}}></div>
                      }
                          <div id="infoUser">
                            <div id="NameAndEdit">
                                 <p>{props.user.username}</p>
                            </div>
                            <form className="sign">
                                <div className="inputBox">
                                    <label htmlFor="firstName">Nombre: </label>
                                    <input type="text" name="firstName" id="firstName" onChange={inputHandler} value={user.firstName}/>
                                </div>
                                <span className='error' style={!error.firstName ? {display: "none"} : {display: "inherit"} }>{error.firstName ? error.firstName : null }</span>
                                <div className="inputBox">
                                    <label htmlFor="lastName">Apellido:</label>
                                    <input type="text" name="lastName" id="lastName" onChange={inputHandler} value={user.lastName}/>
                                </div>
                                <span className='error' style={!error.lastName ? {display: "none"} : {display: "inherit"} }>{error.lastName ? error.lastName : null }</span>
                                    <div className="inputBox">
                                    <label htmlFor="mail">Email:</label>
                                    <input type="text" name="mail" id="mail" onChange={inputHandler} value={user.mail}/>
                                </div>
                                <span className='error' style={!error.mail ? {display: "none"} : {display: "inherit"} }>{error.mail ? error.mail : null }</span>
                                <span className='error' style={!error.username ? {display: "none"} : {display: "inherit"} }>{error.username ? error.username : null }</span>
                                
                                <div className="inputBox">
                                <label For="descriptionEdit">Descripción:</label>
                                    <textarea name="descriptionEdit" id="descriptionEdit" onChange={inputHandler} value={user.descriptionEdit}>
                                    </textarea>
                                </div>
                                <span className='error' style={!error.description ? {display: "none"} : {display: "inherit"} }>{error.description ? error.description : null }</span>
                               
                                <div className="inputBox">
                                  <label htmlFor="urlPic" id="cambiarfotodeperfil">Foto del Perfil:</label>
                                    <input type="file" onChange={inputHandler} name="urlPic" id="urlPic" className="botoneditarperfil"/>
                                </div>                              
                                <div id="botones">
                                     <button  id="editarUsuario" onClick={submitHandler} disabled={send.status ? true : false}>{!send.status ? 'Editar Cuenta' : <i className="fas fa-spinner fa-pulse"></i>}</button>
                                     <NavLink to="" id="volver"> <button onClick={() => props.history.goBack()}  id="volver">Volver</button></NavLink>
                                </div>
                            </form>
                        </div>
                     </div>
               </div>
            </div>
        <Footer/>
      </>
  )
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer,
		userInfo: state.userReducer.userInfo,
	}
}

const mapDispatchToProps = {
    modifyUser: userActions.modifyUser,
    userInformation: userActions.userInformation,

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

