import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Comment {
  'createComment' : ActorMethod<[string, CommentInput], Result_1>,
  'getComments' : ActorMethod<[string], Result>,
  'whoami' : ActorMethod<[], string>,
}
export interface CommentInput { 'parentCommentId' : string, 'message' : string }
export interface Comment__1 {
  'commentId' : string,
  'parentCommentId' : string,
  'userId' : string,
  'createdAt' : string,
  'hotelId' : string,
  'comment' : string,
}
export type Result = { 'ok' : Array<Comment__1> } |
  { 'err' : string };
export type Result_1 = { 'ok' : Comment__1 } |
  { 'err' : string };
export interface _SERVICE extends Comment {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
