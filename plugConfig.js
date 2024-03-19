import { Platform } from "react-native";
import Provider from '@funded-labs/plug-inpage-provider';

const WC_PROJECT_ID = 'e9aa1f1e47331b68d8fc7efcc44528aa' //YOUR_WALLET_CONNECT_PROJECT_ID
const isDev=true
const ua = Platform.OS.toLowerCase();
const isAndroid = ua=="android";
const isApple = ua=="ios";

export const check=()=>{
    console.log(ua)
    console.log(Platform.OS)
    console.log(isAndroid || isApple)
}

const isMobile = isAndroid || isApple;

if (isMobile) {
    console.log("executing provider expose wallet connect!")
  Provider.exposeProviderWithWalletConnect({ 
    window:globalThis, 
    wcProjectId: WC_PROJECT_ID,
    debug: isDev 
});
}

export const plug = window.ic?.plug;
