import React, { useState } from "react"
import { connect } from "react-redux"
import usuario from "../images/usuario.png"
import userActions from "../redux/actions/userActions"
import { toast } from "react-toastify"
import "../styles/comments.css"
import rubish from "../images/rubish.png"

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
		
		setEdit(true)
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
		if (props.username === props.data.username && !edit) {
			return (
				<>
					<p style={{ backgroundColor: "white"}}>
						{" "}
						{props.data.comment}
					</p>
					<button onClick={erased} id="buttonRubish" style={{ width: "20px", height: "20px" }}>
						<img id="rubish" src={rubish}></img>
					</button>
					{/*<button onClick={editing} style={{ width: "20px", height: "20px" }}>
						editar
			</button>*/}
				</>
			)
		} else {
		return (
				<>
					<textarea id="CommentEditText" value={editedComment.comment} onChange={readComment} name="comment" />
				</>
			)
		}
	}
	return (
			<div id="allComentsDone">
				<div className="foto">
					{" "}
					<div id="userPicture" style={{ backgroundImage: `url(${usuario})`,}}/>
				</div>
				<div>
					<div id="titleEditComments">
						<div id="titleComment">
							<p>{props.data.username} said:</p>
							<p style={{ fontStyle: "italic", fontSize: "1vw" }}>date</p>
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
