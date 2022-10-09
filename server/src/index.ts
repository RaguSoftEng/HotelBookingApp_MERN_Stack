import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import UserController from '@/api/user/user.controller';
import RoomController from '@/api/room/room.controller';
import PropertyController from '@/api/property/property.controller';
import ReservationController from '@/api/reservation/reservation.controller';

validateEnv();

const app = new App(
	[
		new UserController(),
		new PropertyController(),
		new RoomController(),
		new ReservationController()
	],
	Number(process.env.PORT)
);

app.listen();
