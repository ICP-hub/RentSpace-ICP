import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../../../../constants'
import { COLORS, SIZES } from '../../../../constants/themes'

const ListingCard = ({item}) => {
  let status=null
  switch(item?.status){
    case(0):
        status="Verification Required"
        break
    case(1):
        status="In Progress"
        break
    case(2):
        status="Verified"
  }
  return (
    <View style={styles.card}>
      <Text style={styles.status}>{status}</Text>
      <Image source={item?.image} style={styles.img}/>
      <View style={styles.textCont}>
        <Text style={styles.text}>{item?.name}</Text>
        <Text style={styles.text}>{item?.address}</Text>
      </View>
    </View>
  )
}

export default ListingCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingHorizontal:'4%',
        width:'90%',
        height:275,
        backgroundColor:'white',
        elevation:10,
        marginTop:15,
        borderRadius:12,
        paddingVertical:'5%',
        marginLeft:'5%'
    },
    img:{
        height:'87%',
        width:'100%',
        borderRadius:12,
        objectFit:'fill',
        marginBottom:5
    },
    status:{
        backgroundColor:'white',
        color:COLORS.black,
        fontSize:SIZES.xSmall-1,
        position:'absolute',
        marginLeft:'10%',
        top:'13%',
        zIndex:5,
        textAlign:'center',
        borderRadius:10,
        paddingVertical:2
    },
    text:{
        fontSize:SIZES.small,
        color:COLORS.black,
        fontWeight:'500',
        marginBottom:1,
        marginLeft:5
    },
})