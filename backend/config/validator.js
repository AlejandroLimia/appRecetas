const Joi = require('@hapi/joi');

const validator = {
	validateUser: (req, res, next) => {
		const schema = Joi.object({
			firstName: Joi.string().trim().alphanum().min(3).max(20).required(),
			lastName: Joi.string().trim().alphanum().min(3).max(20).required(),
			username: Joi.string().trim().min(3).max(20).required(),
			mail: Joi.string().trim().email().required(),
			pass: Joi.string().trim().pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/, 'password').required(),
			urlPic: Joi.string().uri().required().trim(),
			country: Joi.string().max(2)
		})
		const validation = schema.validate(req.body, { abortEarly: false })
		
		if(validation.error !== undefined){
			return res.json({
				success: false,
				error: 'Error de validacion. Uno o mas campos no respetan el formato',
				message: validation.error
			});
		}
		next();
	},
	validateRecipe: (req, res, next) =>{
		const schema = Joi.object({
			title: Joi.string().trim().alphanum().min(6).max(40).required(),
            description:Joi.string().trim().alphanum().min(20).max(300).required(),
			ingredients: Joi.array().items({quantity: Joi.number().required(), name: Joi.string().alphanum().required()}),
            recipe: Joi.string().trim().min(10).required(),
			importantContains: Joi.array(),
            diet:Joi.array().items(Joi.string()),
			difficulty: Joi.string().trim().alphanum().required(),
			urlPic: Joi.string().uri().required().trim(),
			userPic: Joi.string().uri().required().trim(),
			userId: Joi.string()
		})
		const validation = schema.validate(req.body, { abortEarly: false })
		
		if(validation.error !== undefined){
			return res.json({
				success: false,
				error: 'Error de validacion. Uno o mas campos no respetan el formato',
				message: validation.error
			});
		}
		next();
	}
}

module.exports = validator;