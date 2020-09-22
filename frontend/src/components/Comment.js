import React, { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import "../styles/comments.css";
import rubish from "../images/rubish.png";
import editComment from "../images/editComment.png";
import saveTik from "../images/saveTik.png";
import { RUTA_API } from "../constants";

const Comment = props => {
	const [editedComment, setEditedComment] = useState({
		comment: props.data.comment,
	})
	const [edit, setEdit] = useState(false)
	const [commentId, setDeleted] = useState(props.data._id)

	const erased = async () => {
		await props.deleteComment(commentId)
		props.fx(true)
	}

	const editing = () => {
		setEdit(!edit)
	}

	const readComment = e => {
		const text = e.target.value

		setEditedComment({
			...editedComment,
			[e.target.name]: text,
			commentId: props.data._id,
		})

	}
	const sendEditedComment = async e => {
		e.preventDefault()
		await props.editComment(editedComment)
		props.fx(true)
		setEdit(false)
	}
	const options = () => {
		if (props.username === props.data.username) {
			return (

				<>{edit 
				? <input type='text' onChange={readComment}id="CommentEditText" name="comment" style={{ backgroundColor: "white"}} value={editedComment.comment}></input>
				 : <div id="heigtComment">
				 <p style={{ backgroundColor: "white"}}> {props.data.comment}</p>
				 </div>
			     }
		
					<div id="buttonEdit">
						<button onClick={erased} className="buttonRubish" >
							<img id="rubish" src={rubish}></img>
						</button>

						{edit
						? <button onClick={sendEditedComment} className="buttonRubish">
						     <img id="edit" src={saveTik}></img>
						 </button>

						:<button onClick={editing} className="buttonRubish">
					    	<img id="edit" src={editComment}></img>
						 </button>
		                }		
					</div>
				</>
			)
		} else {
		return (
				<>
					<p style={{ backgroundColor: "white"}}>
						{props.data.comment}
					</p>
				</>
			)
		}
	}
	
	return (
			<div id="allComentsDone">
				<div id="foto">
					{props.data.userPic == "false"
					? <div id="userPic">{props.data.username.substr(0,1).toUpperCase()}</div>
					: <div id="userPic" style={{ backgroundImage: `url(${props.data.userPic == "true" ? `${RUTA_API}/${props.data.username}.jpg` : props.data.userPic})`,}}></div>
					}
				</div>
				<div>
					<div id="titleEditComments" >
						<div id="titleComment">
							<p style={{fontWeight: "bold"}}>{props.data.username}  </p>
						</div>
						<div id="editComments">
							{options()}
						</div>
					</div>
				</div>
			</div>
	)
}

const mapStateToProps = state => {
	return {
		username: state.userReducer.username,
	}
}
const mapDispatchToProps = {
	editComment: userActions.editComment,
	deleteComment: userActions.deleteComment,
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
