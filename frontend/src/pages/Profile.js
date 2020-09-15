import React, { useState } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css'
import ProfileRecipes from '../components/ProfileRecipes';




const Profile = (props) => {

    const [showRecipe, setshowRecipe] = useState({
        show: true
    })
 
   const changeView =  e =>{
       e.preventDefault()
       setshowRecipe ({
        ...showRecipe,
        show: !showRecipe.show
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
                        <button>Editar Perfil</button>
                        </div>
                    <div id="description"> <p>Mi especialidad son los platos veganos, cuento con un titulo... Esta es mi gran pasion y me gusta ayudar a que mas personas puedan incorporar mas platos vegetarianos a su dieta</p>
                    </div>
                    </div>

                </div>
                <div id="description600"><p>Mi especialidad son los platos veganos, cuento con un titulo... Esta es mi gran pasion y me gusta ayudar a que mas personas puedan incorporar mas platos vegetarianos a su dieta</p></div>
            </div>


            <div id="selectProfile">
                <button onClick={changeView} style={showRecipe.show ? { borderBottom: "1px solid black"} : {borderBottom: "none"}}>Mis Recetas</button>
                <button onClick={changeView} style={!showRecipe.show ? { borderBottom: "1px solid black"} : {borderBottom: "none"}}>Guardadas</button>
            </div>
          {showRecipe.show 
          ?  <ProfileRecipes/> 
          :  <ProfileRecipes/>
          }
        </div>
        <Footer/>
      </>
   
  )
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile)

