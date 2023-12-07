import {View, Text, StyleSheet, TouchableOpacity, Image,Modal} from 'react-native';
import React, {useEffect, useRef,useState} from 'react';
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
import SplashScreen from 'react-native-splash-screen';
import BottomSheetDetails from '../components/BottomSheetDetails';
import ModalSafety from '../components/ModalSafety';
import ModalCancellation from '../components/ModalCancellation';
import ModalHouseRules from '../components/ModalHouseRules';
import SearchBar from '../components/SearchBar';
import HeaderSearch from '../components/HeaderSearch';
//import BottomSheet from '@gorhom/bottom-sheet'
// import { StatusBar } from 'expo-status-bar'

const Main = () => {

  const [safetyModal,setSafetyModal]=useState(false)
  const [cancelModal,setCancelModal]=useState(false)
  const [rulesModal,setRulesModal]=useState(false)


  useEffect(()=>{
    SplashScreen.hide()
  },[])

  const btmSheetLoginRef = useRef(null);
  const btmSheetFinishRef = useRef(null);
  const btmSheetCommRef=useRef(null)
  const btmSheetNotiRef=useRef(null)
  const btmExtraDetailsRef=useRef(null)
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
  const openDetailsModal=()=>{
    btmExtraDetailsRef.current.present()
  }
  return (
    // Necessary for capturing touch gestures in the screen
    <GestureHandlerRootView style={{flex: 1,paddingTop:200}}>
      
      <BottomSheetModalProvider>

        {/* Modals Defined */}

        <Modal visible={safetyModal} animationType='fade'  >
          <ModalSafety setSafetyModal={setSafetyModal}/>
        </Modal>

        <Modal visible={cancelModal} animationType='fade' >
          <ModalCancellation setCancelModal={setCancelModal}/>
        </Modal>

        <Modal visible={rulesModal} animationType='fade' >
          <ModalHouseRules setRulesModal={setRulesModal}/>
        </Modal>
        {/* searchBar Top */}

        

        {/* navigation Bar */}
        <BottomNav 
          handlePresentModal={handlePresentModal} 
          openFinishSignUp={openFinishSignUp} 
          openComm={openComm} 
          openNotiModal={openNotiModal}
          openDetailsModal={openDetailsModal}
        />

        <HeaderSearch/>
        
        <TouchableOpacity style={styles.btn} onPress={()=>{setSafetyModal(true)}}>
          <Text style={styles.btnText}>
            Safety & Property
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>{setCancelModal(true)}}>
          <Text style={styles.btnText}>
            Cancellation Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>{setRulesModal(true)}}>
          <Text style={styles.btnText}>
            House Rules
          </Text>
        </TouchableOpacity>

        

        {/* BottomSheets */}
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
        <BottomSheetModal
          ref={btmExtraDetailsRef}
          index={0}
          snapPoints={snapPoints}
          >
            <BottomSheetDetails/>

        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Main;

const styles = StyleSheet.create({
  btn:{
    display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"white",
        borderRadius:10,
        height:50,
        paddingHorizontal:30,
        marginTop:20,
        borderWidth:1,
        borderColor:COLORS.inputBorder,

  },
  btnText:{
    color:COLORS.inputBorder,
        fontWeight:'bold',
        fontSize:SIZES.medium
  }
})