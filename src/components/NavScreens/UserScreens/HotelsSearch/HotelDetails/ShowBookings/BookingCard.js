import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'

const BookingCard = ({item}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item?.hotel?.hotelTitle}</Text>
    </View>
  )
}

export default BookingCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        borderColor:COLORS.hostTitle,
        borderWidth:1,
        width:'90%',
        marginLeft:'5%',
        paddingHorizontal:20,
        paddingVertical:15,
        borderRadius:12
    },
    name:{
      color:COLORS.hostTitle,
      fontSize:SIZES.preMedium,
      fontWeight:'500'
    }
})