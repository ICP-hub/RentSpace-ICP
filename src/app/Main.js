import { View, Text,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, { useRef } from 'react'
import { COLORS ,SIZES} from '../constants/themes'
import {images} from '../constants'
import BottomNav from '../components/BottomNav'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheetLogin from '../components/BottomSheetLogin'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import BottomSheetFinishSignUp from '../components/BottomSheetFinishSignUp'
//import BottomSheet from '@gorhom/bottom-sheet'
// import { StatusBar } from 'expo-status-bar'



const Main = () => {

    

    const btmSheetLoginRef=useRef(null)
    const btmSheetFinishRef=useRef(null)
    const snapPoints=["94%"]
    const handlePresentModal=()=>{
        btmSheetLoginRef.current.present()
        //alert("first")
    }
    const handleLogin=()=>{
        btmSheetLoginRef.current.dismiss()
        btmSheetFinishRef.current.present()
        
    }
    const closeModal=()=>{
        btmSheetFinishRef.current.dismiss()
    }
  return (
    
    
    <GestureHandlerRootView style={{flex:1}}>
        {/* <BottomSheetLogin/> */}
    
    
    <BottomSheetModalProvider>
        {/* <StatusBar hidden={true}/> */}
        {/* <BottomSheetFinishSignUp/> */}
        <BottomNav handlePresentModal={handlePresentModal}/>
        <BottomSheetModal 
            ref={btmSheetLoginRef}
            index={0}
            snapPoints={snapPoints}
        >
            <BottomSheetLogin handleLogin={handleLogin}/>
        </BottomSheetModal>
        <BottomSheetModal
            ref={btmSheetFinishRef}
            index={0}
            snapPoints={snapPoints}
        >
            <BottomSheetFinishSignUp closeModal={closeModal}/>
        </BottomSheetModal> 
     </BottomSheetModalProvider>
     </GestureHandlerRootView>
   
    
  )
}

export default Main