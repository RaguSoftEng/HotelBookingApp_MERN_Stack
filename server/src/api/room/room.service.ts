import RoomSchema from '@/api/room/room.model';
import IRoom from '@/api/room/room.interface';
import reservationModel from '@/api/reservation/reservation.model';

class RoomService {
	private roomschema = RoomSchema;
	private reserveschema = reservationModel;

	public async create(roomObj: IRoom): Promise<IRoom> {
		try {
			const room = await this.roomschema.create(roomObj);
			return room;
		} catch (error) {
			throw new Error('Unable to create room');
		}
	}

	public async update(id: string, roomObj: any): Promise<string | Error> {
		try {
			const room = await this.roomschema.findByIdAndUpdate(id, roomObj);
			if (!room) {
				throw new Error('Room not found');
			}
			return 'Room updated successfully';
		} catch (error) {
			throw error;
		}
	}

	public async getRooms(propertyId: string): Promise<Error | IRoom[]> {
		try {
			return await this.roomschema
				.find({ property: propertyId })
				.populate('property', 'name description city address contactNo rates')
				.populate('createdBy', 'fullname email contactNo')
				.populate('updatedBy', 'fullname email contactNo')
				.exec();
		} catch (error) {
			throw error;
		}
	}

	public async getAllRooms(): Promise<Error | IRoom[]> {
		try {
			return await this.roomschema
				.find({})
				.populate('property', 'name description city address contactNo rates')
				.populate('createdBy', 'fullname email contactNo')
				.populate('updatedBy', 'fullname email contactNo')
				.exec();
		} catch (error) {
			throw error;
		}
	}

	public async getRoomAvailablitiy(filter: any): Promise<boolean> {
		try {
			const bookings = await this.reserveschema.find({
				room: filter.id,
				status: { $in: ['reserved', 'checkedin'] },
				$and: [
					{
						reservedFrom: {
							$lte: filter.checkoutAt
						}
					},
					{
						reservedTo: {
							$gte: filter.checkinAt
						}
					}
				]
			});

			return !(bookings && bookings.length > 0);
		} catch (error) {
			throw error;
		}
	}

	public async getRoomById(roomid: string): Promise<Error | IRoom> {
		try {
			const response = await this.roomschema
				.findById(roomid)
				.populate('property', 'name description city address contactNo rates')
				.populate('createdBy', 'fullname email contactNo')
				.populate('updatedBy', 'fullname email contactNo')
				.exec();
			if (!response) {
				throw new Error('Propery not found');
			}
			return response;
		} catch (error) {
			throw error;
		}
	}

	public async getAvailabilities(filter: any): Promise<IRoom[]> {
		try {
			const bookings = await this.reserveschema.find({
				property: filter.id,
				status: { $in: ['reserved', 'checkedin'] },
				$and: [
					{
						reservedFrom: {
							$lte: filter.checkoutAt
						}
					},
					{
						reservedTo: {
							$gte: filter.checkinAt
						}
					}
				]
			});

			let ids: any[] = [];

			for (let i = 0; i < bookings.length; i++) {
				const element = bookings[i];
				ids.push(element.room);
			}

			const rooms = await this.roomschema.find({
				_id: {
					$nin: ids
				},
				property: filter.id
			}).populate('property', 'name description city address contactNo rates').exec();

			return rooms;
		} catch (error) {
			throw error;
		}
	}
}

export default RoomService;
