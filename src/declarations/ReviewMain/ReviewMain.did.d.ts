import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Canister = { 'hotel' : null } |
  { 'user' : null } |
  { 'booking' : null };
export interface ReviewParent {
  'autoScaleCanister' : ActorMethod<[string], string>,
  'createNewCanister' : ActorMethod<[string, Canister], [] | [string]>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
  'getPKs' : ActorMethod<[], Array<string>>,
}
export interface _SERVICE extends ReviewParent {}
