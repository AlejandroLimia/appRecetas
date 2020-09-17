import React, { useState } from "react"
import { connect } from "react-redux"
import usuario from "../images/usuario.png"
import userActions from "../redux/actions/userActions"

const Comment = props => {
	console.log(props)
	const [editedComment, setEditedComment] = useState({})
	const erased = async () => {
		await props.deleteComment(props.data._id)
	}
	const edite = async () => {
		setEditedComment({
			commentId: props.data._id,
			comment: props.data.comment,
		})
		await props.editComment(editedComment)
	}
	const options = () => {
		if (props.username === props.data.username) {
			return (
				<>
					<button onClick={erased} style={{ width: "20px", height: "20px" }}>
						x
					</button>
					<button onClick={edite} style={{ width: "20px", height: "20px" }}>
						editar
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
							<p style={{ backgroundColor: "white", padding: "2.4vw" }}>
								{" "}
								{props.data.comment}
							</p>
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
