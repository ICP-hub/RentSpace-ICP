import {backend, createActor} from '../../src/declarations/backend/index';
import {AuthClient} from '@dfinity/auth-client';
import {HttpAgent} from '@dfinity/agent';
import {
  DelegationIdentity,
  Ed25519PublicKey,
  ECDSAKeyIdentity,
  DelegationChain,
} from '@dfinity/identity';

let actor = backend;
var url = new URL(window.location.href);

// Get the search parameters from the URL
var params = new URLSearchParams(url.search);

const loginButton = document.getElementById('login');
loginButton.onclick = async e => {
  e.preventDefault();

//   var middleKeyIdentity = await ECDSAKeyIdentity.generate({extractable: true});
  let publicKey = params.get('publicKey');
  let newIdentity = new ECDSAKeyIdentity(
    {publicKey: publicKey},
    publicKey,
    null,
  );
  let authClient = await AuthClient.create({identity: newIdentity});
  await new Promise(resolve => {
    authClient.login({
      identityProvider: process.env.DFX_NETWORK === "ic"
                  ? "https://identity.ic0.app"
                  : `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
      onSuccess: resolve,
    });
  });

  const identity = authClient.getIdentity();

    // At this point we're authenticated, and we can get the identity from the auth client.
    const middleIdentity = authClient.getIdentity();
    console.log("middleIdentity===>",middleIdentity);
    console.log("middleIdentity===>",JSON.stringify(middleIdentity));
    // Using the identity obtained from the auth client to create an agent to interact with the IC.
    const agent = new HttpAgent({identity:middleIdentity});
    // alert("agent 1",agent)
    actor = createActor("bkyz2-fmaaa-aaaaa-qaaaq-cai", {
        agent,
    });
    // let principalString = await actor.whoami();
    // console.log("principalString",principalString);
    // alert("agent 2"+middleIdentity.getPrincipal())

  const encodedDelegation = encodeURIComponent(delegationString);

//   const chain = DelegationChain.fromJSON(
//     JSON.parse(decodeURIComponent(encodedDelegation)),
//   );
//   const middleIdentity = DelegationIdentity.fromDelegation(
//     middleKeyIdentity,
//     chain,
//   );

//   const agent = new HttpAgent({identity: middleIdentity});

//   actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
//     agent,
//   });
//   console.log('actor', actor);
//   let whoami = await actor.whoami();
//   console.log(whoami);

  var url = `rentspace://auth?delegation=${encodedDelegation}`;
  window.open(url, '_self');

  return false;
};