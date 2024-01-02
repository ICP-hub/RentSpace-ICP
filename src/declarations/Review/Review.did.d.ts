import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AutoScalingCanisterSharedFunctionHook = ActorMethod<
  [string],
  string
>;
export interface Review {
  'createReview' : ActorMethod<[string, Review__1], undefined>,
  'getOwner' : ActorMethod<[], string>,
  'getPk' : ActorMethod<[], string>,
  'getReviewInfo' : ActorMethod<[], [] | [Review__1]>,
  'scanUsers' : ActorMethod<
    [string, string, bigint, [] | [boolean]],
    ScanReview
  >,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
  'updateReviewInfo' : ActorMethod<[string, Review__1], [] | [Review__1]>,
}
export interface Review__1 {
  'des' : string,
  'title' : string,
  'bookingId' : string,
  'createdAt' : string,
  'rating' : number,
}
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
  'sizeLimit' : ScalingLimitType,
}
export interface ScanReview {
  'review' : Array<Review__1>,
  'nextKey' : [] | [string],
}
export interface _SERVICE extends Review {}
