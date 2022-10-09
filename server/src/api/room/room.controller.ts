import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/api/room/room.validation';
import RoomService from '@/api/room/room.service';
import Room from '@/api/room/room.model';
import HttpException from '@/utils/exceptions/http.exception';
import authenticated from '@/middleware/authenticated.middleware';
import isAuthorized from '@/middleware/authorised.middleware';

class RoomController implements Controller {
	public path = '/properties/:propertyid/rooms';
	public router = Router();
	private roomService = new RoomService();

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
			`${this.path}/:roomid`,
			isAuthorized,
			validationMiddleware(validate.update),
			this.update
		);
		this.router.get(`${this.path}`, this.getAll);
		this.router.get(`${this.path}/:roomid`, this.get);
		this.router.get(
			`${this.path}/:roomid/availabilities`,
			validationMiddleware(validate.availability),
			this.getRoomAvailability
		);

		this.router.get(
			`/properties/:propertyid/availabilities`,
			validationMiddleware(validate.availability),
			this.getAllAvailableRooms
		);
	}

	private create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const room = new Room({
				property: req.params.propertyid,
				createdBy: req.user.id,
				description: req.body.description,
				roomNo: req.body.roomNo,
				seaView: req.body.seaView,
				lakeView: req.body.lakeView,
				mountainView: req.body.mountainView,
				bathtub: req.body.bathtub,
				balcony: req.body.balcony,
				floorArea: req.body.floorArea,
				Wifi: req.body.Wifi
			});

			const response = await this.roomService.create(room);
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
			const room = {
				description: req.body.description,
				seaView: req.body.seaView,
				lakeView: req.body.lakeView,
				mountainView: req.body.mountainView,
				bathtub: req.body.bathtub,
				balcony: req.body.balcony,
				floorArea: req.body.floorArea,
				Wifi: req.body.Wifi,
				updatedBy: req.user.id
			};

			const response = await this.roomService.update(req.params.roomid, room);

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
			const response = await this.roomService.getRoomById(req.params.roomid);
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
			const response = await this.roomService.getRooms(req.params.propertyid);
			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private getRoomAvailability = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const response = await this.roomService.getRoomAvailablitiy({
				id: req.params.roomid,
				checkinAt: req.body.checkinAt,
				checkoutAt: req.body.checkoutAt
			});
			res.status(200).json({
				response: {
					isAvailable: response
				}
			});
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private getAllAvailableRooms = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const response = await this.roomService.getAvailabilities({
				id: req.params.propertyid,
				checkinAt: req.body.checkinAt,
				checkoutAt: req.body.checkoutAt
			});
			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};
}

export default RoomController;
