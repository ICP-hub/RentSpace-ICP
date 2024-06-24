import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../../constants/themes'
import Slider from "react-native-slider"

const Header = () => {
  const [slider,setSlider]=useState(7)
  return (
    <View style={styles.cont}>
    
      <Text style={styles.title}>You Could Earn</Text>
      {/* <Text style={styles.subTitle}>You Could Earn</Text> */}
      <View style={styles.priceCont}>
        <Text style={styles.price}>${slider*38}</Text>
      </View>
      <Text style={styles.darkLink}>{slider} {(slider==1)?"night":"nights"} at an estimated $38 a night</Text>
      <Slider 
            minimumValue={0}
            maximumValue={30}
            style={styles.slider}
            value={slider}
            step={1}
            onValueChange={value=>setSlider(value)}
            minimumTrackTintColor={COLORS.black}
            thumbTintColor={COLORS.black}
            maximumTrackTintColor={COLORS.white}
            trackStyle={styles.sliderTrack}
        />
      <Text style={styles.lightLink}>Learn how we estimated your earnings</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    cont:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
    },
    title:{
        color:COLORS.black,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:5,
        marginTop:10,
    },
    subTitle:{
      color:COLORS.black,
      fontSize:SIZES.large,
      fontWeight:'800',
      marginBottom:14
    },
    priceCont:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      borderColor:COLORS.black,
      borderWidth:1,
      borderRadius:10,
      width:'40%',
      paddingVertical:10
    },
    price:{
        color:COLORS.black,
        fontSize:SIZES.xxLarge,
        fontWeight:'bold',
    },
    darkLink:{
      fontSize:SIZES.preMedium,
      color:COLORS.black,
      textDecorationLine:'underline',
      marginTop:20,
      marginBottom:5,
      fontWeight:'bold'
    },
    lightLink:{
      fontSize:SIZES.small,
      color:COLORS.black,
      textDecorationLine:'underline',
      marginTop:5,
      marginBottom:10,
      fontWeight:'bold',
    },
    slider:{
        width:'90%',
    },
    sliderTrack:{

    }
})