import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AdminId = string;
export interface AnnualData {
  'aug' : bigint,
  'dec' : bigint,
  'feb' : bigint,
  'jan' : bigint,
  'may' : bigint,
  'nov' : bigint,
  'oct' : bigint,
  'sep' : bigint,
  'march' : bigint,
  'april' : bigint,
  'july' : bigint,
  'june' : bigint,
}
export type BookingId = string;
export interface BookingInfo {
  'paymentStatus' : boolean,
  'refundStatus' : boolean,
  'userId' : string,
  'date' : string,
  'bookingDuration' : string,
  'paymentId' : string,
  'cancelStatus' : boolean,
}
export type HotelId = string;
export interface anon_class_14_1 {
  'addOwner' : ActorMethod<[AdminId], string>,
  'bookHotel' : ActorMethod<[HotelId, BookingInfo], undefined>,
  'getBookingDetials' : ActorMethod<[string], [] | [BookingInfo]>,
  'getBookingFrequencyInYear' : ActorMethod<[string], [] | [AnnualData]>,
  'getBookingId' : ActorMethod<[], Array<string>>,
  'getNoOfPages' : ActorMethod<[bigint], bigint>,
  'gethotelXBookingId' : ActorMethod<[string], Array<string>>,
  'scanBooking' : ActorMethod<
    [bigint, bigint],
    Array<[BookingId, BookingInfo]>
  >,
  'updateBookingStatus' : ActorMethod<[string, BookingInfo], undefined>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_14_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
