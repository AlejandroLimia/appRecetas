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
<<<<<<< HEAD
	<Header />
=======
	<Header/>
>>>>>>> 0526c6d00fa6c611916857edd03ae2ce21213083
    <div id="space" style={{ height:"15vh"}}></div>
    <div id="banner" style={{backgroundImage: `url(${imageBanner})`}}>
            <div id="ProfilePic" style={{backgroundImage: `Url(https://i.pinimg.com/originals/f9/05/73/f905738457b395c55a006374a374c01d.jpg)`, width:"25vh", height:"25vh"}}>
				<p>PALTA FELIZ</p>
			</div>
	</div>
	<div id="everything">
		<div id="LeftSide">
			<div  id="imageFood" style={{backgroundImage: `url(${imageFood})`}} > </div>
			    <div id="ingredients">
					<h3 className="title">ingredientes</h3>
					<h6>cant.</h6>
				<div className="ingredient">
					<p className="TheIngredient">este es el ingrediente que utilice</p>
					<p className="TheAmount">cantidad</p>
				</div>
				<div className="ingredient">
					<p className="TheIngredient">este es el ingrediente que utilice</p>
					<p className="TheAmount">cantidad</p>
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
				<h2>REVUELTO DE BROCOLI CON HUEVO Y PALTA</h2>
				<p>descripcion de este plato tan rico para comer en familia completa</p>
			</div>
			<div id="steps">
				<h3 className="title">pasos a seguir</h3>
				<div className="divRecipeSteps">
					<h4>1</h4>
					<p className="RecipeSteps" > Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut ut laoreet dolore magna aliquam erat volutpat. Ut ut laoreet</p>
				</div>
				<div className="divRecipeSteps">
					<h4>2</h4>
					<p className="RecipeSteps" > Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut ut laoreet dolore magna aliquam erat volutpat. Ut ut laoreet</p>
				</div>
				<button id="viewMoreSteps">ver mas</button>
			</div>
			<div id="theComments">
				<div id="userComment">
					<p id="userPic">foto</p>
					<div id="theComment">
					   <h5>usuario</h5>
					   <p>hola te amo</p>
					</div>
				</div>
				<div id="TheInput">
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