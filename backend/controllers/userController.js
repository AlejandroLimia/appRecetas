const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const message = 'Mail or Password incorrect' 

const userController = {
	createUser: async (req, res) => {
		const {firstName, lastName, mail, pass, urlPic, userName } = req.body;
		// Hashing Password
		const hashPassword = bcrypt.hashSync(pass.trim(), 10);

		// Creating new User
		const newUser = new User({
			firstName,
			lastName,
			mail,
			urlPic,
			userName,
			pass: hashPassword
        });

        newUser.save()
        .then(user => {
            console.log('sasasasas')
            const token = jwt.sign({...user},process.env.SECRET_KEY,{})
            if(!token) return res.json({success:false, error:'An error occurred while saving the user'});
            res.json({
                success: true, token, 
                userName: user.userName, 
                urlPic: user.urlPic, 
                likes: user.likes
            });
        })
        .catch(err => res.json({success:'false',error:err}))
    },
	loginUser: async (req, res) =>{
		const {mail, pass} = req.body;
	
        const userExists = await User.findOne({mail});
        if(!userExists) return (res.json({success :false, error: message}));
        const passwordMatches = bcrypt.compareSync(pass, userExists.pass);
        console.log(passwordMatches)
		if(!passwordMatches) return (res.json({success :false, error: message})); 

        const token = jwt.sign({...userExists},process.env.SECRET_KEY,{})
        
        if(!token) return res.json({success:false, error});
        
        res.json({
                success: true, token, 
                userName: userExists.userName, 
                urlPic: userExists.urlPic, 
                likes: userExists.likes
        });
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
