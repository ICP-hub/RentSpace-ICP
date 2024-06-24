import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<Review__1> } |
  { 'err' : string };
export type Result_2 = { 'ok' : string } |
  { 'err' : string };
export interface Review {
  'createReview' : ActorMethod<[string, ReviewInput], Result_2>,
  'getAllReviewsOnHotel' : ActorMethod<[string], Result_1>,
  'getHotelRating' : ActorMethod<[string], Result>,
  'whoami' : ActorMethod<[], string>,
}
export interface ReviewInput {
  'des' : string,
  'title' : string,
  'hotelId' : string,
  'rating' : number,
}
export interface Review__1 {
  'des' : string,
  'title' : string,
  'userId' : string,
  'createdAt' : string,
  'hotelId' : string,
  'rating' : number,
  'reviewId' : string,
}
export interface _SERVICE extends Review {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
