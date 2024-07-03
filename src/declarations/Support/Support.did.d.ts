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
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export type Result_2 = { 'ok' : Array<SupportMessage> } |
  { 'err' : string };
export type Result_3 = { 'ok' : Array<[string, Ticket]> } |
  { 'err' : string };
export type Result_4 = { 'ok' : Array<[Principal, Array<SupportMessage>]> } |
  { 'err' : string };
export type Result_5 = { 'ok' : Array<Principal> } |
  { 'err' : string };
export interface Support {
  'addAdmin' : ActorMethod<[Principal], Result>,
  'checkIsAdmin' : ActorMethod<[Principal], boolean>,
  'createTicket' : ActorMethod<[TicketInput, Address], Result>,
  'getAllAdmins' : ActorMethod<[], Result_5>,
  'getAllChats' : ActorMethod<[bigint, bigint], Result_4>,
  'getAllUnresolvedTickets' : ActorMethod<[bigint, bigint], Result_3>,
  'getAllUserMessages' : ActorMethod<[Principal], Result_2>,
  'getNoOfUnresolvedTickets' : ActorMethod<[], Result_1>,
  'getNumberOfChats' : ActorMethod<[], Result_1>,
  'resolveTicket' : ActorMethod<[string], Result>,
  'sendMessage' : ActorMethod<[string, [] | [Principal]], Result>,
  'whoami' : ActorMethod<[], string>,
}
export interface SupportMessage {
  'to' : [] | [Principal],
  'from' : Principal,
  'createdAt' : string,
  'message' : string,
  'byAdmin' : boolean,
}
export interface Ticket {
  'resolved' : boolean,
  'createdAt' : string,
  'ticketId' : string,
  'address' : Address,
  'customerId' : string,
  'messageToAdmin' : string,
  'messageToHost' : string,
  'reason' : string,
}
export interface TicketInput {
  'address' : Address,
  'messageToAdmin' : string,
  'messageToHost' : string,
  'reason' : string,
}
export interface _SERVICE extends Support {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
