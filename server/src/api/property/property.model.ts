import { Schema, model, Types } from 'mongoose';
import IProperty from '@/api/property/property.interface';

const PropertySchema = new Schema(
	{
		name: {
			type: String,
			require: true
		},
		description: {
			type: String,
			require: true
		},
		city: {
			type: String,
			require: true
		},
		address: {
			type: String,
			require: true
		},
		contactNo: {
			type: String,
			require: true
		},
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: true
		},
		updatedBy: {
			type: Types.ObjectId,
			ref: 'User'
		},
		rates: [
			{
				_id: false,
				occupancy: {
					type: String,
					require: true
				},
				reservationType: {
					type: String,
					require: true
				},
				amount: {
					type: Number,
					require: true
				}
			}
		]
	},
	{ timestamps: true }
);

export default model<IProperty>('Property', PropertySchema);
