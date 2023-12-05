import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useRef} from 'react';
import {COLORS, SIZES} from '../constants/themes';
import {images} from '../constants';
import BottomNav from '../components/BottomNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetLogin from '../components/BottomSheetLogin';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottomSheetFinishSignUp from '../components/BottomSheetFinishSignUp';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import BottomSheetCommunity from '../components/BottomSheetCommunity';
import BottomSheetNotification from '../components/BottomSheetNotification';
//import BottomSheet from '@gorhom/bottom-sheet'
// import { StatusBar } from 'expo-status-bar'

const Main = () => {
  const btmSheetLoginRef = useRef(null);
  const btmSheetFinishRef = useRef(null);
  const btmSheetCommRef=useRef(null)
  const btmSheetNotiRef=useRef(null)
  const snapPoints = ['94%'];
  const handlePresentModal = () => {
    btmSheetLoginRef.current.present();
    //alert("first")
  };
  const handleLogin = async () => {
    // btmSheetLoginRef.current.dismiss();
    // btmSheetFinishRef.current.present();
    try {
        const url = `http://127.0.0.1:4943/?canisterId=cinef-v4aaa-aaaaa-qaalq-cai`
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
              endExit: 'slide_out_right'
            },
            headers: {
              'my-custom-header': 'my custom header value'
            }
          })
          await this.sleep(800);
        }
        else Linking.openURL(url)
      } catch (error) {
      }
  };
  const closeModal = (valRef) => {
    valRef.current.dismiss();
  };
  const openFinishSignUp=()=>{
    btmSheetFinishRef.current.present()
  }
  const openComm=()=>{
    btmSheetCommRef.current.present()
  }
  const openNotiModal=()=>{
    btmSheetNotiRef.current.present()
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <BottomSheetLogin/> */}

      <BottomSheetModalProvider>
        {/* <StatusBar hidden={true}/> */}
        {/* <BottomSheetFinishSignUp/> */}
        <BottomNav handlePresentModal={handlePresentModal} openFinishSignUp={openFinishSignUp} openComm={openComm} openNotiModal={openNotiModal}/>
        <BottomSheetModal
          ref={btmSheetLoginRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetLogin handleLogin={handleLogin} />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetFinishRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetFinishSignUp closeModal={()=>{closeModal(btmSheetFinishRef)}} />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetCommRef}
          index={0}
          snapPoints={snapPoints}
          >
            <BottomSheetCommunity/>

        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetNotiRef}
          index={0}
          snapPoints={snapPoints}
          >
            <BottomSheetNotification/>

        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Main;
