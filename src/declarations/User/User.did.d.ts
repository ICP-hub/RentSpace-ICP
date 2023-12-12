import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AutoScalingCanisterSharedFunctionHook = ActorMethod<
  [string],
  string
>;
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
  'sizeLimit' : ScalingLimitType,
}
export interface ScanUser {
  'nextKey' : [] | [string],
  'users' : Array<UserInfo>,
}
export interface UserInfo {
  'dob' : string,
  'userType' : string,
  'userEmail' : string,
  'userGovId' : string,
  'hostStatus' : boolean,
  'userProfile' : string,
  'lastName' : string,
  'verificationStatus' : boolean,
  'firstName' : string,
}
export interface Users {
  'createUser' : ActorMethod<
    [string, string, string, string, string],
    undefined
  >,
  'getOwner' : ActorMethod<[], string>,
  'getPK' : ActorMethod<[], string>,
  'getUserInfo' : ActorMethod<[], [] | [UserInfo]>,
  'scanUsers' : ActorMethod<[string, string, bigint, [] | [boolean]], ScanUser>,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
  'updateUserInfo' : ActorMethod<[UserInfo], [] | [UserInfo]>,
}
export interface _SERVICE extends Users {}
