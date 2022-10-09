import { Document } from 'mongoose';
import IUser from '@/api/user/user.interface';

interface IRate {
	occupancy: string;
	reservationType: string;
	amount: number;
}

export default interface IProperty extends Document {
	name: string;
	description: string;
	city: string;
	address: string;
	contactNo: string;
	createdBy: IUser;
	updatedBy: IUser;
	rates: IRate[];
}
