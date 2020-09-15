import React from 'react';
import '../styles/recipe.css'

const Recipe = (props) => {
	return ( <>
		<div class="recipeCard">
			<div class="picture">
				<div class="avatar">
				</div>
			</div>
			<div class="text">
				<h3 class="title">Comida rica</h3>
				<div class="data">
					<div class="time">
						<span><i class="far fa-clock"> </i> <span class="number">40</span></span>
						<span>minutos</span>
					</div>
					<div class="likes">
						<span><i class="far fa-heart"> </i> <span class="number">10</span></span>
						<span>likes</span>
					</div>
				</div>
				<div class="descripcion">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident laboriosam dolor voluptatem!
				</div>
				<button class="btn">Ver receta</button>
			</div>
		</div>
	</> );
}
 
export default Recipe;