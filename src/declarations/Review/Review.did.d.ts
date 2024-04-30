import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AdminId = string;
export type HotelId = string;
export interface Review {
  'addOwner' : ActorMethod<[AdminId], string>,
  'createReview' : ActorMethod<[string, Review__1], undefined>,
  'getAllAdmin' : ActorMethod<[], Array<AdminId>>,
  'getHotelId' : ActorMethod<[], Array<ReviewId>>,
  'getNoOfPages' : ActorMethod<[bigint], bigint>,
  'getReviewIdsFromHotelId' : ActorMethod<[HotelId], Array<ReviewId>>,
  'getReviewInfo' : ActorMethod<[string], [] | [Review__1]>,
  'scanReview' : ActorMethod<[bigint, bigint], Array<[ReviewId, Review__1]>>,
  'updateReviewInfo' : ActorMethod<[string, Review__1], [] | [Review__1]>,
  'whoami' : ActorMethod<[], string>,
}
export type ReviewId = string;
export interface Review__1 {
  'des' : string,
  'title' : string,
  'bookingId' : string,
  'createdAt' : string,
  'rating' : number,
}
export interface _SERVICE extends Review {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
