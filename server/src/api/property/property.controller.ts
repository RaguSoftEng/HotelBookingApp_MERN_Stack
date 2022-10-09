import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/api/property/property.validation';
import PropertyService from '@/api/property/property.service';
import Property from '@/api/property/property.model';
import HttpException from '@/utils/exceptions/http.exception';
import authenticated from '@/middleware/authenticated.middleware';
import isAuthorized from '@/middleware/authorised.middleware';

class PropertyController implements Controller {
	public path = '/properties';
	public router = Router();
	private propertyService = new PropertyService();

	constructor() {
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post(
			`${this.path}`,
			isAuthorized,
			validationMiddleware(validate.create),
			this.create
		);

		this.router.put(
			`${this.path}/:propertyid`,
			isAuthorized,
			validationMiddleware(validate.update),
			this.update
		);

		this.router.get(`${this.path}`, this.getAll);
		this.router.get(`${this.path}/:propertyid`, this.get);
	}

	private create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const property = new Property({
				createdBy: req.user.id,
				description: req.body.description,
				name: req.body.name,
				city: req.body.city,
				address: req.body.address,
				contactNo: req.body.contactNo
			});

			const response = await this.propertyService.create(property);
			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private update = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const property = {
				description: req.body.description,
				city: req.body.city,
				address: req.body.address,
				contactNo: req.body.contactNo,
				updatedBy: req.user.id,
				rates: req.body.rates
			};

			const response = await this.propertyService.update(req.params.propertyid, property);

			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private getAll = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const response = await this.propertyService.getProperties();
			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private get = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const response = await this.propertyService.getPropertyById(req.params.propertyid);
			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};
}

export default PropertyController;
