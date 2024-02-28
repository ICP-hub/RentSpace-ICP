import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Canister = { 'review' : null } |
  { 'hotel' : null } |
  { 'user' : null } |
  { 'booking' : null };
export interface Database {
  'autoScaleBookingCanister' : ActorMethod<[string], string>,
  'autoScaleHotelCanister' : ActorMethod<[string], string>,
  'autoScaleReviewCanister' : ActorMethod<[string], string>,
  'autoScaleUserCanister' : ActorMethod<[string], string>,
  'createNewCanister' : ActorMethod<[string, Canister], [] | [string]>,
  'deleteCanister' : ActorMethod<[string], undefined>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
  'getOwner' : ActorMethod<[], string>,
  'getPKs' : ActorMethod<[], Array<string>>,
  'upgradeCanisterByPK' : ActorMethod<[string, Uint8Array | number[]], string>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends Database {}
