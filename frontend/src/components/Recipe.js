import React from 'react';
import '../styles/recipe.css'

const Recipe = (props) => {
	return ( <>
		<div class="recipeCard">
			<div class="picture">
				<div class="avatar">
				</div>
				<div class="likes">
					<i class="fas fa-heart"></i>
					20
				</div>
			</div>
			<div class="text">
				<span class="title">
					Corn & Chickpea Bowl
				</span>
				<span class="body">
					A quick sear gives corn kernels caramelized edges and concentrated flavor. Here, they're cooked with crisp chickpeas, ...
				</span>
			</div>
		</div>
	</> );
}
 
export default Recipe;