import {backend,createActor} from "../../src/declarations/backend/index";
import {AuthClient} from "@dfinity/auth-client";
import {HttpAgent} from "@dfinity/agent";
import {DelegationIdentity, Ed25519PublicKey, ECDSAKeyIdentity, DelegationChain} from "@dfinity/identity";

function fromHexString(hexString) {
    var _a;
    return new Uint8Array(((_a = hexString.match(/.{1,2}/g)) !== null && _a !== void 0 ? _a : []).map(byte => parseInt(byte, 16))).buffer;
}


// let appPublicKey;

// var url = window.location.href;
// var publicKeyIndex = url.indexOf("sessionkey=");
// if (publicKeyIndex !== -1) {
//     // Parse the public key.
//     var publicKeyString = url.substring(publicKeyIndex + "sessionkey=".length);
//     appPublicKey = Ed25519PublicKey.fromDer(fromHexString(publicKeyString));
// }

// let delegationChain;
let actor = backend;
// window.actor = actor;

const loginButton = document.getElementById("login");
loginButton.onclick = async (e) => {
    e.preventDefault();
    // console.log("actor ==>",actor)
    // let principalString2 = await actor.whoami();
    // console.log("principalString",principalString2);

    // Create an auth client.
    var middleKeyIdentity = await ECDSAKeyIdentity.generate();
    let authClient = await AuthClient.create({
        identity: middleKeyIdentity,
    });

    // Start the login process and wait for it to finish.
    await new Promise((resolve) => {
        authClient.login({
            identityProvider: "https://identity.ic0.app/#authorize",
            onSuccess: resolve,
        });
    });

    // At this point we're authenticated, and we can get the identity from the auth client.
    const middleIdentity = authClient.getIdentity();
    console.log("middleIdentity===>",middleIdentity);
    console.log("middleIdentity===>",JSON.stringify(middleIdentity));
    // Using the identity obtained from the auth client to create an agent to interact with the IC.
    const agent = new HttpAgent({middleIdentity});
    // alert("agent 1",agent)
    actor = createActor("bkyz2-fmaaa-aaaaa-qaaaq-cai", {
        agent,
    });
    // let principalString = await actor.whoami();
    // console.log("principalString",principalString);
    // alert("agent 2"+middleIdentity.getPrincipal())

    var delegationString = JSON.stringify(
        middleIdentity.getDelegation().toJSON()
      );

      const encodedDelegation = encodeURIComponent(delegationString);

    const chain = DelegationChain.fromJSON(
        JSON.parse(decodeURIComponent(encodedDelegation))
      );
    const id = DelegationIdentity.fromDelegation(middleKeyIdentity, chain);
        console.log("id",id.getPrincipal().toString())
    let response = JSON.stringify(middleIdentity)
    alert(response.slice(-20))
    
    var url = `rentspace://auth?${encodeURIComponent(response)}`;
    window.open(url, "_self");

    var url = "rentspace://auth?";
    window.open(url, "_self");

    // Create another delegation with the app public key, then we have two delegations on the chain.
    // if (appPublicKey != null && middleIdentity instanceof DelegationIdentity ) {
    //     let middleToApp = await DelegationChain.create(
    //         middleKeyIdentity,
    //         appPublicKey,
    //         new Date(Date.now() + 15 * 60 * 1000),
    //         { previous: middleIdentity.getDelegation() },
    //     );

    //     delegationChain = middleToApp;
    // }

    return false;
};

// const openButton = document.getElementById("open");
// openButton.onclick = async (e) => {
//     e.preventDefault();

//     if (delegationChain == null){
//         console.log("Invalid delegation chain.");
//         return false;
//     }
    
//     var url = "rentspace://auth?";
//     var delegationString = JSON.stringify(delegationChain.toJSON());    
//     url = url + "delegation=" + encodeURIComponent(delegationString);
//     //console.log(url);

//     window.open(url, "_self");

//     return false;
// };