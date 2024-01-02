import { idlFactory } from "../../../../../../../Backend/RentSpace_backend/wallet/legder.did";
import { Actor, HttpAgent } from "@dfinity/agent";

export const createTokenActor = (canisterId) => {
  let identity = window.identity;
  const agent = new HttpAgent({ identity,fetchOptions: {
    reactNative: {
      __nativeResponseType: 'base64',
    },
  },
  callOptions: {
    reactNative: {
      textStreaming: true,
    },
  },
  blsVerify: () => true,
  host: 'http://127.0.0.1:4943', });
  let tokenActor = Actor.createActor(idlFactory, {
    agent,
    blsVerify:()=>true,
    canisterId,
  });
  return tokenActor;
};