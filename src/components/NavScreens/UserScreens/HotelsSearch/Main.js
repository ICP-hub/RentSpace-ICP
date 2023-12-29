import {View, Text, StyleSheet, TouchableOpacity, Image,Modal,Linking, Platform, Alert} from 'react-native';
import React, {useEffect, useRef,useState} from 'react';
import {COLORS, SIZES} from '../../../../constants/themes';
import BottomNav from '../../../Navigation/BottomNav';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetLogin from '../../../BottomSheets/BottomSheetLogin';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import BottomSheetFinishSignUp from '../../../BottomSheets/BottomSheetFinishSignUp';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import BottomSheetCommunity from '../../../BottomSheets/BottomSheetCommunity';
import BottomSheetNotification from '../../../BottomSheets/BottomSheetNotification';
import SplashScreen from 'react-native-splash-screen';
import BottomSheetDetails from '../../../BottomSheets/BottomSheetDetails';
import ModalSafety from './HotelDetails/Modals/ModalSafety';
import ModalCancellation from './HotelDetails/Modals/ModalCancellation';
import ModalHouseRules from './HotelDetails/Modals/ModalHouseRules';
import HeaderSearch from '../Reusables/Header/HeaderSearch';
import BookHotelPage from './BookHotelPage';
import HotelCreationForm from '../Profile/Modals/HotelCreationForm';
import HotelDetailPage from './HotelDetails/HotelDetailPage';
import {DelegationIdentity, Ed25519PublicKey, ECDSAKeyIdentity, DelegationChain} from "@dfinity/identity";
import {HttpAgent, toHex} from "@dfinity/agent";
import { createActor,backend } from '../../../../declarations/backend';
import { createActor as createUserActor } from '../../../../declarations/User';
import { createActor as createHotelActor } from '../../../../declarations/hotel';
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../../../../redux/users/actions';
import { setPrinciple } from '../../../../redux/principle/actions';
import { setActor} from '../../../../redux/actor/actions'
import { useRoute } from '@react-navigation/native';
import { setAgent } from '../../../../redux/agent/actions';
global.Buffer = require('buffer').Buffer;

const Main = ({navigation}) => {

  const route=useRoute()
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.userReducer)
  const {hotels}=useSelector(state=>state.hotelsReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const {principle}=useSelector(state=>state.principleReducer)
  const {handleLogin,btmSheetFinishRef,btmSheetLoginRef}=route.params
  //States for managing modals
  const [safetyModal, setSafetyModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [hotelCreateForm, setHotelCreateForm] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    // getUserAgent()
    if(principle!=''){
      console.log(principle)
    }else{
      btmSheetLoginRef.current.present()
    }
    
    // generateIdentity();
  },[])
  useEffect(()=>{
    if(principle!=''){
      console.log(principle)
    }else{
      btmSheetLoginRef.current.present()
    }
    
  })
  //Refs for managing bottomsheets
  // const btmSheetLoginRef = useRef(null);
  // const btmSheetFinishRef = useRef(null);
  const btmSheetCommRef = useRef(null);
  const btmSheetNotiRef = useRef(null);
  const btmExtraDetailsRef = useRef(null);
  const btmUserDetailsRef = useRef(null);
  const snapPoints = ['94%'];
  const handlePresentModal = () => {
    btmSheetLoginRef.current.present();
  };

  const getUserData=async()=>{
    
    // console.log(actors)
    await actors.userActor?.getUserInfo().then((res)=>{
      if(res[0].firstName!=''){
        dispatch(setUser(res[0]))
        btmSheetLoginRef.current.dismiss()
        alert(`welcome back ${res[0].firstName}!`)
        
      }else{
        alert('Now please follow the registeration process!')
        btmSheetLoginRef.current.dismiss()
        btmSheetFinishRef.current.present()
      }
    }).catch((err)=>console.error(err))
    // await AsyncStorage.clear()
  }

  //methods for opening and closing bottomsheets
  const closeModal = valRef => {
    valRef.current.dismiss();
  };
  const openComm = () => {
    btmSheetCommRef.current.present();
  };
  const openNotiModal = () => {
    btmSheetNotiRef.current.present();
  };

  return (
    // Necessary for capturing touch gestures in the screen
    <GestureHandlerRootView style={styles.view}>
      <BottomSheetModalProvider>
        {/* Modals Defined */}

        <Modal visible={safetyModal} animationType="fade">
          <ModalSafety setSafetyModal={setSafetyModal} />
        </Modal>

        <Modal visible={cancelModal} animationType="fade">
          <ModalCancellation setCancelModal={setCancelModal} />
        </Modal>

        <Modal visible={rulesModal} animationType="fade">
          <ModalHouseRules setRulesModal={setRulesModal} />
        </Modal>
        <Modal visible={hotelCreateForm} animationType="slide">
          <HotelCreationForm setHotelCreateForm={setHotelCreateForm} />
        </Modal>
        

        {/* navigation Bar */}
        <BottomNav
          navigation={navigation}
        />

        {/* searchBar Top */}
        <HeaderSearch />

        {/* <UserDetailDemo user={user}/> */}
        <BookHotelPage
        />

        {/* BottomSheets */}
        <BottomSheetModal
          ref={btmSheetLoginRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          >
          <BottomSheetLogin handleLogin={handleLogin} />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetFinishRef}
          index={0}
          enablePanDownToClose={false}
          snapPoints={snapPoints}>
          <BottomSheetFinishSignUp
            openComm={openComm}
            closeModal={() => {
              closeModal(btmSheetFinishRef);
            }}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetCommRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetCommunity
            selfMod={btmSheetCommRef}
            openNotiModal={openNotiModal}
          />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmSheetNotiRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetNotification self={btmSheetNotiRef} />
        </BottomSheetModal>
        <BottomSheetModal
          ref={btmExtraDetailsRef}
          index={0}
          snapPoints={snapPoints}>
          <BottomSheetDetails />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Main;

const styles = StyleSheet.create({
  view:{
    width:'100%',
    height:'100%'
  }

});
