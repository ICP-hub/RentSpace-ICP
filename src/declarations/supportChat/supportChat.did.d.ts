import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Address {
  'region' : string,
  'country' : string,
  'city' : string,
  'postalCode' : string,
  'building' : string,
  'streetAddress' : string,
}
export type AdminId = string;
export type ErrorCode = { 'canister_error' : null } |
  { 'call_error' : { 'err_code' : number } } |
  { 'system_transient' : null } |
  { 'future' : number } |
  { 'canister_reject' : null } |
  { 'destination_invalid' : null } |
  { 'system_fatal' : null };
export interface Issue { 'message' : string, 'reply' : [] | [string] }
export type Result = { 'ok' : string } |
  { 'err' : [ErrorCode, string] };
export interface Ticket {
  'resolved' : boolean,
  'createdAt' : string,
  'address' : Address,
  'customerId' : string,
  'messageToAdmin' : string,
  'messageToHost' : string,
  'reason' : string,
}
export type TicketId = string;
export type UserIdentity = string;
export interface anon_class_12_1 {
  'addOwner' : ActorMethod<[AdminId], string>,
  'createIssue' : ActorMethod<[string], Result>,
  'getAllAdmin' : ActorMethod<[], Array<AdminId>>,
  'getAllUnResolvedIssue' : ActorMethod<[], Array<UserIdentity>>,
  'getAllUserIssue' : ActorMethod<[], Array<Issue>>,
  'getNoOfPages' : ActorMethod<[bigint], bigint>,
  'getResolvedIssue' : ActorMethod<[], Array<Issue>>,
  'getTicket' : ActorMethod<[], Array<[TicketId, Ticket]>>,
  'getUserTicketsByAdmin' : ActorMethod<[string], Array<[TicketId, Ticket]>>,
  'isAdmin' : ActorMethod<[], boolean>,
  'raiseNewTicket' : ActorMethod<[string, string, string, Address], Result>,
  'removeResolvedTicketRaised' : ActorMethod<[string, string], Result>,
  'resolveTicketRaised' : ActorMethod<[string, string], Result>,
  'resolveUserIssue' : ActorMethod<[UserIdentity, string], undefined>,
  'scanBooking' : ActorMethod<
    [bigint, bigint],
    Array<[string, Array<[TicketId, Ticket]>]>
  >,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_12_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
