import React, {useState, useEffect} from 'react';
//import recipeActions from '../redux/actions/recipeActions';
//import {connect} from 'react-redux'
import imageBanner from "../images/foodit.jpg"
import "../styles/recipeFull.css"
import Header from "../components/Header"

const RecipeFull = (props) => {
	//useEffect(() => {
	//	props.getRecipe(props.match.params)
	//}, [])
	const fotousuario = require("../images/usuario.png")
	const imageFood = require("../images/VEGETARIANA.jpg")
	const [alergies,setAlergies] = useState({
		alergies:["milk", "gluten", "egg","peanut", "seaFood", "sesame", "soy" ]})

   

	return ( 
    <>
    <div id="space" style={{ height:"15vh"}}></div>
    <div id="banner" style={{backgroundImage: `url(${imageBanner})`}}>
            <div id="ProfilePic" style={{backgroundImage: `Url(https://i.pinimg.com/originals/f9/05/73/f905738457b395c55a006374a374c01d.jpg)`, width:"20vh", height:"20vh"}}>
				<p>PALTA FELIZ</p>
			</div>
	</div>
	<div id="everything">
		<div id="LeftSide">
			<div  id="imageFood" style={{backgroundImage: `url(${imageFood})`}} > </div>
			    <div id="ingredients">
					<h3 className="title">ingredientes</h3>
					<h6>cant.</h6>
				<div id="ingredient">
					<h4>1</h4>
					<p id="TheIngredient">este es el ingrediente que utilice</p>
					<p id="TheAmount">cantidad</p>
				</div>
			</div>
		</div>
		<div id="RightSide">
			<div id="icons">
			{alergies.alergies.map(allAlergies => {
				return (
					  <div id="allAlergies" key={allAlergies}>
						  <img src={require(`../images/${allAlergies}.png`)} id="allergie" />
					  </div>
				)
			})}
			</div>
			<div id="titleDescription">
				<h2>soy el title</h2>
				<p>soy la description</p>
			</div>
			<div id="Steps">
				<h3 className="title">pasos a seguir</h3>
				<div >
					<h4>1</h4>
					<p>soy el texto</p>
				</div>
				<button>ver mas</button>
			</div>
			<div>
				<div>aqui van los comments</div>
				<div>
				<input  className="allInput" type="text"  value="" name="comment" placeholder="Escribi tu comentario"></input>
				<button>send</button>
				</div>
			</div>


		</div>
	</div>
			

    

	{/*{props.RecipeFull.title}
	{props.RecipeFull.description} 
	{props.RecipeFull.ingredients.map(ingredient => {
		return <p><span>{ingredient.quantity}</span> {ingredient.name}</p>
	})} 
	<img src={`${props.RecipeFull.urlPic}`} alt="foto receta" />
	<img src={`${props.RecipeFull.userPic}`} alt="foto usuario" />
	<p>{props.RecipeFull.userId}</p> 
	<p>Likes: {props.RecipeFull.likes}</p>
	{props.RecipeFull.importantContains.map(warning => {
		return <p>{warning}</p>
	})} 
	{props.RecipeFull.recipe.map((step, index) => {
		return <><p>Paso {index+1}</p><>{step}</></>
	})} 
	<p>{props.RecipeFull.difficulty}</p>
	<p>Dietas: {props.RecipeFull.diet}</p>
<p>{props.RecipeFull.duration}</p>*/}
	</> )
}
 
{/*const mapStateToProps = (state) => {
	return {
		recipeFull: state.recipeReducer
	}
}

const mapDispatchToProps = {
	getRecipe: recipeActions.getRecipe
}*/}

export default RecipeFull;