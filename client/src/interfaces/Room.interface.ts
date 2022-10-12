import { IUser } from "./User.interface";

interface IRate {
  occupancy: string;
  reservationType: string;
  amount: number;
}

export interface IProperty {
  _id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  contactNo: string;
  createdBy: IUser;
  updatedBy: IUser;
  rates: IRate[];
}

export interface IRoom {
  _id: string;
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
