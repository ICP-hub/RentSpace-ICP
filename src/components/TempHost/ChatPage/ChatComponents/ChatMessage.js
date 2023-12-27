import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import { images } from '../../../../constants'

const ChatMessage = ({item}) => {
  return (
    
    <View style={[styles.card,(item?.self)?{justifyContent:'flex-end'}:{justifyContent:'flex-start'}]}>
      {
        (item?.self)?
        <>
          <Text style={styles.text}>{item?.message}</Text>
          <Image source={images.hotelImg1} style={styles.img}/>
        </>:
        <>
          <Image source={images.hotelImg1} style={styles.img}/>
          <Text style={styles.text}>{item?.message}</Text>
        </>
      }
      
      
      
    </View>
  )
}

export default ChatMessage

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        minWidth:'100%',
        marginVertical:15,
    },
    text:{
        fontSize:SIZES.small+2,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:10,
        backgroundColor:COLORS.hostTitle,
        color:'white',
        maxWidth:'90%'
    },
    img:{
        height:30,
        width:30,
        objectFit:'cover',
        borderRadius:20,
        marginRight:5
    }
})