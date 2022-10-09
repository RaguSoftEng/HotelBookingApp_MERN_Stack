import { Schema, model, Types } from 'mongoose';
import IRoom from '@/api/room/room.interface';

const RoomSchema = new Schema(
	{
		roomNo: {
			type: String,
			require: true,
			unique: true
		},
		description: {
			type: String
		},
		seaView: {
			type: Boolean,
			default: false
		},
		lakeView: {
			type: Boolean,
			default: false
		},
		mountainView: {
			type: Boolean,
			default: false
		},
		bathtub: {
			type: Boolean,
			default: false
		},
		balcony: {
			type: Boolean,
			default: false
		},
		floorArea: {
			type: String
		},
		Wifi: {
			type: Boolean,
			default: false
		},
		property: {
			type: Types.ObjectId,
			ref: 'Property',
			required: true
		},
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: true
		},
		updatedBy: {
			type: Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

export default model<IRoom>('Room', RoomSchema);
