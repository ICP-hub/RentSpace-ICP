import { StyleSheet, Text, View,Image, Touchable,TouchableOpacity,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../constants'
import { COLORS, SIZES } from '../constants/themes'
import { hotel } from '../declarations/hotel/index.js'
// import { TouchableOpacity } from 'react-native-gesture-handler'

const BookHotelPage = ({setUpdatePage,hotels,user}) => {

  const [hotelList,setHotelList]=useState([])
  async function getHotelDetails(){
    setHotelList([])
    for(let i=0;i<hotels?.length;i++){
      await hotel.getHotel(hotels[i]).then((res)=>{
        setHotelList(hotelList=>[...hotelList,res[0]])
      })
    }
  }
  useEffect(()=>{
    console.log(hotels)
    getHotelDetails()
  },[hotels])

  if(hotels?.length>0){
    return(
      <FlatList data={hotelList} style={{marginBottom:80}}  renderItem={(item)=>(
        <View style={styles.hotelPage}>
        <View style={styles.lenderCont}>
          <Image style={styles.lenderImg} source={images.profileSample}/>
          <Text style={styles.lenderName}>{user?.firstName}</Text>
        </View>
        <Image style={styles.img} source={images.hotel}/>
        
      <View style={styles.descCont}>
      <Text style={styles.desc}>
        <Text style={styles.title}>{item.item.hotelTitle}</Text> {item.item.hotelDes}
        </Text>
        <TouchableOpacity style={styles.bookBtn} onPress={()=>{setUpdatePage(true)}}>
          <Text style={styles.bookTxt}>Book</Text>
        </TouchableOpacity>
      </View>
      </View>
      )}/>
    )
  }else{
  return (

    
    <View style={styles.hotelPage}>
      <View style={styles.lenderCont}>
        <Image style={styles.lenderImg} source={images.profileSample}/>
        <Text style={styles.lenderName}>John Doe</Text>
      </View>
      <Image style={styles.img} source={images.hotel}/>
      
    <View style={styles.descCont}>
    <Text style={styles.desc}>
      <Text style={styles.title}>Pennsylvania Inn Hotel</Text> offers a charming retreat in the heart of the Keystone State.
      </Text>
      <TouchableOpacity style={styles.bookBtn} onPress={()=>{setUpdatePage(true)}}>
        <Text style={styles.bookTxt}>Book</Text>
      </TouchableOpacity>
    </View>
    

    </View>
  )
  }
}

export default BookHotelPage

const styles = StyleSheet.create({
    lenderCont:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:20,
        marginBottom:10,
        backgroundColor:COLORS.lightPurple,
        paddingVertical:10,
        borderRadius:20,
        borderColor:'black',
        borderLeftWidth:5,
        borderBottomWidth:5
    },
    lenderImg:{
        width:50,
        height:50,
        borderRadius:25,
        marginRight:30,
        marginLeft:20
    },
    lenderName:{
        fontSize:SIZES.preMedium,
        color:'white'
    },
    hotelPage:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'98%',
        backgroundColor:COLORS.lightBorderPurple,
        paddingVertical:20,
        borderRadius:50,
        borderWidth:2,
        borderColor:COLORS.darkPurple,
        marginLeft:4,
        marginBottom:20
    },
    title:{
        fontSize:SIZES.preMedium,
        fontWeight:'bold',
        color:'black'
    },
    img:{
        width:'80%',
        height:240,
        borderRadius:30,
        marginBottom:10
    },
    desc:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        opacity:0.6,
        width:'80%'
    },
    bookBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:10
    },
    bookTxt:{
        fontWeight:'bold',
        color:'black',
        fontSize:SIZES.medium
    },
    descCont:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        alignItems:'center'
    }
})