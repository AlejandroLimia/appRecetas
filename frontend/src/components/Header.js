import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux'
import '../styles/HeaderFooter.css'
import Dropdown from './Dropdown';

const Header = (props) => {
    const fotologo = require("../images/logo.png")
    const fotoBoton = require("../images/menuHamburguesa.png")
    const cerrar = require('../images/cerrar.png')
    const [menuShow, setmenuShow] = useState({
        show: false
    })

    const menuHamburguesa = e =>{
        e.preventDefault()
        setmenuShow ({
            ...menuShow,
            show: !menuShow.show
        })       
    }

    return (
        <>
        <header>
              <div id="usuarioymenu"><Dropdown/></div>
              <img id="fotologo" src={fotologo} alt="logo"/>
              <button onClick={menuHamburguesa} style={{backgroundColor: `white`, border: `none`}}>
                  <div id="menuHamburguesa" style={{backgroundImage: `url(${fotoBoton})`}}></div>
              </button>
            
        </header>

         <div id="menuCostado" style={menuShow.show ? {right:0} : {}}>
            <button onClick={menuHamburguesa} style={{backgroundColor: 'white', border:'none'}} ><img src={cerrar} style={{width:'2em', marginTop:'2vh'}}></img></button>
            <p id="tituloDietas"> Elegi tu dieta:</p>
            <div id="nombreDietas">
                <p>DIETA KETO</p>
                <p>VEGETARIANA</p>
                <p>VEGANA</p>
                <p>PECETARIANA</p>
                <p>PALEO</p>
                <p>OTROS</p>
            </div>
            <NavLink id="home" to="/Home">Home</NavLink>
         </div>

     </>
    )
}

const mapStateToProps = state => {
  return{

  }
}

export default connect(mapStateToProps) (Header)