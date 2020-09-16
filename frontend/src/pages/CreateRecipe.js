import React, { useState } from 'react';

const CreateRecipe = (props) => {
	const [recipe, setRecipe] = useState({
		title: '',
		allergies: [],
		ingredients: []
	})

	const [mod, setMod] = useState(true)

	const [unit, setUnit] = useState([
		'un','un','un','un','un'
	])
	
	const [ing, setIng] = useState([
		{q: '' , name: ''},
		{q: '' , name: ''},
		{q: '' , name: ''},
		{q: '' , name: ''},
		{q: '' , name: ''},
		])

	const inputHandler = (e) => {
		const valor = e.target.value;
		const campo = e.target.name;
		setRecipe({
				...recipe,
				[campo]: valor
		})
	}

	const allergyHandler = (e) => {
		if(e.target.checked){
			recipe.allergies.push(e.target.value);
		}
		else {
			recipe.allergies = recipe.allergies.filter(item => item != e.target.value)
		}
		setMod(!mod)
	}

	const ingQHandler = e => {
		const index = e.target.id;
		const valor = e.target.value + ' ' + unit[index];
		ing[index].q = valor;
		setMod(!mod)
	}

	const ingUHandler = e => {
		const valor = e.target.value;
		const index = e.target.id;
		unit[index] = valor;
		setMod(!mod)
	}

	const ingNameHandler = e => {
		const valor = e.target.value;
		const index = e.target.id;
		ing[index].name = valor;
		setMod(!mod)
	}

	console.log(recipe)

	return ( <>
			<form>
				<input type='text' onChange={inputHandler} name="title" placeholder="Titulo" />
				<input type='text' onChange={inputHandler} name="description" placeholder="Descripcion" />
				<input type='text' onChange={inputHandler} name="duration" placeholder="Duracion" />
				<input type='text' onChange={ingNameHandler} placeholder="ingrediente" name="ingredient" id="0" />
				<input type='text' onChange={ingQHandler} placeholder="cantidad" name="quantity" id="0" />
				<select name='unit' id="0" onChange={ingUHandler}>
					<option defaultValue value="un">un</option>
					<option value="g">g</option>
					<option value="kg">kg</option>
					<option value="cda">cda</option>
				</select>
				<input type='text' onChange={ingNameHandler} placeholder="ingrediente" name="ingredient" id="1" />
				<input type='text' onChange={ingQHandler} placeholder="cantidad" name="quantity" id="1" />
				<select name='unit' id="1" onChange={ingUHandler}>
					<option defaultValue>un/s</option>
					<option>g</option>
					<option>kg</option>
					<option>cda/s</option>
				</select>
				<input type='checkbox' name="allergies" value="algo1" />
				<input type='checkbox' name="allergies" value="algo2" />
				<input type='checkbox' name="allergies" value="algo3" />
			</form>
	</> );
}
 
export default CreateRecipe;