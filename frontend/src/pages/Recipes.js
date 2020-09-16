import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/recipes.css'
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import homeBackgroundOne from "../images/homeBackgroundOne.png"
import homeBackgroundTwo from "../images/homeBackgroundTwo.png"

const Recipes = (props) => {
	return ( <>
	<Header />
		<img id="homeBackgroundOne" src={homeBackgroundOne}/>
        <img id="homeBackgroundTwo" src={homeBackgroundTwo}/>
		<div className="banner" style={{backgroundImage: `url(${require('../images/food.jpg')})`}}>
		</div>
		<div className="contenedorRecipes">
			<div>
				<h1>Vegetariana</h1>
				<p>Una dieta vegetariana se enfoca a la alimentación con verduras. Esto incluye frutas, verduras, guisantes y alubias secas, granos, semillas y nueces. No existe un único tipo de dieta vegetariana. Los modelos de alimentación vegetariana suelen entrar en uno de los siguientes grupos: vegetariana estricta, lacto vegetariana, lacto-ovo vegetariana.</p>
			</div>
			<div className="filtrador">
				<input type="text" placeholder="Buscas una receta?"/>
			</div>
			<div className="recetas">
				<Recipe />
				<Recipe />
				<Recipe />
				<Recipe />
				<Recipe />
			</div>
		</div>


	<Footer />
	</> );
}

const mapStateToProps = (state) => {
	return {
		recipes: state.recipeReducer
	}
}

const mapDispatchToProps = {
	// Accion de filtar
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);