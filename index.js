/**
 * @format
 */
import 'react-native-polyfill-globals/auto';
import 'react-native-fetch-api';
import 'fast-text-encoding';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState,useRef } from 'react';
import Main from './src/components/NavScreens/UserScreens/HotelsSearch/Main';
import BottomNav from './src/components/Navigation/BottomNav';
import Profile from './src/app/Profile';
import  Store  from './src/redux/store';
import { Provider } from 'react-redux';
import HostHome from './src/components/NavScreens/HostScreens/HostHome/HostHome';
import MenuPage from './src/components/NavScreens/HostScreens/MenuPage/MenuPage';
import Listings from './src/components/NavScreens/HostScreens/Listings/Listings';
import AllChats from './src/components/NavScreens/HostScreens/ChatPage/AllChats/AllChats';
import UserDetailDemo from './src/components/NavScreens/UserScreens/Profile/UserDetailDemo';
import Map from './src/components/NavScreens/UserScreens/Map/Map';
import Reels from './src/components/NavScreens/UserScreens/Reels/Reels';
import { User } from './src/declarations/User';
import { hotel } from './src/declarations/hotel';
import { backend } from './src/declarations/backend';
import PolyfillCrypto from 'react-native-webview-crypto'
import {DelegationIdentity, Ed25519PublicKey, ECDSAKeyIdentity, DelegationChain} from "@dfinity/identity";
import {HttpAgent, toHex} from "@dfinity/agent";
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {View, Text, StyleSheet, TouchableOpacity, Image,Modal,Linking, Platform, Alert} from 'react-native';
import { createActor } from './src/declarations/backend';
import { createActor as createUserActor } from './src/declarations/User';
import { createActor as createHotelActor } from './src/declarations/hotel';
import { createActor as createBookingActor } from './src/declarations/booking';
import store from './src/redux/store';
import { setActor } from './src/redux/actor/actions';
import { setPrinciple } from './src/redux/principle/actions';
import { setUser } from './src/redux/users/actions';
import ChatContainer from './src/components/NavScreens/UserScreens/ChatPage/ChatContainer/ChatContainer';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['rentspace://'],
};

const RootComponent: React.FC = () => {

  const btmSheetLoginRef = useRef(null);
  const btmSheetFinishRef = useRef(null);

  const [middleKeyIdentity, setMiddleKeyIdentity] = useState('');
  const generateIdentity = async () => {
    let p = new Promise(async(resolve,reject)=>{
      await ECDSAKeyIdentity.generate({extractable: true})
      .then(async(res)=>{
        setMiddleKeyIdentity(res)
        console.log("generate key:",res)
        resolve(res)
      }
        )
      .catch((err)=>{
          console.log(err)
          reject(err)
          })
    })
    
   return p 
  };

  let resp;

  const handleLogin = async () => {
    await generateIdentity().then(async(res)=>{
      resp=res
    console.log("running handle login",res)
    try {
      const url = `http://127.0.0.1:4943/?canisterId=b77ix-eeaaa-aaaaa-qaada-cai&publicKey=${toHex(res.getPublicKey().toDer())}`;
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        Linking.addEventListener('url', handleDeepLink);
        await this.sleep(800);
      } else Linking.openURL(url);
    } catch (error) {console.log(error)}}).catch((err)=>{console.log(err)})
  };
  const handleDeepLink = async event => {
    let actor=backend
    const deepLink = event.url;
    const urlObject = new URL(deepLink);
    const delegation = urlObject.searchParams.get('delegation');

    const chain = DelegationChain.fromJSON(
      JSON.parse(decodeURIComponent(delegation)),
    );
    const middleIdentity = DelegationIdentity.fromDelegation(
      resp,
      chain,
    );
    const agent = new HttpAgent({identity: middleIdentity,fetchOptions: {
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
    host: 'http://127.0.0.1:4943',});
   
    actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
      agent,
    });
    let actorUser=createUserActor('be2us-64aaa-aaaaa-qaabq-cai',{agent})
    let actorHotel=createHotelActor('br5f7-7uaaa-aaaaa-qaaca-cai',{agent})
    let actorBooking=createBookingActor('by6od-j4aaa-aaaaa-qaadq-cai',{agent})

    store.dispatch(setActor({
      backendActor:actor,
      userActor:actorUser,
      hotelActor:actorHotel,
      bookingActor:actorBooking
    }))
    console.log("actor : ",actor)
    let whoami = await actor.whoami();
    store.dispatch(setPrinciple(whoami))
    console.log("user",whoami)
   

    await actorUser?.getUserInfo().then((res)=>{
      if(res[0]?.firstName!=null){
        store.dispatch(setUser(res[0]))
        btmSheetLoginRef.current.dismiss()
        alert(`welcome back ${res[0]?.firstName}!`)
        
      }else{
        alert('Now please follow the registeration process!')
        btmSheetLoginRef.current.dismiss()
        btmSheetFinishRef.current.present()
      }
    }).catch((err)=>console.error(err))
    // await AsyncStorage.setItem('user',JSON.stringify(middleIdentity))
    //   .then((res)=>console.log('data stored successfully',middleIdentity))
    //   .catch((err)=>console.log(err))
    //   alert(whoami);
      // getUserData()
  };

  return (
    <>
    <PolyfillCrypto/>
    <Provider store={Store}>
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen options={{headerShown:false}} name="Launch" component={Main} initialParams={{handleLogin,btmSheetLoginRef,btmSheetFinishRef
        }}/>
        <Stack.Screen options={{headerShown:false}} name='UserChat' component={ChatContainer} />
        <Stack.Screen options={{headerShown:false}} name='profile' component={UserDetailDemo} />
        <Stack.Screen options={{headerShown:false}} name='mapSearch' component={Map}/>
        <Stack.Screen options={{headerShown:false}} name='reels' component={Reels}/>
        <Stack.Screen options={{headerShown:false}} name='hostHome' component={HostHome}/>
        <Stack.Screen options={{headerShown:false}} name='hostMenu' component={MenuPage}/>
        <Stack.Screen options={{headerShown:false}} name='hostListing' component={Listings}/>
        <Stack.Screen options={{headerShown:false}} name='hostChat' component={AllChats}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
