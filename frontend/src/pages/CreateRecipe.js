import React, { useState } from 'react';
import "../styles/createRecipe.css"
import axios from 'axios'
import Header from "../components/Header"

const CreateRecipe = (props) => {
	const [recipe, setRecipe] = useState({
		title: '',
		description: '',
		diet: '',
		duration: '',
		difficulty: '', 
		allergies: []
	})
	const constantes = {
		allergies: ['gluten', 'peanut', 'seaFood', 'egg', 'milk', 'sesame','soy' ],
		diet: ['keto', 'vegetariana','vegana','pecetariana','paleo','otros'],
		dif: [['Fácil','facil'],['Intermedio', 'intermedio'],['Difícil', 'dificil']],
		medidas: ['un','gr','kg','ml','l']
	}
	const [mod, setMod] = useState(true)

	const [unit, setUnit] = useState([
		'un','un','un','un','un'
	])
	const [steps, setSteps] = useState([
		'','','','',''
	])
	const [ing, setIng] = useState([
		{q: '' , name: ''},
		{q: '' , name: ''},
		{q: '' , name: ''},
		{q: '' , name: ''},
		{q: '' , name: ''},
		])
	
	const submitHandler = async e => {
		const recetaFull = {
			title: recipe.title,
			description: recipe.description,
			ingredients: ing.filter(i => i.q !== ''),
			recipe: steps.filter(i => i !== ''),
			importantContains: recipe.allergies,
			diet: recipe.diet,
			difficulty: recipe.difficulty,
			duration: parseInt(recipe.duration)
		}
		const formData = new FormData()
		formData.append('pic', recipe.urlPic)
		const resp = await axios.post(`http://127.0.0.1:4000/api/subirFoto`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		//console.log(recetaFull)
	}

	const inputHandler = (e) => {
		const valor = e.target.name === 'urlPic' ? e.target.files[0] : e.target.value;
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

	const stepHandler = e => {
		const valor = e.target.value;
		const index = e.target.id;
		steps[index] = valor;
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

	return ( <>
		<Header />
			<div className="createRecipe">
				<span className="title">Crear Receta</span>
				<form class="createRecipe">
					<div class="inputBox">
						<label for="">Imagen</label>
						<input type="file" name="urlPic" onChange={inputHandler} />
					</div>
					<div class="inputBox">
						<label for="">Titulo</label>
						<input type="text" name="title" onChange={inputHandler} />
					</div>
					<div class="inputBox">
						<label for="">Descripcion</label>
						<input type="text" name="description" onChange={inputHandler} />
					</div>
					<div class="inputBox">
						<label>Dieta</label>
						<div>
							<select name="diet" onChange={inputHandler}>
								{constantes.diet.map(diet => {
									return <option value={diet}>{diet}</option>
								})}
							</select>
						</div>
					</div>
					<div class="inputBox">
						<label>Duracion</label>
						<input type="number" placeholder="minutos" name='duration' onChange={inputHandler} />
					</div>
					<div class="inputBox">
						<label>Dificultad</label>
						<div>
							<select name="difficulty" onChange={inputHandler}>
								{constantes.dif.map(item => {
									return <option value={item[1]}>{item[0]}</option>
								})}
							</select>
						</div>
					</div>
					<div class="inputBox">
						<label>Ingredientes</label>
						<div className="ingredient">
							{ing.map((ingrediente, index) => {
								return <div>
								<input type="number" className="ingredientN" id={index} onChange={ingQHandler} />
								<select name="" id={index} onChange={ingUHandler}>
									{constantes.medidas.map(medida => {
										return <option value={medida}>{medida}</option>
									})}
								</select>
								<input type="text" placeholder="Ingrediente" onChange={ingNameHandler} id={index}/>
								</div>
							})}
						</div>
					</div>
					<div class="inputBox">
						<label>Receta</label>
						<div class="recipe">
						{steps.map((step, index) => {
								return <div>
								<span>{index + 1}</span>
								<textarea placeholder={`Paso ${index + 1}`} onChange={stepHandler} id={index}/>
								</div>
							})}
						</div>
					</div>
			<div class="inputBox">
				<label for="">Alergias</label>
				<div class="allergies">
					{constantes.allergies.map((item,index) => {
						return <>
							<label for={item}><img src={recipe.allergies.includes(item) ? require(`../images/${item}ON.png`) : require(`../images/${item}.png`)} id="allergie" /></label>
							<input type="checkbox" value={item} id={item} onChange={allergyHandler} />
						</>
					})}
				</div>
			</div>
		</form>
		<button style={{width: '200px', height: "80px"}} onClick={submitHandler} />
	</div>
	</> );
}
 
export default CreateRecipe;