import React, {useState} from 'react';
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

export default DietBubble;