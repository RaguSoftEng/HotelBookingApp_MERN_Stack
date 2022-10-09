import { Document } from 'mongoose';
import IProperty from '@/api/property/property.interface';
import IUser from '@/api/user/user.interface';

export default interface IRoom extends Document {
	property: IProperty;
	createdBy: IUser;
	updatedBy: IUser;
	roomNo: string;
	description: string;
	seaView: boolean;
	lakeView: boolean;
	mountainView: boolean;
	bathtub: boolean;
	balcony: boolean;
	floorArea: string;
	Wifi: boolean;
}
