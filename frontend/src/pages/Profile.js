import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css'
import Recipe from '../components/Recipe';
import {NavLink} from "react-router-dom";
import recipeActions from '../redux/actions/recipeActions';
import userActions from '../redux/actions/userActions';





const Profile = (props) => {
  console.log(props.data)
  const [likedRecipes,setLikedRecipes]= useState({likes : props.likes, })
  console.log(likedRecipes)
  useEffect(() => {
   const call= async()=>{
    await props.getRecipes('vegetariana')
    await props.profileLikes(likedRecipes)
    await props.userRecipes(props.username)
   }
   call()
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
                {props.user.urlPic === "false"
                ?<div id="userPicture" className="fotoHeader" id="usuariosinfoto" style={{width:"25vh", height:"25vh", backgroundColor:"none", border: "2px solid #abc120", borderRadius:"100%", marginTop:"4vh",marginLeft:"4vh", display:"flex", justifyContent:"center", alignItems:"center" }}><p style={{color:"#abc120", fontWeight: "bold", marginBottom: "unset", fontSize:"150%"}}>{props.user.username.substr(0,1).toUpperCase()}</p></div>
                :  <div id="userPicture" style={{backgroundImage: `Url(${props.user.urlPic})`, width:"25vh", height:"25vh"}}></div>
                }
                    <div id="infoUser">
                        <div id="NameAndEdit">
                        <p>{props.user.username}</p>
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
            props.userRecipes.length > 0 && props.userRecipes.map(recipe => {
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
        username: state.userReducer.username,
        data: state.recipeReducer,
        userLikes: state.userReducer.userLikes,
        likes: state.userReducer.likes,
        userRecipes: state.userReducer.userRecipes
	}
}


const mapDispatchToProps = {
	userRecipes: recipeActions.userRecipes,
	profileLikes: userActions.profileLikes,
	userInformation: userActions.userInformation,
	getRecipes: recipeActions.getRecipes
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)

