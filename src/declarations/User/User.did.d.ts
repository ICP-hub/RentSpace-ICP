import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : UserInfo } |
  { 'err' : string };
export type Result_2 = { 'ok' : AnnualData } |
  { 'err' : string };
export interface User {
  'checkUserExist' : ActorMethod<[string], boolean>,
  'deleteUser' : ActorMethod<[], Result>,
  'getAnnualRegisterByYear' : ActorMethod<[string], Result_2>,
  'getUserByPrincipal' : ActorMethod<[Principal], Result_1>,
  'getuserDetails' : ActorMethod<[], Result_1>,
  'registerUser' : ActorMethod<[User__1], Result>,
  'updateUserDetails' : ActorMethod<[UserInfo], Result>,
  'whoami' : ActorMethod<[], string>,
}
export interface UserInfo {
  'dob' : string,
  'userRole' : string,
  'userEmail' : string,
  'userGovID' : string,
  'userID' : Principal,
  'createdAt' : string,
  'agreementStatus' : boolean,
  'govIDLink' : string,
  'isHost' : boolean,
  'userImage' : string,
  'isVerified' : boolean,
  'lastName' : string,
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
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
