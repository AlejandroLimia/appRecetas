import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import userActions from '../redux/actions/userActions';
import { RUTA_API } from '../constants';

const Dropdown1 = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const fotousuario = require("../images/usuario.png")

  return ( 
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      { !props.user.token
        ? <DropdownToggle id="dropdownToggle" style={{ backgroundImage: `url(${fotousuario})`, width:"8vw", height:"8vw"}}></DropdownToggle>
        :  props.user.urlPic === "false"
           ? <DropdownToggle id="imagenTinerarysinfoto" className="fotoHeader" id="usuariosinfoto" style={{width:"75px", height:"75px", backgroundColor:"white", border: "2px solid #abc120", borderRadius:"100%", marginTop:"4vh",marginLeft:"4vh", display:"flex", justifyContent:"center", alignItems:"center" }}><p style={{color:"#abc120", fontWeight: "bold", marginBottom: "unset", fontSize:"150%"}}>{props.user.username.substr(0,1).toUpperCase()}</p></DropdownToggle>
           :<DropdownToggle id="imagenTineraryusuarioLogueado" className="fotoHeader" style={{ backgroundImage: `url(${props.user.urlPic === "true" ? `${RUTA_API}/${props.user.username}.jpg` : props.user.urlPic})`, width:"8vw", height:"8vw"}}></DropdownToggle>
           
       }



    {!props.user.token
        ? (<>
         <DropdownMenu>
            <NavLink to="/logIn"><DropdownItem>Login</DropdownItem></NavLink>
            <NavLink to="/signup"><DropdownItem>Register</DropdownItem></NavLink>
         </DropdownMenu>
        </>)
        :(<>
         <DropdownMenu>
		<NavLink to={`/profile/${props.user.username}`}><DropdownItem>{props.user.username}</DropdownItem></NavLink>
            <NavLink to="/"><DropdownItem onClick={props.logoutUser}>Logout</DropdownItem></NavLink>
         </DropdownMenu>
        </>)
        }

    </Dropdown>
  );
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}

const mapDispatchToProps = {
	logoutUser: userActions.logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps) (Dropdown1)

