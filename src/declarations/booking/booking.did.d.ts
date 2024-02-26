import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export interface anon_class_13_1 {
  'bookHotel' : ActorMethod<[HotelId, BookingInfo], undefined>,
  'getBookingDetials' : ActorMethod<[string], [] | [BookingInfo]>,
  'getBookingId' : ActorMethod<[], Array<string>>,
  'gethotelXBookingId' : ActorMethod<[string], Array<string>>,
  'scanBooking' : ActorMethod<
    [bigint, bigint],
    Array<[BookingId, BookingInfo]>
  >,
  'updateBookingStatus' : ActorMethod<[string, BookingInfo], undefined>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_13_1 {}
