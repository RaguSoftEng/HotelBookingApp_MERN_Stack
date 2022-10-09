import { Schema, model, Types } from 'mongoose';
import IReservation from '@/api/reservation/reservation.interface';

const ReservationSchema = new Schema(
	{
		property: {
			type: Types.ObjectId,
			ref: 'Property',
			required: true
		},
		room: {
			type: Types.ObjectId,
			ref: 'Room',
			required: true
		},
		reservedBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: true
		},
		reservedAt: {
			type: Date,
			default: Date.now
		},
		guestName: {
			type: String,
			require: true
		},
		contactNo: {
			type: String,
			require: true
		},
		reservedFrom: {
			type: Date,
			require: true
		},
		reservedTo: {
			type: Date,
			require: true
		},
		checkinAt: {
			type: Date
		},
		checkoutAt: {
			type: Date
		},
		planedArrival: {
			type: Date,
			require: true
		},
		noOfStay: {
			type: Number,
			require: true
		},
		reservationType: {
			type: String,
			require: true
		},
		occupancy: {
			type: String,
			required: true
		},
		specialNotes: {
			type: String
		},
		status: {
			type: String,
			required: true
		},
		parking: {
			type: Boolean
		},
		payment: {
			_id: false,
			paiedAt: {
				type: Date,
				default: Date.now
			},
			paymentMethod: {
				type: String,
				required: true
			},
			amount: {
				type: Number,
				require: true
			}
		},
		cancel: {
			type: new Schema({
				canceledAt: {
					type: Date,
					default: Date.now
				},
				canceledBy: {
					type: Types.ObjectId,
					ref: 'User',
					require: true
				},
				resoan: {
					type: String,
					required: true
				},
				cancelFee: {
					type: Number
				}
			})
		},
		updatedBy: {
			type: Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

export default model<IReservation>('Reservation', ReservationSchema);
