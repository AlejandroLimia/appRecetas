import React, {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom"
import {connect} from 'react-redux'
import '../styles/HeaderFooter.css'
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';


const Header = (props) => {
    const fotologo = require("../images/logo.png")
    const fotoBoton = require("../images/menuHamburguesa.png")
    const cerrar = require('../images/cerrar.png')
    const [menuShow, setmenuShow] = useState({
        show: false
    })

    const [categories,setCategories] = useState({
        categories:["keto", "vegetariana", "vegana","pecetariana", "paleo", "otros"]})
        
      

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
                <div id="fotologo" ><NavLink to="/Home"><img src={fotologo} alt="logo"/></NavLink></div> 
              <button onClick={menuHamburguesa} style={{backgroundColor: `white`, border: `none`}}>
                  <div id="menuHamburguesa" style={{backgroundImage: `url(${fotoBoton})`}}></div>
              </button>
            
        </header>
 
         <div id="menuCostado" style={menuShow.show ? {right:0} : {}}>
            <button onClick={menuHamburguesa} style={{backgroundColor: 'white', border:'none'}} ><img src={cerrar} style={{width:'2em', marginTop:'2vh'}}/></button>
            <p id="tituloDietas"> Elegi tu dieta:</p>
           
            <div id="nombreDietas">

            {categories.categories.map(nombreDieta => {
            return <><Link to={`/recipes/${nombreDieta}`} ><p >{nombreDieta.toUpperCase()}</p></Link></>
            })}

            </div>

            <NavLink className="home" to="/Home">Home</NavLink>
            { props.user.token && <NavLink className="home" to="/createRecipe">Crear Receta</NavLink> }

         </div>

     </>
    )
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}

export default connect(mapStateToProps) (Header)