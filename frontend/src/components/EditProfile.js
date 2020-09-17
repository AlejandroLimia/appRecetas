import React, { useState } from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css'
import Recipe from '../components/Recipe';




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

