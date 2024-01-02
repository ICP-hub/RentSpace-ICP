import { idlFactory } from "../../../../../../../Backend/RentSpace_backend/wallet/legder.did";
import { Actor, HttpAgent } from "@dfinity/agent";

export const createTokenActor = (canisterId) => {
  let identity = window.identity;
  const agent = new HttpAgent({ identity });
  let tokenActor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
  return tokenActor;
};