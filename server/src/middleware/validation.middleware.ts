import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';
function validationMiddleware(schema: Joi.Schema): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const validationOption = {
			abortEarly: false,
			allowUnKnown: true,
			stripUnKnown: true
		};

		try {
			const value = await schema.validateAsync(req.body, validationOption);
			req.body = value;
			next();
		} catch (ex) {
			const errors: string[] = [];
			ex.details.forEach((e: Joi.ValidationErrorItem) => {
				errors.push(e.message);
			});

			res.status(400).send({ errors: errors });
		}
	};
}

export function validateQueryParams(schema: Joi.Schema): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const validationOption = {
			abortEarly: false,
			allowUnKnown: true,
			stripUnKnown: true
		};

		try {
			const value = await schema.validateAsync(req.query, validationOption);
			req.query = value;
			next();
		} catch (ex) {
			const errors: string[] = [];
			ex.details.forEach((e: Joi.ValidationErrorItem) => {
				errors.push(e.message);
			});

			res.status(400).send({ errors: errors });
		}
	};
}


export default validationMiddleware;
