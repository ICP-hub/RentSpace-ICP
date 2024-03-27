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
  'hotelId' : string,
  'checkInDate' : string,
  'bookingDuration' : string,
  'paymentId' : string,
  'cancelStatus' : boolean,
}
export type HotelId = string;
export type Result_2 = { 'Ok' : bigint } |
  { 'Err' : TransferFromError };
export type TransferFromError = {
    'GenericError' : { 'message' : string, 'error_code' : bigint }
  } |
  { 'TemporarilyUnavailable' : null } |
  { 'InsufficientAllowance' : { 'allowance' : bigint } } |
  { 'BadBurn' : { 'min_burn_amount' : bigint } } |
  { 'Duplicate' : { 'duplicate_of' : bigint } } |
  { 'BadFee' : { 'expected_fee' : bigint } } |
  { 'CreatedInFuture' : { 'ledger_time' : bigint } } |
  { 'TooOld' : null } |
  { 'InsufficientFunds' : { 'balance' : bigint } };
export interface anon_class_13_1 {
  'addOwner' : ActorMethod<[AdminId], string>,
  'bookHotel' : ActorMethod<
    [HotelId, BookingInfo, { 'icp' : null } | { 'ckbtc' : null }, bigint],
    string
  >,
  'getAllAdmin' : ActorMethod<[], Array<AdminId>>,
  'getBookingDetials' : ActorMethod<[string], [] | [BookingInfo]>,
  'getBookingFrequencyInYear' : ActorMethod<[string], [] | [AnnualData]>,
  'getBookingId' : ActorMethod<[], Array<string>>,
  'getNoOfPages' : ActorMethod<[bigint], bigint>,
  'gethotelXBookingId' : ActorMethod<[string], Array<string>>,
  'icrc2_transferFrom' : ActorMethod<
    [{ 'icp' : null } | { 'ckbtc' : null }, Principal, Principal, bigint],
    Result_2
  >,
  'scanBooking' : ActorMethod<
    [bigint, bigint],
    Array<[BookingId, BookingInfo]>
  >,
  'updateBookingStatus' : ActorMethod<[string, BookingInfo], undefined>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_13_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
