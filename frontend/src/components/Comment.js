import React, { useState } from "react"
import { connect } from "react-redux"
import usuario from "../images/usuario.png"
import userActions from "../redux/actions/userActions"
import { toast } from "react-toastify"

const Comment = props => {
	const [editedComment, setEditedComment] = useState({})
	const [edit, setEdit] = useState(false)
	console.log(props.data._id)
	const erased = async () => {
		await props.deleteComment(props.data._id)
	}
	const editing = () => {
		setEdit(true)
		return (
			<>
				<div
					style={{
						backgroungColor: "white",
						borderLeft: "0.5vw solid #dedede",
						borderBottom: "0.5vw solid #dedede",
						minHeight: "15vw",
					}}
				>
					<p style={{ backgroundColor: "white", padding: "2.4vw" }}>
						{" "}
						{props.data.comment}
					</p>
				</div>
			</>
		)
	}
	const readComment = e => {
		console.log(props.data._Id)
		const text = e.target.value
		setEditedComment({
			...editedComment,
			[e.target.name]: text,
			commentId: props.data._Id,
		})
		console.log(editedComment)
	}
	const sendEditedComment = async e => {
		e.preventDefault()

		await props.editComment(editedComment)
	}
	const options = () => {
		if (props.username === props.data.username && !edit) {
			return (
				<>
					<p style={{ backgroundColor: "white", padding: "2.4vw" }}>
						{" "}
						{props.data.comment}
					</p>
					<button onClick={erased} style={{ width: "20px", height: "20px" }}>
						x
					</button>
					<button onClick={editing} style={{ width: "20px", height: "20px" }}>
						editar
					</button>
				</>
			)
		} else {
			return (
				<>
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
					<button onClick={erased} style={{ width: "20px", height: "20px" }}>
						x
					</button>
					<button
						onClick={sendEditedComment}
						style={{ width: "20px", height: "20px" }}
					>
						enviar
					</button>
				</>
			)
		}
	}

	return (
		<div style={{ margin: "5vw" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "nowrap",
					justifyContent: "space-between",
					alignItems: "stretch",
					alignContent: "flex-start",
					paddingBottom: "5px",
					width: "60%",
				}}
			>
				<div className="foto">
					{" "}
					<div
						style={{
							backgroundImage: `url(${usuario})`,
							width: "4.5em",
							border: "0.2vw solid white",
							height: "4.5em",
							backgroundSize: "cover",
							alignItems: "center",
							display: "inline-block",
							margin: "1vw",
							borderRadius: "50px",
						}}
					/>
				</div>

				<div>
					<div style={{ width: "100%" }}>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								backgroundColor: "#f7f7f7",
								marginLeft: "-1px",
								padding: " 0 2vw 0 2vw",
								borderBottom: "0.2vw dashed black",
							}}
						>
							<p>{props.data.username} said:</p>
							<p style={{ fontStyle: "italic", fontSize: "1vw" }}>date</p>
						</div>
						<div
							style={{
								backgroungColor: "white",
								borderLeft: "0.5vw solid #dedede",
								borderBottom: "0.5vw solid #dedede",
								minHeight: "15vw",
							}}
						>
							{options()}
						</div>
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
