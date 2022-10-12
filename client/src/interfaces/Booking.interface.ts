import { IProperty, IRoom } from "./Room.interface";
import { IUser } from "./User.interface";

export interface ICreateBooking {
  property: string | IProperty;
  room: string | IRoom;
  guestName: string;
  contactNo: string;
  reservedFrom: Date;
  reservedTo: Date;
  reservationType: "bed&breakfast" | "half-board" | "full-board";
  occupancy: "single" | "double" | "trible";
  planedArrival: Date;
  specialNotes?: string;
  parking?: boolean;
  payment: {
    paymentMethod: "card-online" | "card-location" | "cash";
    amount: number;
  };
}

export interface IBooking extends ICreateBooking {
  _id: string;
  checkinAt: Date;
  checkoutAt: Date;
  noOfStay: number;
  cancel: {
    canceledAt: Date;
    canceledBy: IUser;
    resoan: string;
    cancelFee: number;
  };
  status: string;
}
