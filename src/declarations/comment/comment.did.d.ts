import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AdminId = string;
export interface Comment {
  'parentCommentId' : string,
  'userId' : string,
  'createdAt' : string,
  'hotelId' : string,
  'comment' : string,
}
export type CommentId = string;
export type ErrorCode = { 'canister_error' : null } |
  { 'call_error' : { 'err_code' : number } } |
  { 'system_transient' : null } |
  { 'future' : number } |
  { 'canister_reject' : null } |
  { 'destination_invalid' : null } |
  { 'system_fatal' : null };
export type Result = { 'ok' : string } |
  { 'err' : [ErrorCode, string] };
export interface _anon_class_13_1 {
  'addOwner' : ActorMethod<[AdminId], string>,
  'createComment' : ActorMethod<[string, string, string], Result>,
  'getAllAdmin' : ActorMethod<[], Array<AdminId>>,
  'getComments' : ActorMethod<[string], Array<[CommentId, Comment]>>,
  'getSingleComments' : ActorMethod<[string, string], Comment>,
  'scanComment' : ActorMethod<
    [bigint, bigint],
    Array<[string, Array<[CommentId, Comment]>]>
  >,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends _anon_class_13_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
