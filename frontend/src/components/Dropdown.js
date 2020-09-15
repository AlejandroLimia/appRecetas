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
       {/* {!props.tokenLogueado
        ? <img id="fotousuario" src={fotousuario} alt="fotousuario"/>
        :<div id="imagenTinerary" className="fotoHeader" style={{ backgroundImage: `url(${props.imagenLogueado})`, width:"6vw", height:"6vw"}}></div>
        }  */}
        <img id="fotousuario" src={fotousuario} alt="fotousuario"/>
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

