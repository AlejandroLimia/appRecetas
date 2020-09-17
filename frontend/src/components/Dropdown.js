import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import userActions from '../redux/actions/userActions';



const Dropdown1 = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const fotousuario = require("../images/usuario.png")



  return ( 
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
       <DropdownToggle caret style= {{backgroundColor: `white`, border: `0px solid white`}}>        
       { !props.user.token
        ? <img id="fotousuario" src={fotousuario} alt="fotousuario"/>
        :  props.user.urlPic === "false"
           ? <div id="imagenTinerary" className="fotoHeader" id="usuariosinfoto" style={{width:"8vw", height:"8vw", backgroundColor:"none", border: "2px solid #abc120", borderRadius:"100%", marginBottom:"-3vh", display:"flex", justifyContent:"center", alignItems:"center" }}><p style={{color:"#abc120", fontWeight: "bold", marginBottom: "unset", fontSize:"150%"}}>{props.user.username.substr(0,1).toUpperCase()}</p></div>
           :<div id="imagenTineraryusuarioLogueado" className="fotoHeader" style={{ backgroundImage: `url(${props.user.urlPic})`, width:"8vw", height:"8vw"}}></div> 
           
       }
     </DropdownToggle>



    {!props.user.token
        ? (<>
         <DropdownMenu>
            <NavLink to="/logIn"><DropdownItem>Login</DropdownItem></NavLink>
            <NavLink to="/signup"><DropdownItem>Register</DropdownItem></NavLink>
         </DropdownMenu>
        </>)
        :(<>
         <DropdownMenu>
		<NavLink to="/profile"><DropdownItem>{props.user.username}</DropdownItem></NavLink>
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

