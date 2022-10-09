import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function errorMiddleware(
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
): void {
	const ststus = error.status || 500;
	const message = error.message || 'Somthing went wrong';

	res.status(ststus).send({
		ststus,
		message
	});
}

export default errorMiddleware;
