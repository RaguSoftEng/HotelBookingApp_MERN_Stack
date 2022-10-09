import { Document } from 'mongoose';

export default interface IUser extends Document {
	fullname: string;
	contactNo: string;
	email: string;
	isAdmin: boolean;
	password: string;

	isValidPassword(password: string): Promise<Error | boolean>;
}
