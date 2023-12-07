import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from './SearchBar'
import { COLORS,SIZES } from '../constants/themes'

const HeaderSearch = () => {
  return (
    <View style={styles.headerCont}>
      <SearchBar/>
    </View>
  )
}

export default HeaderSearch

const styles = StyleSheet.create({
    headerCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        backgroundColor:COLORS.darkPurple,
        paddingVertical:20,
        position:'absolute',
        top:0
    }
})