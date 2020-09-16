import React, {useState} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import "../styles/Home.css"

const DietBubble = (props) => {
  
    return(
      <div className="oneBubble">
		  <Link to={`/recipes/${props.bubble}`}>
          <div className="imageBubble" style={{backgroundImage: `url(${require(`../images/${props.bubble.toUpperCase()}.jpg`)})`}}>
          <p>{props.bubble.toUpperCase()}</p>
          </div>
          </Link>
      </div>
   )
}



const mapStateToProps = state => {
  return{

  }
}






export default connect(mapStateToProps) (DietBubble)