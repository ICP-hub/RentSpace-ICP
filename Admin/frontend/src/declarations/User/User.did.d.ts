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
export interface User {
  'addOwner' : ActorMethod<[AdminId], string>,
  'checkUserExist' : ActorMethod<[], boolean>,
  'createUser' : ActorMethod<[User__1], undefined>,
  'getAnnualRegisterByYear' : ActorMethod<[string], [] | [AnnualData]>,
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
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
