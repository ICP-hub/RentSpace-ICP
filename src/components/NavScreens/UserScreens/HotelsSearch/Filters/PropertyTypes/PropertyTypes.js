import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../ReUsables/Heading'
import PropertiesCard from './PropertiesCard'

const PropertyTypes = ({list,propertyType,setPropertyType}) => {
  return (
    <View style={styles.sec}>
      <Heading text={"Property Type"}/>
      <View style={styles.listCont}>
        {
          list.map((item,index)=>(
            <PropertiesCard item={item} key={index} propertyType={propertyType} setPropertyType={setPropertyType}/>
          ))
        }
      </View>
    </View>
  )
}

export default PropertyTypes

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%',
        marginVertical:20,
        marginLeft:'7.5%'
    },
    listCont:{
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      width:'90%',
      columnGap:10,
      rowGap:10,
      marginLeft:'5%',
      marginTop:30,
    }
})