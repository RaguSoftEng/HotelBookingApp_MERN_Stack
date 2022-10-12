export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  fullname: string;
  contactNo?: string;
}

export interface IUser extends IUserRegister {
  _id: string;
  isAdmin?: boolean;
}
