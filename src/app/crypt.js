const crypto =require('isomorphic-webcrypto')
let extractable = false;
let keyUsages = ['sign', 'verify'];
export const main = async () => {
    crypto.ensureSecure()
    console.log(crypto)
    
    // let keyPair = await crypto.subtle.generateKey({
    //     name: 'ECDSA',
    //     namedCurve: 'P-256',
    // }, extractable, keyUsages)
    // console.log("Subtle",keyPair.publicKey);
    // let data = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    // console.log("data",data)
    // return keyPair
}
