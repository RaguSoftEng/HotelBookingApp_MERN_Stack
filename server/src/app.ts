import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import Morgan from 'morgan';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';

class App {
	public express: Application;
	public port: number;

	constructor(controllers: Controller[], port: number) {
		this.express = express();
		this.port = port;

		this.initDbConnection();
		this.initMiddlewares();
		this.initControllers(controllers);
		this.initErrorsHandling();
	}

	private initMiddlewares(): void {
		this.express.use(helmet());
		this.express.use(cors());
		this.express.use(Morgan('dev'));
		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: false }));
		this.express.use(compression());
	}

	private initControllers(controllers: Controller[]): void {
		controllers.forEach((controller: Controller) => {
			this.express.use('/api', controller.router);
		});
	}

	private initDbConnection(): void {
		const { MONGO_PATH, MONGO_USER, MONGO_PASSWORD } = process.env;
		try {
			mongoose.connect(`${MONGO_PATH}`);
			console.log('Connected to MongoDb.');
		} catch (error) {
			throw error;
		}
	}

	private initErrorsHandling(): void {
		this.express.use(ErrorMiddleware);
	}

	public listen(): void {
		this.express.listen(this.port, () => {
			console.log(`Server listening on port ${this.port}`);
		});
	}
}

export default App;
