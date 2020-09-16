import React, { useState } from 'react';
import "../styles/createRecipe.css"

const CreateRecipe = (props) => {
	const [recipe, setRecipe] = useState({
		title: '',
		allergies: [],
		ingredients: []
	})
	const constantes = {
		allergies: ['gluten', 'peanut', 'seaFood', 'egg', 'milk', 'sesame','soy' ],
		diet: ['keto', 'vegetariana','vegana','pecetariana','paleo','otros'],
		dif: [['Fácil','facil'],['Intermedio', 'intermedio'],['Difícil', 'dificil']]
	}
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
			<div className="createRecipe">
				<span className="title">Crear Receta</span>
				<form class="createRecipe">
					<div class="inputBox">
						<label for="">Imagen</label>
						<input type="file" name="urlPic" id="" />
					</div>
					<div class="inputBox">
						<label for="">Titulo</label>
						<input type="text" name="" id="" />
					</div>
					<div class="inputBox">
						<label for="">Descripcion</label>
						<input type="text" name="" id="" />
					</div>
					<div class="inputBox">
						<label>Dieta</label>
						<div>
							<select name="" id="">
								{constantes.diet.map(diet => {
									return <option value={diet}>{diet}</option>
								})}
							</select>
						</div>
					</div>
					<div class="inputBox">
						<label>Dificultad</label>
						<div>
							<select name="" id=""></select>
						</div>
					</div>
					<div class="inputBox">
						<label>Duracion</label>
						<input type="text" />
					</div>
					<div class="inputBox">
						<label>Dificultad</label>
						<div>
							<select name="" id=""></select>
						</div>
					</div>
					<div class="inputBox">
						<label>Ingredientes</label>
						<div class="ingredient">
							<input type="text" />
							<select name="" id="" ></select>
							<input type="text" />
						</div>
					</div>
					<div class="inputBox">
						<label>Receta</label>
						<div class="recipe">
							<input type="text" />
							<select name="" id=""></select>
							<input type="text" />
						</div>
					</div>
			<div class="inputBox">
				<label for="">Alergias</label>
				<div class="allergies">
					<label for=""></label>
					<input type="checkbox" name="" id="" />
				</div>
			</div>
		</form>
	</div>
	</> );
}
 
export default CreateRecipe;