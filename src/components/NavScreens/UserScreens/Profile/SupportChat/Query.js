import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS,SIZES } from '../../../../../constants/themes'
import { images } from '../../../../../constants'
import { useSelector } from 'react-redux'

const Query = ({item}) => {
  const {principle}=useSelector(state=>state.principleReducer)
  return (
    
    <View style={[styles.card,{justifyContent:'flex-end'}]}>
        <Text style={styles.text}>{item?.message}</Text>
    </View>
  )
}

export default Query

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