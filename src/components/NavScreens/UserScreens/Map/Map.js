import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomNav from '../../../Navigation/BottomNav'
import HeaderSearch from '../Reusables/Header/HeaderSearch'
import { SIZES } from '../../../../constants/themes'
import MapScreen from './MapScreen'

const Map = ({navigation}) => {
  const [searchText,setSearchText]=useState("")
  const [query,setQuery]=useState(``)
  const demoAction=()=>{
    console.log("In map Activity!")
  }
  return (
    <View style={styles.view}>
      <HeaderSearch map={true} setSearchText={setSearchText} searchText={searchText} setQuery={setQuery} filterAction={demoAction}/>
      <MapScreen/> 
      <BottomNav navigation={navigation}/>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
    view:{
        width:'100%',
        height:'100%'
    },
    simpleText:{
        color:'black',
        fontSize:SIZES.medium,
    }
})