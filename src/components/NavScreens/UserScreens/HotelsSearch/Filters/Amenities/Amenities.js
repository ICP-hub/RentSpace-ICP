import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../ReUsables/Heading'
import AmenityCard from './AmenityCard'

const Amenities = ({amenitiesList,amenities,setAmenities,iconActive,setIconActive}) => {
  return (
    <View style={styles.sec}>
      <Heading text={"Amenities"}/>
      <View style={styles.itemCont}>
      {
        amenitiesList.map((item,index)=>{
          return(
              <AmenityCard item={item} key={index} amenities={amenities} setAmenities={setAmenities} iconActive={iconActive}
              setIconActive={setIconActive} />
          )
        })
      }
      </View>
    </View>
  )
}

export default Amenities

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%',
        marginVertical:20,
        marginLeft:'7.5%'
    },
    itemCont:{
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      width:'90%',
      columnGap:20,
      rowGap:10,
      marginLeft:'5%',
      marginTop:30,
    }
})