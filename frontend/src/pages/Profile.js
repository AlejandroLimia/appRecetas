import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css'
import Recipe from '../components/Recipe';
import {NavLink} from "react-router-dom";
import recipeActions from '../redux/actions/recipeActions';
import userActions from '../redux/actions/userActions';
import { RUTA_API } from '../constants';
import PALTA from '../images/noRecipeAvocado.png'

const Profile = (props) => {
  useEffect(() => {
   const call= async()=>{
	  await props.userInformation(props.match.params.username)
    await props.getUserRecipes(props.match.params.username)
   }
   call()
    }, [])
  const recipesview = ()=>{
      if(props.userRecipes !== 0){
       return (<div className="recetas"><img src={PALTA}></img></div>)
      }else{
         return ( <div id="myRecipes">{props.userRecipes.lenght}{
          props.userRecipes.length > 0 && props.userRecipes.map(recipe => {
          return <Recipe recipe={recipe}  own={true}/> })}
          </div>)
      }
    }
    

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

   const changeView3 = async e =>{
	e.preventDefault()
	await props.profileLikes(props.userInfo.likes)
    setshowRecipe2 ({
     ...showRecipe2,
     show2: false
 })
   }

if(props.userInfo === null){
	return <>Loading</>
}
else {
  return (
      <>
      	<Header/>
          <div id="divBlanco"></div>
        <div id="AllProfile">
            <div id="pictureInfoandDecription">
                <div id="PictureAndInfoUser">
                {props.userInfo.urlPic === "false"
                ?<div id="userPicture" className="fotoHeader" id="usuariosinfoto" style={{width:"25vh", height:"25vh", backgroundColor:"none", border: "2px solid #abc120", borderRadius:"100%", marginTop:"4vh",marginLeft:"4vh", display:"flex", justifyContent:"center", alignItems:"center" }}><p style={{color:"#abc120", fontWeight: "bold", marginBottom: "unset", fontSize:"150%"}}>{props.userInfo.username.substr(0,1).toUpperCase()}</p></div>
                :  <div id="userPicture" style={{backgroundImage: `url(${props.userInfo.urlPic === "true" ? `${RUTA_API}/${props.userInfo.username}.jpg` : props.userInfo.urlPic})`, width:"25vh", height:"25vh"}}></div>
                }
                    <div id="infoUser">
                        <div id="NameAndEdit">
                        <p>{props.userInfo.username}</p>
                        {props.userInfo.username === props.username &&<NavLink to="/editProfile"><button>Editar Perfil</button></NavLink>}
                        </div>
						<div id="nombreApellido"> <p>{props.userInfo.firstName || ''} {props.userInfo.lastName || ''}</p>
						</div>
						<div id="description"> <p>{props.userInfo.description || ''}</p>
						</div>
                    </div>

                </div>
                <div id="description600"><p>{props.userInfo.description || ''}</p></div>
            </div>


            <div id="selectProfile">
                <button onClick={changeView2} style={showRecipe2.show2 ? { borderBottom: "1px solid black"} : {borderBottom: "none"}}>Mis Recetas</button>
                <button onClick={changeView3} style={!showRecipe2.show2 ? { borderBottom: "1px solid black"} : {borderBottom: "none"}}>Guardadas</button>
            </div>

          {showRecipe2.show2
          
          ? <div id="myRecipes">{
            props.userRecipes.length !== 0? props.userRecipes.map(recipe => {
              return <Recipe recipe={recipe}  own={true}/> }) : <img src={PALTA}/>}
            </div>

      
          :  <div id="myRecipes">{
            props.userLikes.length !== 0? props.userLikes.map(recipe => {
            return <Recipe recipe={recipe} /> }): <img src={PALTA}/>}
            </div>
          }
        </div>
        <div id="centerIt">
        <button onClick={() => props.history.goBack()} id="goBackButton">Volver</button>
		    </div>
        <Footer/>
      </>
   
  )}
}

const mapStateToProps = (state) => {
	return {
        username: state.userReducer.username,
        data: state.recipeReducer,
        userLikes: state.userReducer.userLikes,
        likes: state.userReducer.likes,
		userRecipes: state.recipeReducer.userRecipes,
		userInfo: state.userReducer.userInfo,
		test: state.userReducer
	}
}


const mapDispatchToProps = {
	getUserRecipes: recipeActions.userRecipes,
	profileLikes: userActions.profileLikes,
	userInformation: userActions.userInformation,
	getRecipes: recipeActions.getRecipes
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)

