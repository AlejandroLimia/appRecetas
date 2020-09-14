import React, {useState} from 'react';
import Header from "../components/Header"
import {connect} from 'react-redux'
import "../styles/Home.css"
import homeTitle from "../images/homeTitle.png"
import DietBubble from "../components/DietBubble"
import homeBackgroundOne from "../images/homeBackgroundOne.png"
import homeBackgroundTwo from "../images/homeBackgroundTwo.png"

const Home = (props) => {
  
  const [categories,setCategories] = useState({
    categories:["DIETAKETO", "VEGETARIANA", "VEGANA","PECETARIANA", "PALEO", "INCLUYETODO" ]})
    
  
    return (
        <div>
       <div id="space" style={{ height:"15vh"}}></div>
          <img id="homeBackgroundOne" src={homeBackgroundOne}/>
          <img id="homeBackgroundTwo" src={homeBackgroundTwo}/>
            <div id="homeTitle" >
              <img src={homeTitle}  ></img>
            </div>
            <div id="AllCategories">
              {categories.categories.map(conjunto => {
                  return (
                  <div id="categorie" key={conjunto} >
                      <DietBubble bubble={conjunto}/>
                  </div>
                  )
              })}
            </div>
          </div>
    )
}

const mapStateToProps = state => {
  return{

  }
}

export default connect(mapStateToProps) (Home)