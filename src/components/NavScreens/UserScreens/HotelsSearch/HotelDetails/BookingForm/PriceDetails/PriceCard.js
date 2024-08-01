import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../../constants/themes'

const PriceCard = ({item}) => {
  return (
    // <View style={styles.card}>
    //   <Text style={styles.text}>{item?.label}</Text>
    //   <Text style={styles.text}>${item?.price}</Text>
    // </View>
    <>
    <Text style={styles.text}>{item.roomName}</Text>
    <View style={styles.card}>
      <Text style={styles.text}>{item?.totalRooms} x €{item?.roomPrice}</Text>
      <Text style={styles.text}>€{item?.bill}</Text>
    </View>
    </>
  )
}

export default PriceCard

const styles = StyleSheet.create({
    card:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5,
    },
    text:{
        fontSize:SIZES.preMedium-1,
        color:COLORS.black,
        fontWeight:'400',
        marginBottom:2
    },
})