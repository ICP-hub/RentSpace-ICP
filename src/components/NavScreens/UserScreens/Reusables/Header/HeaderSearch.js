import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from './SearchBar'
import { COLORS,SIZES } from '../../../../../constants/themes'
import HeaderTitles from './HeaderTitles'

const HeaderSearch = ({filterAction,searchText,setSearchText,query,setQuery}) => {
  return (
    // <View style={map?[styles.headerCont]:[styles.headerCont,{paddingBottom:20}]}>
    <View style={[styles.headerCont,{paddingBottom:20}]}>
      <SearchBar query={query} setQuery={setQuery} filterAction={filterAction} searchText={searchText} setSearchText={setSearchText}/>
      {/* {
        map?<HeaderTitles/>:<></>
      } */}
      
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
        backgroundColor:COLORS.mainGrey,
        paddingTop:20,
    }
})