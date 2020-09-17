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
import homeBackgroundThree from "../images/backgroundThree.png"
import { RUTA_API } from "../constants"
import "../styles/comments.css"


const RecipeFull = props => {
    const[update, setUpdate]=useState(false)
    const autLikes = async () => {
        if(props.token === '') return;
        const pos = props.likes.indexOf(props.recipe._id);
        if(pos !== -1){
            --props.recipe.likes;
            await props.modifyRecipe({likes: props.recipe.likes,_id: props.recipe._id});
            props.likes.splice(pos);
            await props.modifyUser({likes: props.likes,username: props.username});
        }else{
            ++props.recipe.likes;
            await props.modifyRecipe({likes: props.recipe.likes, _id: props.recipe._id});
            props.likes.push(props.recipe._id);
            await props.modifyUser({likes: props.likes,username: props.username});
    }
        setUpdate(true)
    }

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
	const time = (minutes) => {
		return minutes > 59 ? `${(minutes/60).toFixed(0)}:${minutes%60 !== 0 ? minutes%60 < 10 ? '0'+minutes%60 : minutes%60 : "00"}` : minutes;
	}
	const [comment, setComment] = useState({
		comment: "",
		username: "",
		recipeId: "",
		userPic: "",
	})


	const readComment = e => {
		const text = e.target.value
		const comment = e.target.name
		setComment({
			...comment,
			[comment]: text,
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
			
			setComment({
				...comment,
			    comment: "",
			})
			toast.success("Su comentario fue publicado.")


		} else {
			toast.error("Es necesaria una cuenta para publicar un comentario")
		}
	}

	const [verMasBoton, setverMas] = useState({
        show: true
    })
 
   const verMas =  e =>{
       e.preventDefault()
       setverMas ({
        ...verMasBoton,
        show: !verMasBoton.show
    })
   }
	
	return ( 
		<>
		{props.recipe === null 
		? ""
		:<>
	<Header/>
	<div id="space" style={{ height:"10vh"}}></div>
	<div id="banner" style={{backgroundImage: `url(${imageBanner})`}}>
			<div id="ProfilePic" style={{backgroundImage: `url(${props.recipe.userPic})`, width:"25vh", height:"25vh"}}>
				<p>{props.recipe.username.toUpperCase()}</p>
			</div>
	</div>
	<div id="everything">
		<div id="LeftSide">
		    <div id="difficulty" key={props.recipe.difficulty}>
					<img src={require(`../images/${props.recipe.difficulty}.png`)} id="difficultyImg" />
			</div>
			<div  id="imageFood" style={{backgroundImage: `url(${RUTA_API +'/'+ props.recipe._id+'.jpg'})`}} >
			<div class="data">
				<div class="time">
						<span><i class="far fa-clock"> </i> <span class="number">{time(props.recipe.duration)}</span></span>
						<span style={{fontWeight: "bold", paddingLeft:"1vw"}}>{props.recipe.duration < 59 ? 'minutos' : props.recipe.duration == 60 ? 'hora' : 'horas'}</span>
					</div>
					<div class="likes">
                        <span>
                            <i class={(props.likes.indexOf(props.recipe._id) !== -1)? "fas fa-heart":"far fa-heart"}  onClick={autLikes} ></i>
                            <span class="number">{props.recipe.likes}</span>
                        </span>
						<span style={{fontWeight: "bold", paddingLeft:"1vw"}}>likes</span>
					</div>
				</div>
			</div>
				<div id="ingredients">
					<h3 className="title">Ingredientes</h3>
					<h6>cant.</h6>
				{props.recipe.ingredients.map(ingredient =>{
					return <div className="ingredient">
						<p className="TheIngredient">{ingredient.name}</p>
						<p className="TheAmount">{ingredient.quantity || ""}</p>
					</div>
				})}
			</div>
		</div>
		<div id="RightSide">
			<div id="icons">
				{props.recipe.importantContain.map(allAlergies => {
					return <div id="allAlergies" key={allAlergies}>
							<img src={require(`../images/${allAlergies}.png`)} id="allergie" />
						</div>
				})}				
			</div>
			<div id="titleDescription">
				<h2>{props.recipe.title}</h2>
				<p>{props.recipe.description}</p>
			</div>

			
			<div id="steps" style={ verMasBoton.show ? {height:"280px"} : {height:"unset"}  }>
				<h3 className="title">Pasos a seguir</h3>
				  {props.recipe.recipe.map((step,index) => {
					return <div className="divRecipeSteps">
					    <h4>{index + 1}</h4>
					    <p className="RecipeSteps" >{step}</p>
				        </div>
				   })}
		      </div>
			  <button id="viewMoreSteps" onClick={verMas}>{verMasBoton.show ? "Ver Mas" : "Ver Menos"} </button>
			  <div id="theComments">
					<div id="scrollComments">
						{props.comments === null
						? "cargando..."
						: props.comments.map((comentario, index) => {
							return <Comment key={index} fx={setUpdate} data={comentario} />
						})}
					</div>
					<div id="TheInput">
						<input onChange={readComment} id="TextComment" placeholder="write your comment here..." name="comment" value={comment.comment}/>
						<button id="buttonSend" onClick={sendComment}>send</button>
				    </div>
			   </div>
		</div>
	</div>
	<div id="everythingMovile">
		<div id="titleDescription">
			<h2>{props.recipe.title}</h2>
			<p>{props.recipe.description}</p>
		</div>
		<div  id="imageFood" style={{backgroundImage: `url(${props.recipe.urlPic})`}}> 
		    <div class="data">
				<div class="time">
					<span><i class="far fa-clock"> </i> <span class="number">{time(props.recipe.duration)}</span></span>
					<span style={{fontWeight: "bold", paddingLeft:"1vw"}}>{props.recipe.duration < 59 ? 'minutos' : props.recipe.duration == 60 ? 'hora' : 'horas'}</span>
				</div>
				<div class="likes">
					<span><i class="far fa-heart"> </i> <span class="number">{props.recipe.likes}</span></span>
					<span style={{fontWeight: "bold", paddingLeft:"1vw"}}>likes</span>
				</div>
		   </div>
		</div>
		<div id="difficulty" key={props.recipe.difficulty}>
					<img src={require(`../images/${props.recipe.difficulty}.png`)} id="difficultyImg" />
		</div>
		<div id="icons">
			{props.recipe.importantContain.map(allAlergies => {
				return <div id="allAlergies" key={allAlergies}>
						  <img src={require(`../images/${allAlergies}.png`)} id="allergie" />
					  </div>
			})}
		</div>
		<div id="ingredients">
			<h3 className="title">Ingredientes</h3>
			<h6>cant.</h6>
		{props.recipe.ingredients.map(ingredient =>{
			return <div className="ingredient">
					<p className="TheIngredient">{ingredient.name}</p>
					<p className="TheAmount">{ingredient.quantity || ""}</p>
			</div>
		})}
		</div>
		<div id="steps" style={ verMasBoton.show ? {height:"388px"} : {height:"unset"}}>
		        <img id="homeBackgroundThree" src={homeBackgroundThree}/>
				<h3 className="title">Pasos a seguir</h3>
				{props.recipe.recipe.map((step,index) => {
					return <div className="divRecipeSteps">
					<h4>{index + 1}</h4>
					<p className="RecipeSteps" >{step}</p>
				</div>
				})}
				
		</div>
		<button id="viewMoreSteps"onClick={verMas}>{verMasBoton.show ? "Ver Mas" : "Ver Menos"} </button>
		<div id="theComments">
			<div id="scrollComments">
				{props.comments === null
				? "cargando..."
				: props.comments.map((comentario, index) => {
					return <Comment key={index} fx={setUpdate} data={comentario} />
				})}
			</div>
			<div id="TheInput">
				<input onChange={readComment} id="TextComment" placeholder="write your comment here..." name="comment" value={comment.comment}/>
				<button id="buttonSend" onClick={sendComment}>send</button>
			</div>
		</div>
	</div>
	 </>}
	</> )
}

const mapStateToProps = state => {
	return {
		recipe: state.recipeReducer.recipe,
		token: state.userReducer.token,
        urlPic: state.userReducer.urlPic,
        likes : state.userReducer.likes,
		username: state.userReducer.username,
		comments: state.userReducer.comments,
	}
}

const mapDispatchToProps = {
    getRecipe: recipeActions.getRecipe,
    modifyUser: userActions.modifyUser,
    modifyRecipe: recipeActions.modifyRecipe,
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
