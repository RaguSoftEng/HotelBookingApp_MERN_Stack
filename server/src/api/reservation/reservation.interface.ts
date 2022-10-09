import { Document } from 'mongoose';
import IUser from '@/api/user/user.interface';
import IProperty from '@/api/property/property.interface';
import IRoom from '@/api/room/room.interface';

export default interface IReservation extends Document {
	property: IProperty;
	room: IRoom;
	reservedBy: IUser;
	reservedAt: Date;
	guestName: string;
	contactNo: string;
	reservedFrom: Date;
	reservedTo: Date;
	checkinAt: Date;
	checkoutAt: Date;
	noOfStay: number;
	reservationType: string;
	occupancy: string;
	planedArrival: Date;
	specialNotes: string;
	parking: boolean;
	payment: {
		paiedAt: Date;
		paymentMethod: string;
		amount: number;
	};
	cancel: {
		canceledAt: Date;
		canceledBy: IUser;
		resoan: string;
		cancelFee: number;
	};
	status: string;
	updatedBy: IUser;
}
