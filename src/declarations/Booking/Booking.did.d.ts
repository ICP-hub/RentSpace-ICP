import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export interface Booking {
  'createBooking' : ActorMethod<[PaymentType, BookingInput, bigint], Result_3>,
  'getAllHotelBookings' : ActorMethod<[string], Result_2>,
  'getAllUserBookings' : ActorMethod<[], Result_2>,
  'getBookingDetails' : ActorMethod<[string], Result_1>,
  'getBookingFrequency' : ActorMethod<[string], Result>,
}
export interface BookingInfo {
  'paymentStatus' : boolean,
  'bookingId' : string,
  'refundStatus' : boolean,
  'userId' : string,
  'hotelId' : string,
  'checkInDate' : string,
  'bookingDuration' : bigint,
  'bookingDate' : string,
  'paymentId' : string,
  'checkOutDate' : string,
  'cancelStatus' : boolean,
}
export interface BookingInput {
  'hotelId' : string,
  'checkInDate' : string,
  'bookingDuration' : bigint,
  'checkOutDate' : string,
}
export type PaymentType = { 'icp' : { 'id' : bigint } } |
  { 'sol' : null } |
  { 'creditCard' : null } |
  { 'ckBTC' : { 'id' : bigint } } |
  { 'ckETH' : { 'id' : bigint } } |
  { 'paypal' : null };
export type Result = { 'ok' : AnnualData } |
  { 'err' : string };
export type Result_1 = { 'ok' : BookingInfo } |
  { 'err' : string };
export type Result_2 = { 'ok' : Array<BookingInfo> } |
  { 'err' : string };
export type Result_3 = { 'ok' : string } |
  { 'err' : string };
export interface _SERVICE extends Booking {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
