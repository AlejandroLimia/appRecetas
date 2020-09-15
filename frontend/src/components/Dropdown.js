import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';



const Dropdown1 = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const fotousuario = require("../images/user.png")



  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
       <DropdownToggle caret style= {{backgroundColor: `white`, border: `0px solid white`}}>        
       {/* {!props.tokenLogueado
        ? <img id="fotousuario" src={fotousuario} alt="fotousuario"/>
        :<div id="imagenTinerary" className="fotoHeader" style={{ backgroundImage: `url(${props.imagenLogueado})`, width:"6vw", height:"6vw"}}></div>
        }  */}
        <img id="fotousuario" src={fotousuario} alt="fotousuario"/>
     </DropdownToggle>



      {/*  {!props.tokenLogueado
        ? (<>
         <DropdownMenu>
            <NavLink to="/logIn"><DropdownItem>Login</DropdownItem></NavLink>
            <NavLink to="/register"><DropdownItem>Register</DropdownItem></NavLink>
         </DropdownMenu>
        </>)
        :(<>
         <DropdownMenu>
        <NavLink to="/logIn"><DropdownItem>{props.usuarioLogueado}</DropdownItem></NavLink>
            <NavLink to="/"><DropdownItem onClick={props.desloguearUsuario}>Logout</DropdownItem></NavLink>
         </DropdownMenu>
        </>)
        }       */}
         <DropdownMenu>
         <DropdownItem><NavLink to="/login">Login</NavLink></DropdownItem>
         <DropdownItem><NavLink to="/signup">Register</NavLink></DropdownItem>
         </DropdownMenu>

    </Dropdown>
  );
}

const mapDispatchToProps = {

}

const mapStateToProps = state => {
  return{
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dropdown1)

