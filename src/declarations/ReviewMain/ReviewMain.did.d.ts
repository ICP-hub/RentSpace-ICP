import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface ReviewParent {
  'createNewCanister' : ActorMethod<[string], [] | [string]>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
  'getPKs' : ActorMethod<[], Array<string>>,
}
export interface _SERVICE extends ReviewParent {}
