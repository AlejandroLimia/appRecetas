const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
	createUser: async (req, res) => {
		const {firstName, lastName, mail, pass, urlPic, username } = req.body;
		let error = false;
		
		// Hashing Password
		const hashPassword = bcrypt.hashSync(pass.trim(), 10);

		// Creating new User
		const newUser = new User({
			firstName,
			lastName,
			mail,
			urlPic,
			username,
			pass: hashPassword
		})
		// Saving new User
		let newUserSaved, token;
		try {
			let throws = '';
			if(await User.find({mail: mail.trim()}).countDocuments() !== 0) {
				throws += "Mail alredy used "
			}
			if(await User.find({username: username.trim()}).countDocuments() !== 0) {
				throws += "Username alredy used"
			}
			if(throws !== '') throw throws
			newUserSaved = await newUser.save();
			console.log(newUserSaved)
			if(!newUserSaved){
				throw 'An error occurred while saving the user'
			}
		}
		catch (err) {
			error = err;
		}
		finally {
			token = !error ? jwt.sign({...newUserSaved}, process.env.SECRET_KEY) : null;
			res.json({
				success: newUserSaved ? true : false,
				error,
				response: !error && {
					token,
					urlPic: newUserSaved.urlPic,
					username: newUserSaved.username,
					likes: newUserSaved.likes
				}
			})
		}
	},
	loginUser: async (req, res) =>{
		const {mail, pass} = req.body;
		let error = false;
		const userExists = await User.findOne({
			mail
		})
		error = !userExists && 'Mail or Password incorrect';
		if(!error){
			const passwordMatches = bcrypt.compareSync(pass, userExists.pass);
			error = !passwordMatches && 'Mail or Password incorrect';
		}
		
		const token = !error ? jwt.sign({...userExists}, process.env.SECRET_KEY) : null;
		
		return res.json({
			success: error ? false : true,
			error,
			response: !error && {
				token,
				urlPic: userExists.urlPic,
				username: userExists.username,
				likes: userExists.likes
			}
		})
	},
	decodeUser: (req, res) => {
		const {urlPic, username, likes} = req.user;
		res.json({
			urlPic,
			username,
			likes
		})
	}
}

module.exports = userController;
