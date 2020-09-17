import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css'
import Recipe from '../components/Recipe';
import {NavLink} from "react-router-dom"
import recipeActions from '../redux/actions/recipeActions';




const Profile = (props) => {

    useEffect(() => {
    props.getRecipes('vegetariana')
    props.likedRecipes(props.data._id)
    }, [])
    

    const [showRecipe2, setshowRecipe2] = useState({
        show2: true
    })
  

   const changeView2 = e =>{
    e.preventDefault()
    setshowRecipe2 ({
     ...showRecipe2,
     show2: true
 })
   }

   const changeView3 = e =>{
    e.preventDefault()
    setshowRecipe2 ({
     ...showRecipe2,
     show2: false
 })
   }

  return (
      <>
      	<Header/>
          <div id="divBlanco"></div>
        <div id="AllProfile">
            <div id="pictureInfoandDecription">
                <div id="PictureAndInfoUser">
                    <div id="userPicture" style={{backgroundImage: `Url(https://i.pinimg.com/originals/f9/05/73/f905738457b395c55a006374a374c01d.jpg)`, width:"25vh", height:"25vh"}}></div>
                    <div id="infoUser">
                        <div id="NameAndEdit">
                        <p>Nombre de Usuario</p>
                        <NavLink to="/editProfile"><button>Editar Perfil</button></NavLink>
                        </div>
                    <div id="description"> <p>Mi especialidad son los platos veganos, cuento con un titulo... Esta es mi gran pasion y me gusta ayudar a que mas personas puedan incorporar mas platos vegetarianos a su dieta</p>
                    </div>
                    </div>

                </div>
                <div id="description600"><p>Mi especialidad son los platos veganos, cuento con un titulo... Esta es mi gran pasion y me gusta ayudar a que mas personas puedan incorporar mas platos vegetarianos a su dieta</p></div>
            </div>


            <div id="selectProfile">
                <button onClick={changeView2} style={showRecipe2.show2 ? { borderBottom: "1px solid black"} : {borderBottom: "none"}}>Mis Recetas</button>
                <button onClick={changeView3} style={!showRecipe2.show2 ? { borderBottom: "1px solid black"} : {borderBottom: "none"}}>Guardadas</button>
            </div>

          {showRecipe2.show2
          
          ? <div id="myRecipes">{
            props.data.recipes.length > 0 && props.data.recipes.map(recipe => {
            return <Recipe recipe={recipe}  own={true}/> })}
            </div>

      
          :  <div id="myRecipes">{
            props.data.recipes.length > 0 && props.data.recipes.map(recipe => {
            return <Recipe recipe={recipe} /> })}
            </div>
          }

        </div>
        <Footer/>
      </>
   
  )
}

const mapStateToProps = (state) => {
	return {
        user: state.userReducer,
        data: state.recipeReducer

	}
}


    const mapDispatchToProps = {
        likedRecipes: recipeActions.profileLikes ,
        getRecipes: recipeActions.getRecipes
        // Accion de filtar
    }


export default connect(mapStateToProps, mapDispatchToProps) (Profile)

