import React from 'react';
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux'
import '../styles/HeaderFooter.css'
import Dropdown from './Dropdown';
import Menuhamburguesa from './MenuHamburguesa';

const Header = (props) => {
    const fotologo = require("../images/logo.png")
    return (
        <header>
            <div id="barraArriba" style={{display:`flex`, alignItems: `center`}}>
              <div id="usuarioymenu"><Dropdown/></div>
              <img id="fotologo" src={fotologo} alt="logo" style={{ marginLeft: `2vw`,}}/>
              <div id="menuHamburguesa" style={{marginLeft: `4vw`, marginTop: `2vh`}}><Menuhamburguesa/></div>
              <div id="menuNormal">
              <NavLink to="/home">Home</NavLink>
               {/* <NavLink to="/ciudades">Ciudades</NavLink> */}  
              </div>
            </div>
        </header>
    )
}

const mapStateToProps = state => {
  return{

  }
}

export default connect(mapStateToProps) (Header)