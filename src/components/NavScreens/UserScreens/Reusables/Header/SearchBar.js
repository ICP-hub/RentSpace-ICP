import { StyleSheet, Text, TouchableOpacity, View ,TextInput, Modal} from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../../../constants/themes'
import RateHawkBookingPage from '../../HotelsSearch/Ratehawk/RateHawkBookingPage'

const SearchBar = ({filterAction,searchText,setSearchText,query,setQuery}) => {
  const [showBookingForm,setShowBookingForm]=useState(false)
  return (
    <View style={styles.searchBarCont}>
      <View style={styles.searchBar}>
        <Icon name="search1" size={22} color={COLORS.black}/>
        <TextInput 
          value={searchText} 
          style={styles.input} 
          placeholder='Search Places' 
          placeholderTextColor={COLORS.black} 
          onChangeText={value=>{
            console.log(value)
            setSearchText(value.toString())
            // setQuery(`pageSize=${25}&name=${value.toString()}`)
            setQuery({...query,name:value.toString(),pageSize:25})
          }}
        />
      </View>
      <TouchableOpacity 
        style={styles.filterCont} 
        onPress={filterAction}
        // onPress={()=>setShowBookingForm(true)}  
      >
        <Icon name="filter" size={25} color={COLORS.black}/>
      </TouchableOpacity>
      <Modal visible={showBookingForm}>
        <RateHawkBookingPage showSelf={setShowBookingForm}/>
      </Modal>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBarCont:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        alignItems:'center',
    },
    searchBar:{
        display:'flex',
        flexDirection:'row',
        width:'83%',
        height:55,
        justifyContent:'flex-start',
        padding:15,
        backgroundColor:COLORS.white,
        borderRadius:60,
        borderColor:'white',
        borderWidth:2,
        alignItems:'center',
        marginRight:15,
    },
    input:{
        height:50,
        width:'90%',
        marginLeft:5,
        color:COLORS.black,
        fontSize:SIZES.small,
        padding:0,
        
    },
    filterCont:{
        height:40,
        width:40,
        backgroundColor:COLORS.white,
        borderColor:'white',
        borderRadius:25,
        borderWidth:2,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})