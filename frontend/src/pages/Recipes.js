import React, { useState ,useEffect } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/recipes.css'
import { connect } from 'react-redux';
import Recipe from '../components/Recipe';
import homeBackgroundOne from "../images/homeBackgroundOne.png"
import homeBackgroundTwo from "../images/homeBackgroundTwo.png"
import recipeActions from '../redux/actions/recipeActions';
import imageBanner from "../images/foodit.jpg";
import { TEXTOS } from '../constants';
import SinReceta from '../images/noRecipeAvocado.png'

const Recipes = (props) => {
    const [recipeBusca, setRecipeBusca] = useState('')
    const recipeFilter = (recipeB) => { 
        return (props.data.recipes.filter(recipe => recipe.title.toLowerCase().indexOf(recipeB.toLowerCase().trim()) !== -1))
    }

	useEffect(() => {
		props.getRecipes(props.match.params.diet)
	}, [props.match.params.diet])
	return ( <>
	<Header />
		<img id="homeBackgroundOne" src={homeBackgroundOne} alt={'images'}/>
        <img id="homeBackgroundTwo" src={homeBackgroundTwo} alt={'images'}/>
		<div id="space" style={{ height:"10vh"}}></div>
		<div className="banner" style={{backgroundImage: `url(${imageBanner})`}}>
		</div>
		<div className="contenedorRecipes">
			<div>
				{TEXTOS.map(texto => {
					if(texto.diet === props.match.params.diet) {
						return <>
								<h1>{texto.title}</h1>
								<p>{texto.text}</p>
								</>
					}
				})}
			</div>
			<div className="filtrador">
                <input type="text" placeholder="Buscas una receta?" onChange={(e) => setRecipeBusca(e.target.value)}/>
			</div>
			<div className="recetas">
				{recipeFilter(recipeBusca).length !== 0? (recipeFilter(recipeBusca).map(recipe => {
					return <Recipe key={recipe._id} recipe={recipe} />
                    })): <img src={SinReceta}/>}
			</div>
		</div>
		<div id="centerIt">
        <button onClick={() => props.history.goBack()} id="goBackButton">Volver</button>
		</div>

	<Footer />
	</> );
}

const mapStateToProps = (state) => {
	return {
		data: state.recipeReducer
	}
}

const mapDispatchToProps = {
	getRecipes: recipeActions.getRecipes
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);


