import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../../../constants/themes'
import { images } from '../../../../../../../constants'

const Header = ({hotelAddress,hotelname}) => {
  return (
    <View style={styles.sec}>
      <Image style={styles.img} source={images.hotelImg1}/>
      <View style={styles.textCont}>
        <Text style={styles.title}>
            {hotelname}
        </Text>
        <Text style={styles.text}>
            {hotelAddress}
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
        // alignItems:'center',
        // justifyContent:'space-between',
        // backgroundColor:'red',
        width:'60%',
        height:50
    },
    title:{
        color:COLORS.black,
        fontSize:SIZES.medium-1,
        fontWeight:'600'
    },
    text:{
        color:'black',
        fontSize:SIZES.xSmall,
        fontWeight:'300'
    }
})