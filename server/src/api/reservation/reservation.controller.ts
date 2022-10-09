import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/api/reservation/reservation.validation';
import ReservationService from '@/api/reservation/reservation.service';
import Reservation from '@/api/reservation/reservation.model';
import HttpException from '@/utils/exceptions/http.exception';
import authenticated from '@/middleware/authenticated.middleware';
import sendMail from '@/utils/sendMail';
import isAuthorized from '@/middleware/authorised.middleware';

class ReservationController implements Controller {
	public path = '/reservations';
	public router = Router();
	private reservationService = new ReservationService();

	constructor() {
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post(
			`${this.path}`,
			authenticated,
			validationMiddleware(validate.create),
			this.reserve
		);

		this.router.put(
			`${this.path}/:id`,
			isAuthorized,
			validationMiddleware(validate.update),
			this.update
		);

		this.router.put(
			`${this.path}/:id/cancellations`,
			authenticated,
			validationMiddleware(validate.cancel),
			this.cancel
		);

		this.router.get(`${this.path}`, authenticated, this.getAll);
		this.router.get(`${this.path}/:id`, authenticated, this.get);
		this.router.get(`${this.path}/:id/cancellations`, isAuthorized, this.calculateCancelFee);
	}

	private reserve = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const days = Math.ceil(
				(new Date(req.body.reservedTo).getTime() -
					new Date(req.body.reservedFrom).getTime()) /
					(1000 * 3600 * 24)
			);

			const reservation = new Reservation({
				reservedBy: req.user.id,
				property: req.body.property,
				room: req.body.room,
				guestName: req.body.guestName | req.user.fullname,
				contactNo: req.body.contactNo | req.user.contactNo,
				reservedFrom: req.body.reservedFrom,
				reservedTo: req.body.reservedTo,
				reservationType: req.body.reservationType,
				occupancy: req.body.occupancy,
				planedArrival: req.body.planedArrival,
				specialNotes: req.body.specialNotes,
				parking: req.body.parking,
				payment: req.body.payment,
				noOfStay: days,
				status: 'reserved'
			});

			const response = await this.reservationService.create(reservation);

			const emailBody = `Dear ${req.user.fullname} \n\nThis email is to confirm your booking on ${response.reservedAt} for a ${response.occupancy} room for ${days} nights at the MangoHolidays (Pvt) Ltd. The check-in date shall be on ${response.reservedFrom} and the check-out date shall be on ${response.reservedTo}.
			\n\n\nBest Regards \nMangoHolidays (Pvt) Ltd`;

			sendMail({
				to: req.user.email,
				subject: 'Booking confirmations',
				textBody: emailBody
			});

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
			const reserveObj = {
				status: req.body.status,
				updatedBy: req.user.id,
				checkinAt: req.body.status === 'checkedin' ? Date.now() : undefined,
				checkoutAt: req.body.status === 'checkedout' ? Date.now() : undefined
			};

			const response = await this.reservationService.update(req.params.id, reserveObj);

			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private cancel = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const cencelObj = {
				status: 'canceled',
				updatedBy: req.user.id,
				cancel: {
					canceledBy: req.user.id,
					canceledAt: Date.now(),
					resoan: req.body.cancel.resoan,
					cancelFee: req.body.cancel.cancelFee
				}
			};

			const response = await this.reservationService.update(req.params.id, cencelObj);

			const emailBody = `Dear ${response.reservedBy.fullname} \n\nThis email is to confirm your booking cancellation for a ${response.occupancy} room for ${response.noOfStay} nights at the MangoHolidays (Pvt) Ltd.
						\n\n\nBest Regards \nMangoHolidays (Pvt) Ltd`;

			sendMail({
				to: response.reservedBy.email,
				subject: 'Booking cancellation',
				textBody: emailBody
			});

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
			const response = await this.reservationService.getReservations({});
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
			const response = await this.reservationService.getReservationsById(req.params.id);
			res.status(200).json({ response });
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private calculateCancelFee = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const response = await this.reservationService.getReservationsById(req.params.id);

			let fee = 0;

			if (response.status === 'reserved') {
				const time_diff = new Date(response.reservedFrom).getTime() - new Date().getTime();
				const time_remind = time_diff / (1000 * 3600);
				fee = time_remind <= 12 ? response.payment.amount * 0.2 : 0;
			}

			res.status(200).json({
				response: {
					isAllowed: response.status === 'reserved',
					cancelFee: fee
				}
			});
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};
}

export default ReservationController;
