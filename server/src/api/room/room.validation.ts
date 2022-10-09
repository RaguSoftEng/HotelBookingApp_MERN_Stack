import Joi from 'joi';

const create = Joi.object().keys({
	roomNo: Joi.string().required(),
	description: Joi.string(),
	seaView: Joi.boolean().default(false),
	lakeView: Joi.boolean().default(false),
	mountainView: Joi.boolean().default(false),
	bathtub: Joi.boolean().default(false),
	balcony: Joi.boolean().default(false),
	floorArea: Joi.string(),
	Wifi: Joi.boolean().default(false)
});

const update = Joi.object().keys({
	description: Joi.string(),
	seaView: Joi.boolean(),
	lakeView: Joi.boolean(),
	mountainView: Joi.boolean(),
	bathtub: Joi.boolean(),
	balcony: Joi.boolean(),
	floorArea: Joi.string(),
	Wifi: Joi.boolean()
});

const availability = Joi.object().keys({
	checkinAt: Joi.date().greater(Date.now()).required(),
	checkoutAt: Joi.date().greater(Joi.ref('checkinAt')).required()
});

export default { create, update, availability };
