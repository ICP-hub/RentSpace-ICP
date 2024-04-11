import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BottomNav from '../../../Navigation/BottomNav'
import HeaderSearch from '../Reusables/Header/HeaderSearch'
import { COLORS,SIZES } from '../../../../constants/themes'
import ReelObject from './ReelObject'
import SplashScreen from 'react-native-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider,BottomSheetModal } from '@gorhom/bottom-sheet'
import Comments from './Comments/Comments'
import axios from 'axios'
import Geolocation from '@react-native-community/geolocation'

const Reels = ({navigation}) => {
  const btmSheetComments=useRef(null)
  const baseURL='https://rentspace.kaifoundry.com/api/v1'
  const [reels,setReels]=useState([])
  const openComments=()=>{
    btmSheetComments.current.present()
  }
  const closeComments=()=>{
    btmSheetComments.current.dismiss()
  }
  const fetchReels=async()=>{
    let lang;
    let lat;
    Geolocation.getCurrentPosition((loc)=>{
      lang=loc.coords.longitude,
      lat=loc.coords.latitude
    },(err)=>console.log(err))
    await axios.get(`${baseURL}/hotel/reel/video`,{headers:{
      latitude:`${lat}`,
      longitude:`${lang}`,
      radius:5
    }}).then((res)=>{
      console.log(res.data.hotels)
      setReels(res.data.hotels)
    }).catch((err)=>console.log(err))
  }
  useEffect(()=>{
    fetchReels()
    SplashScreen.hide()
  },[])
  return (
    <GestureHandlerRootView style={{height:'100%',width:'100%'}}>
      <BottomSheetModalProvider>
        <View style={styles.view}>
          {/* <HeaderSearch/> */}
          <ReelObject fetchReels={fetchReels} openComments={openComments} reels={reels}/>
          <BottomNav navigation={navigation}/>
          <BottomSheetModal 
            ref={btmSheetComments}
            index={0}
            snapPoints={["95%"]}>
               <Comments/>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default Reels

const styles = StyleSheet.create({
    view:{
        width:'100%',
        height:'100%',
        backgroundColor:COLORS.mainGrey
    },
    simpleText:{
        color:'black',
        fontSize:SIZES.medium,
    }
})