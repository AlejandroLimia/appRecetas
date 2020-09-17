import React, { useState, useEffect } from "react"
import recipeActions from "../redux/actions/recipeActions"
import userActions from "../redux/actions/userActions"
import { connect } from "react-redux"
import imageBanner from "../images/foodit.jpg"
import "../styles/recipeFull.css"
import Header from "../components/Header"
import usuario from "../images/usuario.png"
import { toast } from "react-toastify"
import Comment from "../components/Comment"

const RecipeFull = props => {
	const[update, setUpdate]=useState(false)
	useEffect(() => {
		const gR = async () => {
			await props.getRecipe(props.match.params.id)
			await props.getComments(props.match.params.id)
		}
		gR()
		setUpdate(false)
	}, [update])
	const fotousuario = require("../images/usuario.png")
	const imageFood = require("../images/VEGETARIANA.jpg")
	const [comment, setComment] = useState(null)

	const readComment = e => {
		const text = e.target.value
		setComment({
			...comment,
			[e.target.name]: text,
			username: props.username,
			recipeId: props.recipe._id,
			userPic: props.urlPic,
		})
	}
	const sendComment = async e => {
		e.preventDefault()
		setUpdate(true)
		if (props.token) {
			props.newComment(comment)
			toast.success("Su comentario fue publicado.")
		} else {
			toast.error("Es necesaria una cuenta para publicar un comentario")
		}
	}

	return (
		<>
			{props.recipe === null ? (
				""
			) : (
				<>
					<Header />
					<div id="space" style={{ height: "10vh" }}></div>
					<div id="banner" style={{ backgroundImage: `url(${imageBanner})` }}>
						<div
							id="ProfilePic"
							style={{
								backgroundImage: `url(${props.recipe.userPic})`,
								width: "25vh",
								height: "25vh",
							}}
						>
							<p>{props.recipe.username.toUpperCase()}</p>
						</div>
					</div>
					<div id="everything">
						<div id="LeftSide">
							<div
								id="imageFood"
								style={{ backgroundImage: `url(${props.recipe.urlPic})` }}
							>
								{" "}
							</div>
							<div id="ingredients">
								<h3 className="title">Ingredientes</h3>
								<h6>cant.</h6>
								{props.recipe.ingredients.map(ingredient => {
									return (
										<div className="ingredient">
											<p className="TheIngredient">{ingredient.name}</p>
											<p className="TheAmount">{ingredient.quantity || ""}</p>
										</div>
									)
								})}
							</div>
						</div>
						<div id="RightSide">
							<div id="icons">
								{props.recipe.importantContain.map(allAlergies => {
									return (
										<div id="allAlergies" key={allAlergies}>
											<img
												src={require(`../images/${allAlergies}.png`)}
												id="allergie"
											/>
										</div>
									)
								})}
							</div>
							<div id="titleDescription">
								<h2>{props.recipe.title}</h2>
								<p>{props.recipe.description}</p>
							</div>
							<div id="steps">
								<h3 className="title">Pasos a seguir</h3>
								{props.recipe.recipe.map((step, index) => {
									return (
										<div className="divRecipeSteps">
											<h4>{index + 1}</h4>
											<p className="RecipeSteps">{step}</p>
										</div>
									)
								})}
								<button id="viewMoreSteps">ver mas</button>
							</div>
							<div id="theComments">
								<div>
									{props.comments === null
										? "cargando..."
										: props.comments.map((comentario, index) => {
												return <Comment key={index} fx={setUpdate} data={comentario} />
										  })}
								</div>
								<div id="TheInput">
									<div
										className="picturebox"
										style={{
											backgroundImage: `url(${
												props.token ? props.urlPic : usuario
											})`,
											width: "4.5em",
											height: "4.5em",
											backgroundSize: "cover",
											alignItems: "center",
											display: "flex",
											margin: "0 2%",
										}}
									/>
									<textarea
										playholder="write your comment here..."
										onChange={readComment}
										name="comment"
										style={{
											width: "60%",
											border: "2px black solid",
											padding: "1.5%",
											borderRadius: "2em",
											backgroundColor: "white",
											resize: "none",
											outline: "none",
											overflow: "hidden",
											marginRight: "2%",
										}}
									/>
									<div style={{ marginBotton: "4%", display: "table" }}>
										<button
											style={{ alignSelf: "center!important", padding: "3%" }}
											onClick={sendComment}
										>
											send
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>{" "}
				</>
			)}
		</>
	)
}

const mapStateToProps = state => {
	return {
		recipe: state.recipeReducer.recipe,
		token: state.userReducer.token,
		urlPic: state.userReducer.profilePic,
		username: state.userReducer.username,
		comments: state.userReducer.comments,
	}
}

const mapDispatchToProps = {
	getRecipe: recipeActions.getRecipe,
	newComment: userActions.newComment,
	getComments: userActions.getComments,
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFull)
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
