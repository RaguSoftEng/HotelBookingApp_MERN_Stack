import ReservationModel from '@/api/reservation/reservation.model';
import IReservation from '@/api/reservation/reservation.interface';

class ReservationService {
	private reservationModel = ReservationModel;

	public async create(reserveObj: IReservation): Promise<IReservation> {
		try {
			const reservation = await this.reservationModel.create(reserveObj);
			return reservation;
		} catch (error) {
			throw error;
		}
	}

	public async update(id: string, reserveObj: any): Promise<IReservation> {
		try {
			const reservation = await this.reservationModel
				.findByIdAndUpdate(id, reserveObj)
				.populate('reservedBy', 'fullname email')
				.exec();

			if (!reservation) {
				throw new Error('Unable to complete the action');
			}
			return reservation;
		} catch (error) {
			throw error;
		}
	}

	public async getReservations(filter: any): Promise<Error | IReservation[]> {
		try {
			return await this.reservationModel
				.find(filter)
				.populate('property', 'name description city address contactNo rates')
				.populate('room', 'roomNo description')
				.populate('reservedBy', 'fullname email contactNo')
				.populate('updatedBy', 'fullname email contactNo')
				.populate('cancel.canceledBy', 'fullname email contactNo')
				.exec();
		} catch (error) {
			throw error;
		}
	}

	public async getReservationsById(id: string): Promise<IReservation> {
		try {
			const reservation = await this.reservationModel
				.findById(id)
				.populate('property', 'name description city address contactNo rates')
				.populate('room', 'roomNo description')
				.populate('reservedBy', 'fullname email contactNo')
				.populate('updatedBy', 'fullname email contactNo')
				.populate('cancel.canceledBy', 'fullname email contactNo')
				.exec();
			if (!reservation) {
				throw new Error('Reservation not found');
			}
			return reservation;
		} catch (error) {
			throw error;
		}
	}
}

export default ReservationService;
