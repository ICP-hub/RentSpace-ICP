import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type HotelId = string;
export interface Review {
  'createReview' : ActorMethod<[string, Review__1], undefined>,
  'getHotelId' : ActorMethod<[], Array<ReviewId>>,
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
