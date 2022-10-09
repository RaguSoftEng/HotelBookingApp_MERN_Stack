import Joi from 'joi';

const create = Joi.object({
	fullname: Joi.string().required(),
	contactNo: Joi.string().required(),
	email: Joi.string().email().required(),
	isAdmin: Joi.boolean().default(false),
	password: Joi.string().min(6).required()
});

const login = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

export default { create, login };
