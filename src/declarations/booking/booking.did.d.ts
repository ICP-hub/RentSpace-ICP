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
export interface BookingDuration { 'bookedAt' : string, 'bookedTill' : string }
export type BookingId = string;
export interface BookingInfo {
  'paymentStatus' : boolean,
  'refundStatus' : boolean,
  'userId' : string,
  'date' : string,
  'hotelId' : string,
  'checkInDate' : string,
  'bookingDuration' : BookingDuration,
  'paymentId' : string,
  'cancelStatus' : boolean,
}
export interface CanisterHttpResponsePayload {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export type HotelId = string;
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponsePayload {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponsePayload,
}
export interface _anon_class_17_1 {
  'addOwner' : ActorMethod<[AdminId], string>,
  'bookHotel' : ActorMethod<
    [
      HotelId,
      BookingInfo,
      { 'icp' : null } |
        { 'solana' : string } |
        { 'ckbtc' : null } |
        { 'cketh' : null },
      bigint,
    ],
    string
  >,
  'getAllAdmin' : ActorMethod<[], Array<AdminId>>,
  'getBookingDetials' : ActorMethod<[string], [] | [BookingInfo]>,
  'getBookingFrequencyInYear' : ActorMethod<[string], [] | [AnnualData]>,
  'getBookingId' : ActorMethod<[], Array<string>>,
  'getNoOfPages' : ActorMethod<[bigint], bigint>,
  'get_icp_usd_exchange' : ActorMethod<[], string>,
  'gethotelXBookingId' : ActorMethod<[string], Array<string>>,
  'hotelBookingDuration' : ActorMethod<
    [HotelId],
    Array<[BookingId, BookingDuration]>
  >,
  'scanBooking' : ActorMethod<
    [bigint, bigint],
    Array<[BookingId, BookingInfo]>
  >,
  'transform' : ActorMethod<[TransformArgs], CanisterHttpResponsePayload>,
  'updateBookingStatus' : ActorMethod<[string, BookingInfo], undefined>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends _anon_class_17_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
