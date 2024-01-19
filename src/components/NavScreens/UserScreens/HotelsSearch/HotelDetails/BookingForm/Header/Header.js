import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../../../../../../constants/themes'
import { images } from '../../../../../../../constants'

const Header = () => {
  return (
    <View style={styles.sec}>
      <Image style={styles.img} source={images.hotelImg1}/>
      <View style={styles.textCont}>
        <Text style={styles.title}>
            Charm Ville - Villa with Nature! FarmVilla n Hosur
        </Text>
        <Text style={styles.text}>
            4.92 • 432 reviews • Ubdu, Bai, Indonesia
        </Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'row',
        width:'88%',
        marginTop:40,
        alignItems:'center'
    },  
    img:{
        width:'37%',
        height:80,
        borderRadius:12,
        objectFit:'fill',
        marginRight:'3%',
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-between',
        width:'60%',
        height:70
    },
    title:{
        color:'black',
        fontSize:SIZES.medium-1,
        fontWeight:'600'
    },
    text:{
        color:'black',
        fontSize:SIZES.xSmall,
        fontWeight:'300'
    }
})