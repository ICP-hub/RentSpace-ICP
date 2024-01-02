import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AutoScalingCanisterSharedFunctionHook = ActorMethod<
  [string],
  string
>;
export interface Booking {
  'bookHotel' : ActorMethod<[string, BookingInfo], undefined>,
  'getBookingDetials' : ActorMethod<[string], [] | [BookingInfo]>,
  'getBookingId' : ActorMethod<[], [] | [[string, List]]>,
  'getPK' : ActorMethod<[], string>,
  'scanBooking' : ActorMethod<
    [string, string, bigint, [] | [boolean]],
    ScanBooking
  >,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
  'updateBookingStatus' : ActorMethod<[string, BookingInfo], undefined>,
}
export interface BookingInfo {
  'paymentStatus' : boolean,
  'refundStatus' : boolean,
  'userId' : string,
  'date' : string,
  'bookingDuration' : string,
  'paymentId' : string,
  'cancelStatus' : boolean,
}
export type List = [] | [[string, List]];
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
  'sizeLimit' : ScalingLimitType,
}
export interface ScanBooking {
  'bookings' : Array<BookingInfo>,
  'nextKey' : [] | [string],
}
export interface _SERVICE extends Booking {}
