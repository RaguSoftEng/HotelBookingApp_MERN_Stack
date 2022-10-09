import Joi from 'joi';

const create = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	city: Joi.string().required(),
	address: Joi.string().required(),
	contactNo: Joi.string().required(),
	rates: Joi.array().items(
		Joi.object().keys({
			occupancy: Joi.string().valid('single', 'double', 'trible').required(),
			reservationType: Joi.string()
				.valid('bed&breakfast', 'half-board', 'full-board')
				.required(),
			amount: Joi.number().min(0).required()
		})
	)
});

const update = Joi.object().keys({
	description: Joi.string(),
	contactNo: Joi.string(),
	city: Joi.string(),
	address: Joi.string(),
	rates: Joi.array().items(
		Joi.object().keys({
			occupancy: Joi.string().valid('single', 'double', 'trible').required(),
			reservationType: Joi.string()
				.valid('bed&breakfast', 'half-board', 'full-board')
				.required(),
			amount: Joi.number().min(0).required()
		})
	)
});

export default { create, update };
