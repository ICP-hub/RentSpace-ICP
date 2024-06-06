import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import Icon from'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Video from 'react-native-video'
import { images,reels } from '../../../../constants'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { BottomSheetModalProvider,BottomSheetModal } from '@gorhom/bottom-sheet'
import Comments from './Comments/Comments'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ReelCard from './ReelCard'



const ReelObject = ({fetchReels,openComments,reels,coord1}) => {
  const [refreshing,setRefreshing]=useState(false)
  const [reelIndex,setReelIndex]=useState(null)

  // console.log(coord1);

  const refresh=()=>{
    setRefreshing(true)
    fetchReels()
    setTimeout(()=>{
      setRefreshing(false)
    },2000)
  }

  const itemChanged=async(index)=>{
    // console.log(index.index)
    setReelIndex(index.index)
  }

    const sampleReels=[
        "https://storage.googleapis.com/rentspace/City%20Of%20Gold%20_%20Nirvair%20Pannu%20(Full%20Video)%20Deep%20Royce%20_%20Juke%20Dock.mp4-85c96ba9-0c41-4357-a7e5-afcbbbb45497.mp4",
        "https://storage.googleapis.com/rentspace/VID-20231213-WA0000.mp4-28945091-e871-4dc2-afc4-2dffe6517492.mp4",
        "https://storage.googleapis.com/rentspace/VID-20240107-WA0001.mp4-1d6abeee-3798-4ac6-9480-3aa9d0110e4a.mp4"
    ]
  return (
    
    <SwiperFlatList 
        style={{flex:1}}
        data={reels}
        renderItem={(item)=>(
            <ReelCard reelIndex={reelIndex} coord1={coord1} item={item.item} openComments={openComments}/>
        )}
        vertical={true}
        refreshing={refreshing}
        onRefresh={refresh}
        onChangeIndex={itemChanged}
        keyExtractor={(item)=>item.hotelId}
        />    
  )
}

export default ReelObject

const styles = StyleSheet.create({
    
})