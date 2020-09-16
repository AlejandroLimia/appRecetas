import React from "react"
import { connect } from "react-redux"
import usuario from "../images/usuario.png"

const Comment = comentario => {
	console.log(comentario)
	const deleteComment = () => {
		if (comentario.username === comentario.data.username) {
			return (
				<button style={{ width: "2px", height: "2px", color: "red" }}>x</button>
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
							<p>{comentario.data.username} said:</p>
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
								{comentario.data.comment}
							</p>
							{deleteComment}
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
export default connect(mapStateToProps, null)(Comment)

///versión para comentar:
/* <div className="writeComment" style={{width:"100%", display: "flex", alignItems:"center", justifyContent:'center'}}>
         <div className="picturebox" style={{backgroundImage: `url(${userImg})`,width:"4.5em", height:"4.5em",backgroundSize:"cover", alignItems:"center", display:"flex", margin: "0 2%"}}  />
         <textarea  playholder="write your comment here..." onChange={readComment} name="comment" style={{width:"60%",border:'2px black solid', padding:"1.5%" ,borderRadius:"2em", backgroundColor:"white", resize:"none",outline:"none", overflow:"hidden", marginRight:"2%" }}/>
      <div style={{marginBotton:"4%", display: "table"}}><button style={{alignSelf:"center!important",padding:"3%"}} onClick={sendComment} >send</button></div>
 </div>*/
