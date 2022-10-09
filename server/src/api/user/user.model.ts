import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '@/api/user/user.interface';

const UserSchema = new Schema(
	{
		fullname: {
			type: String,
			require: true
		},
		contactNo: {
			type: String,
			require: true
		},
		email: {
			type: String,
			require: true,
			unique: true,
			trim: true
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		password: {
			type: String,
			require: true
		}
	},
	{ timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next();

	const psw_hash = await bcrypt.hash(this.password, 10);
	this.password = psw_hash;
	next();
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
	return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);
