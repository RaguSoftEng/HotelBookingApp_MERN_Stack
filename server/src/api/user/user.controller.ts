import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/api/user/user.validation';
import UserService from '@/api/user/user.service';
import User from '@/api/user/user.model';
import HttpException from '@/utils/exceptions/http.exception';
import authenticated from '@/middleware/authenticated.middleware';
import token from '@/utils/token';

class UserController implements Controller {
	public path = '/users';
	public router = Router();
	private userService = new UserService();

	constructor() {
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post(`${this.path}`, validationMiddleware(validate.create), this.create);

		this.router.post(
			`${this.path}/auth`,
			validationMiddleware(validate.login),
			this.authenticateUser
		);

		this.router.get(`${this.path}`, authenticated, this.getUsers);
	}

	private create = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const user = new User({
				fullname: req.body.fullname,
				contactNo: req.body.contactNo,
				email: req.body.email,
				isAdmin: req.body.isAdmin,
				password: req.body.password
			});

			const response = await this.userService.create(user);
			const jwt_token = token.createToken(response);

			res.status(200).json({
				response: {
					id: user._id,
					fullname: user.fullname,
					email: user.email,
					isAdmin: user.isAdmin,
					token: jwt_token
				}
			});
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private authenticateUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			const { email, password } = req.body;
			const user = await this.userService.login(email, password);

			const jwt_token = token.createToken(user);

			res.status(200).json({
				response: {
					id: user._id,
					fullname: user.fullname,
					email: user.email,
					isAdmin: user.isAdmin,
					token: jwt_token
				}
			});
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};

	private getUsers = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> => {
		try {
			if (req.user.isAdmin) {
				const response = await this.userService.getUsers();
				res.status(200).json({ response });
			} else {
				const user = req.user;
				res.status(200).json({ response: [user] });
			}
		} catch (error) {
			next(new HttpException(400, error.message));
		}
	};
}

export default UserController;
