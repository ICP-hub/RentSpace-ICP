import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface User {
  'checkUserExist' : ActorMethod<[], boolean>,
  'createUser' : ActorMethod<[User__1], undefined>,
  'getOwner' : ActorMethod<[], string>,
  'getUserInfo' : ActorMethod<[], [] | [UserInfo]>,
  'getUserInfoByPrincipal' : ActorMethod<[Principal], [] | [UserInfo]>,
  'scanUsers' : ActorMethod<[bigint, bigint], Array<[UserId, UserInfo]>>,
  'updateUserInfo' : ActorMethod<[UserInfo], [] | [UserInfo]>,
  'whoami' : ActorMethod<[], string>,
}
export type UserId = string;
export interface UserInfo {
  'dob' : string,
  'userType' : string,
  'userEmail' : string,
  'userGovId' : string,
  'createdAt' : string,
  'hostStatus' : boolean,
  'agreementStatus' : boolean,
  'userProfile' : string,
  'lastName' : string,
  'verificationStatus' : boolean,
  'firstName' : string,
}
export interface User__1 {
  'dob' : string,
  'userEmail' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE extends User {}
