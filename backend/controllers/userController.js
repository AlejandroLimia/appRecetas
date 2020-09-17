const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const message = "Mail or Password incorrect"

const userController = {
	createUser: async (req, res) => {
		const { pass } = req.body
		// Creating new User
		const newUser = new User({ ...req.body })
		newUser.pass = bcrypt.hashSync(pass.trim(), 10)

		newUser
			.save()
			.then(user => {
				const token = jwt.sign({ ...user }, process.env.SECRET_KEY, {})
				if (!token)
					return res.json({
						success: false,
						error: "An error occurred while saving the user",
					})
				res.json({
					success: true,
					token,
					username: user.username,
					urlPic: user.urlPic,
					likes: user.likes,
				})
			})
			.catch(err => res.json({ success: "false", error: err }))
	},
	loginUser: async (req, res) => {
		const { mail, pass } = req.body

		const userExists = await User.findOne({ mail })
		if (!userExists) return res.json({ success: false, error: message })
		const passwordMatches = bcrypt.compareSync(pass, userExists.pass)
		console.log(passwordMatches)
		if (!passwordMatches) return res.json({ success: false, error: message })
		const token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
		if (!token) return res.json({ success: false, error })

		res.json({
			success: true,
			token,
			username: userExists.username,
			urlPic: userExists.urlPic,
			likes: userExists.likes,
			id: userExists._id,
		})
	},
	decodeUser: (req, res) => {
		const { urlPic, username, likes } = req.user
		res.json({
			urlPic,
			username,
			likes,
		})
	},
    editUser: (req , res) =>{
        User.findByIdAndUpdate(req.body._id,{...req.body},{new:true})
        .then(user => res.json({success: true, username: user.username ,urlPic: user.urlPic}))
        .catch(err => res.json({success:false, error: err})) 
    },
    getUserInformation: (req, res) => {
        const  user = User.findOne({...req.params})
        if(!user) return res.json({success : true, user: null})
        const { username, firstName, lastName, mail, urlPic, description } = user
        res.json({
            success: true,
            infoUser:{
                username,
                firstName,
                lastName,
                mail,
                urlPic,
                description
            }
        })
    }
}

module.exports = userController
