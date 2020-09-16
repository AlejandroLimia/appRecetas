import React, {useState, useEffect} from 'react';
import recipeActions from '../redux/actions/recipeActions';
import {connect} from 'react-redux'
import imageBanner from "../images/foodit.jpg"
import "../styles/recipeFull.css"
import Header from "../components/Header"

const RecipeFull = (props) => {
	console.log(props.recipe)
	useEffect(() => {
		const gR = async () => {
			await props.getRecipe(props.match.params.id)
		}
		window.scroll(0,0)
		gR()
	}, [])
	const fotousuario = require("../images/usuario.png")
	const imageFood = require("../images/VEGETARIANA.jpg")

   
	
	return ( 
		<>
		{props.recipe === null 
		? ""
		:<>
	<Header/>
    <div id="space" style={{ height:"10vh"}}></div>
    <div id="banner" style={{backgroundImage: `url(${imageBanner})`}}>
            <div id="ProfilePic" style={{backgroundImage: `url(${props.recipe.userPic})`, width:"25vh", height:"25vh"}}>
				<p>{props.recipe.username.toUpperCase()}</p>
			</div>
	</div>
	<div id="everything">
		<div id="LeftSide">
			<div  id="imageFood" style={{backgroundImage: `url(${props.recipe.urlPic})`}} > </div>
			    <div id="ingredients">
					<h3 className="title">Ingredientes</h3>
					<h6>cant.</h6>
				{props.recipe.ingredients.map(ingredient =>{
					return <div className="ingredient">
						<p className="TheIngredient">{ingredient.name}</p>
						<p className="TheAmount">{ingredient.quantity || ""}</p>
					</div>
				})}
			</div>
		</div>
		<div id="RightSide">
			<div id="icons">
			{props.recipe.importantContain.map(allAlergies => {
				return <div id="allAlergies" key={allAlergies}>
						  <img src={require(`../images/${allAlergies}.png`)} id="allergie" />
					  </div>
			})}
			</div>
			<div id="titleDescription">
				<h2>{props.recipe.title}</h2>
				<p>{props.recipe.description}</p>
			</div>
			<div id="steps">
				<h3 className="title">Pasos a seguir</h3>
				{props.recipe.recipe.map((step,index) => {
					return <div className="divRecipeSteps">
					<h4>{index + 1}</h4>
					<p className="RecipeSteps" >{step}</p>
				</div>
				})}
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
				<button>Enviar</button>
				</div>
			</div>
		</div>
	</div> </>}
	</> )
}
 
const mapStateToProps = (state) => {
	return {
		recipe: state.recipeReducer.recipe
	}
}

const mapDispatchToProps = {
	getRecipe: recipeActions.getRecipe
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFull);
/*
	 
	{props.recipe.ingredients.map(ingredient => {
		return <p><span>{ingredient.quantity}</span> {ingredient.name}</p>
	})} 
	<p>{props.recipe.userId}</p> 
	<p>Likes: {props.recipe.likes}</p>
	{props.recipe.importantContains.map(warning => {
		return <p>{warning}</p>
	})} 
	{props.recipe.recipe.map((step, index) => {
		return <><p>Paso {index+1}</p><>{step}</></>
	})} 
	<p>{props.recipe.difficulty}</p>
	<p>Dietas: {props.recipe.diet}</p>
<p>{props.recipe.duration}</p>*/