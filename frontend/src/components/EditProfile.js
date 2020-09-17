import React, { useState } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css'
import { toast } from 'react-toastify';
import '../styles/editarUsuario.css'
import homeBackgroundOne from "../images/homeBackgroundOne.png"
import homeBackgroundTwo from "../images/homeBackgroundTwo.png"
import userActions from '../redux/actions/userActions';



const Profile = (props) => {
    const [user, setUser] = useState({
        firstName: 'Leo',
        lastName: 'DiCaprio',
        urlPic: '',
        username: 'LeoDi',
        descriptionEdit:'Mi especialidad son los platos veganos, cuento con un titulo... Esta es mi gran pasion y me gusta ayudar a que mas personas puedan incorporar mas platos vegetarianos a su dieta',
        mail: 'LeoDi@hotmail.com',
        newPass: '',
        confirmNewPass:'',
        pass:''
})
const [error, setError] = useState({
    firstName: '',
    lastName: '',
    urlPic: '',
    username: '',
    descriptionEdit:'',
    mail: '',
    newPass: '',
    confirmNewPass:'',
    pass: '',
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
    if(user.firstName.length !== "") {

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
    if(user.descriptionEdit.length !== "") {

        if(user.descriptionEdit.length < 3 ) {
            error.descriptionEdit = 'Debe tener tres letras mínimo'
            error.ok = false
        }
        else if(!alphanum.test(user.descriptionEdit)) {
            error.descriptionEdit = 'Solo puede contener letras'
            error.ok = false
        }
        else error.descriptionEdit = ''
    }

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

    //new pass
    if(user.newPass === '') {
        error.newPass = 'No puede estar vacío'
        error.ok = false
    }
    else if(user.newPass.length < 5) {
        error.newPass = 'Debe tener cinco letras mínimo'
        error.ok = false
    }
    else if(!rePass.test(user.newPass)) {
        error.newPass = 'Debe tener al menos una mayúscula, una minúscula y un numero'
        error.ok = false
    }
    else error.newPass = ''

     
    //confirm new pass
    if(user.confirmNewPass === '') {
        error.confirmNewPass = 'No puede estar vacío'
        error.ok = false
    }
    else if(user.confirmNewPass.length < 5) {
        error.confirmNewPass = 'Debe tener cinco letras mínimo'
        error.ok = false
    }
    else if(!rePass.test(user.confirmNewPass)) {
        error.confirmNewPass = 'Debe tener al menos una mayúscula, una minúscula y un numero'
        error.ok = false
    }
    else error.confirmNewPass = ''


    //return
    return error.ok
}
const [send, setSend] = useState({
    status: false
})

    const inputHandler = (e) => {
		const valor = e.target.name === 'picture' ? e.target.files[0] : e.target.value
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
			await props.modifyUser(user)
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
    
    console.log("editandoperfil")

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
                          <div id="userPicture" style={{backgroundImage: `Url(https://i.pinimg.com/originals/f9/05/73/f905738457b395c55a006374a374c01d.jpg)`, width:"25vh", height:"25vh"}}></div>
                          <div id="infoUser">
                             <div id="NameAndEdit">
                                 <p>Nombre de Usuario</p>
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
                                <div className="inputBox">
                                    <label htmlFor="username">Usuario: </label>
                                    <input type="text" name="username" id="username" onChange={inputHandler} value={user.username}/>
                                </div>
                                <span className='error' style={!error.username ? {display: "none"} : {display: "inherit"} }>{error.username ? error.username : null }</span>
                                
                                <div className="inputBox">
                                <label For="descriptionEdit">Descripción:</label>
                                    <textarea name="descriptionEdit" id="descriptionEdit" onChange={inputHandler} value={user.descriptionEdit}>
                                    </textarea>
                                </div>
                                <span className='error' style={!error.description ? {display: "none"} : {display: "inherit"} }>{error.description ? error.description : null }</span>
                               
                                <div className="inputBox">
                                  <label htmlFor="urlPic" id="cambiarfotodeperfil">Foto del Perfil:</label>
                                    <input type="file" name="urlPic" id="urlPic" className="botoneditarperfil"/>
                                </div>

                                    <button className="botoneditarperfil" onClick={viewChangePass} >Cambiar Contraseña</button>

                               {ChangePass.Pass && 
                               <div id="divCambiarContraseña">
                                   <div className="inputBox">
                                         <label htmlFor="newPass">Contraseña Nueva</label>
                                          <input type="password" name="newPass" id="newPass" onChange={inputHandler}  />
                                      </div>
                                      <span className='error' style={!error.password ? {display: "none"} : {display: "inherit"} }>{error.password ? error.password : null }</span>

                                      <div className="inputBox">
                                         <label htmlFor="confirmNewPass">Confirmar Contraseña </label>
                                          <input type="password" name="confirmNewPass" id="confirmNewPass" onChange={inputHandler}  />
                                      </div>
                                      <span className='error' style={!error.confirmNewPass ? {display: "none"} : {display: "inherit"} }>{error.confirmNewPass ? error.confirmNewPass : null }</span>

                              </div>
                               }
                                <div className="inputBox" >
                                      <label htmlFor="pass">Contraseña: </label>
                                      <input type="password" name="pass" id="pass" onChange={inputHandler}  />
                                    </div>
                                     <span className='error' style={!error.pass ? {display: "none"} : {display: "inherit"} }>{error.pass ? error.pass : null }</span>
                                     
                                
                                <button  id="editarUsuario" onClick={submitHandler} disabled={send.status ? true : false}>{!send.status ? 'Editar Cuenta' : <i className="fas fa-spinner fa-pulse"></i>}</button>
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
		user: state.userReducer
	}
}

const mapDispatchToProps = {
    modifyUser: userActions.modifyUser

}

export default connect(mapStateToProps, mapDispatchToProps) (Profile)

