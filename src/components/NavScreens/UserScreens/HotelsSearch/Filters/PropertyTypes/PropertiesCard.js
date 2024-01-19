import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const PropertiesCard = ({item,propertyType,setPropertyType}) => {
  return (
    <TouchableOpacity style={(propertyType==item?.name)?[styles.card,{borderBottomWidth:2}]:styles.card} onPress={()=>setPropertyType(item?.name)}>
      {
        item?.icon
      }
      <Text style={styles.text}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  )
}

export default PropertiesCard

const styles = StyleSheet.create({
  card:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    padding:2,
    borderRadius:4,
    borderBottomColor:COLORS.hostTitle,
    
  },
  text:{
    color:'black',
    fontSize:SIZES.small,
    marginTop:2
  }
})