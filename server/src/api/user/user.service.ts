import UserModel from '@/api/user/user.model';
import token from '@/utils/token';
import { Schema } from 'mongoose';
import IUser from '@/api/user/user.interface';

class UserService {
	private user = UserModel;

	/**
	 * Register new User
	 */
	public async create(userObj: IUser): Promise<IUser> {
		try {
			const newUser = await this.user.create(userObj);
			return newUser;
		} catch (error) {
			throw new Error('Unable to create user');
		}
	}

	/**
	 * User Login
	 */
	public async login(email: string, password: string): Promise<Error | string> {
		try {
			const user_res = await this.user.findOne({ email });

			if (!user_res) {
				throw new Error('Invalid user.');
			}

			const isValidPswd = await user_res.isValidPassword(password);

			if (!isValidPswd) {
				throw new Error('Invalid user.');
			}

			return token.createToken(user_res);
		} catch (error) {
			throw new Error('Unable to login user');
		}
	}

	public async getUsers(): Promise<Error | IUser[]> {
		try {
			return await this.user.find({}).select('-password').exec();
		} catch (error) {
			throw new Error('Unable to login user');
		}
	}

	public async getUserById(userId: Schema.Types.ObjectId): Promise<Error | IUser> {
		try {
			const response = await this.user.findById(userId).select('-password').exec();
			if (!response) {
				throw new Error('User not found');
			}
			return response;
		} catch (error) {
			throw new Error('User not found');
		}
	}
}

export default UserService;
