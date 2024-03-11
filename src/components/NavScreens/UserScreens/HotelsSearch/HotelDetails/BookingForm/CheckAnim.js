import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'
import { images } from '../../../../../../constants'

const CheckAnim = () => {
  return (
    <View style={styles.page}>
        <Image source={images.check} style={styles.img}/>
    </View>
  )
}

export default CheckAnim

const styles = StyleSheet.create({
    page:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(128, 128, 128, 0.7)',
        height:'100%',
        width:'100%'
    },
    text:{
        fontSize:SIZES.large,
        color:COLORS.black,
        fontWeight:'500',
        textAlign:'center'
    },
    img:{
        width:200,
        height:200,
        marginVertical:10
    }
})