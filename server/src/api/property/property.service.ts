import PropertyModel from '@/api/property/property.model';
import IProperty from '@/api/property/property.interface';

class PropertyService {
	private property = PropertyModel;

	public async create(propertyObj: IProperty): Promise<IProperty> {
		try {
			const property = await this.property.create(propertyObj);
			return property;
		} catch (error) {
			throw new Error('Unable to create property');
		}
	}

	public async update(id: string, propertyObj: any): Promise<string | Error> {
		try {
			const property = await this.property.findByIdAndUpdate(id, propertyObj);
			if (!property) {
				throw new Error('Unable to update property');
			}
			return 'Property updated successfully';
		} catch (error) {
			throw error;
		}
	}

	public async getProperties(): Promise<Error | IProperty[]> {
		try {
			return await this.property
				.find({})
				.populate('createdBy', 'fullname email contactNo')
				.populate('updatedBy', 'fullname email contactNo')
				.exec();
		} catch (error) {
			throw error;
		}
	}

	public async getPropertyById(id: string): Promise<Error | IProperty> {
		try {
			const property = await this.property
				.findById(id)
				.populate('createdBy', 'fullname email contactNo')
				.populate('updatedBy', 'fullname email contactNo')
				.exec();
			if (!property) {
				throw new Error('Property not found');
			}
			return property;
		} catch (error) {
			throw error;
		}
	}
}

export default PropertyService;
