const Joi = require('@hapi/joi');

const validator = {
	validateUser: (req, res, next) => {
		const schema = Joi.object({
			username: Joi.string().trim().min(3).max(20).required(),
			mail: Joi.string().trim().email().required(),
			pass: Joi.string().trim().pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/, 'password').required()
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
			ingredients: Joi.array().items({quantity: Joi.string().required(), name: Joi.string().alphanum().required()}),
            recipe: Joi.array().items(Joi.string()).required(),
			importantContain: Joi.array(),
            diet:Joi.string(),
			difficulty: Joi.string().trim().alphanum().required(),
			urlPic: Joi.string().uri().required().trim(),
			userPic: Joi.string().uri().required().trim(),
			duration: Joi.number().integer().required().trim(),
			userId: Joi.string(),
			username: Joi.string()
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
