import React, {useState} from 'react';
import {connect} from 'react-redux'
import "../styles/Home.css"

const DietBubble = (props) => {
  
    return(
      <div className="oneBubble">
          <div className="imageBubble" style={{backgroundImage: `url(${require(`../images/${props.bubble}.jpg`)})`}}>
          <p>{props.bubble}</p>
          </div>
          
      </div>
   )
}



const mapStateToProps = state => {
  return{

  }
}






export default connect(mapStateToProps) (DietBubble)