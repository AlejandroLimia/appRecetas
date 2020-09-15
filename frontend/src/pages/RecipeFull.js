import React from 'react';
import recipeActions from '../redux/actions/recipeActions';

const RecipeFull = (props) => {
	useEffect(() => {
		props.getRecipeFull(props.match.params)
	}, [])

	return ( <>
	{props.RecipeFull.title}
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
	<p>{props.RecipeFull.duration}</p>
	</> );
}
 
const mapStateToProps = (state) => {
	return {
		recipeFull: state.recipeReducer
	}
}

const mapDispatchToProps = {
	getRecipeFull: recipeActions.getRecipeFull
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFull);