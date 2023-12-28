import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomNav from '../../../Navigation/BottomNav'
import HeaderSearch from '../Reusables/Header/HeaderSearch'
import { COLORS,SIZES } from '../../../../constants/themes'

const Reels = ({navigation}) => {
  return (
    <View style={styles.view}>
      <HeaderSearch/>
      <Text style={styles.simpleText}>Reels</Text>
      <BottomNav navigation={navigation}/>
    </View>
  )
}

export default Reels

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