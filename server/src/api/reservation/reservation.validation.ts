import Joi from 'joi';

const create = Joi.object({
	property: Joi.string().required(),
	room: Joi.string().required(),
	guestName: Joi.string(),
	contactNo: Joi.string(),
	reservedFrom: Joi.date().greater(Date.now()).required(),
	reservedTo: Joi.date().greater(Joi.ref('reservedFrom')).required(),
	reservationType: Joi.string().valid('bed&breakfast', 'half-board', 'full-board').required(),
	occupancy: Joi.string().valid('single', 'double', 'trible').required(),
	planedArrival: Joi.date().greater(Date.now()).required(),
	specialNotes: Joi.string(),
	parking: Joi.boolean(),
	payment: Joi.object()
		.keys({
			paymentMethod: Joi.string().valid('card-online', 'card-location', 'cash').required(),
			amount: Joi.number().required()
		})
		.required()
});

const update = Joi.object().keys({
	status: Joi.string().valid('checkedin', 'checkedout')
});

const cancel = Joi.object().keys({
	resoan: Joi.string().required(),
	cancelFee: Joi.number().required()
});

export default { create, update, cancel };
