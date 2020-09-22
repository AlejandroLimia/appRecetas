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
    addLike: async(req, res)=>{
        const {username, recipeId} = req.body 
        const user= await User.findOneAndUpdate({username},{$push:{likes:recipeId}},{new:true})
        res.json({
            success: true,
            likes: user.likes
        })
  },
    deleteLike: async (req,res)=>{
        const {username, recipeId} = req.body
        const user = await User.findOne({username})
        const likesUpdata = user.likes.filter(likeId => (likeId !== recipeId))
        user.likes = likesUpdata
        user.save()
        .then(user => res.json({success:true, likes: user.likes }) )        

    },
    editUser: (req , res) =>{
		if(req.user.username !== req.body.username) res.json({success: false, error: "No puede modificar este perfil"})

        User.findOneAndUpdate({_id: req.user._id },{...req.body},{new:true})
		.then(user => {
			if(req.files.pic !== undefined) {
			const path = require('path');
			const file = req.files.pic
			const ruta = `${path.join(__dirname, '..', 'client', 'img')}/${user.username}.jpg`
			let error = null
			file.mv(ruta, async err => {
					if (err) {
						error = 'Problemas al grabar la imagen';
					}
					else {
						const user = await User.findOneAndUpdate({_id: req.user._id },{urlPic: true},{new:true})
						res.json({
						success: !error ? true : false,
						error,
						user
						})}
			})
			}
			res.json({success: true, username: user.username ,urlPic: user.urlPic, likes: user.likes })})
        .catch(err => {
			res.json({success:true, error: err})
		}) 
    },
    getUserInformation: async (req, res) => {
        const user = await User.findOne({...req.params})
        if(!user) return res.json({success : true, user: null})
        const { username, firstName, lastName, mail, urlPic, description, likes } = user
        res.json({
            success: user ? true : false,
            userInfo:{
				likes,
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
