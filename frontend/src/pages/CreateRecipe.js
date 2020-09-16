import React, { useState } from 'react';

const CreateRecipe = (props) => {
	const [recipe, setRecipe] = useState({
		title: '',
		ingredients: []
	})
	
	const [ing, setIng] = useState({q: 1 , ings: []})

	const inputHandler = (e) => {
		const valor = e.target.value;
		const campo = e.target.name;
		setRecipe({
				...recipe,
				[campo]: valor
		})
	}

	const ingredientHandler = e => {

	}

	const ingredientAdd = e => {
		setIng({
			...ing,
			q: ing.q + 1
		})
	}
	const ingredientSub = e => {
		setIng({
			...ing,
			q: ing.q - 1
		})
	}

	console.log(recipe)
	console.log(ing)

	return ( <>
			<form>
				<input type='text' onChange={inputHandler} name="title" />
			</form>
	</> );
}
 
export default CreateRecipe;