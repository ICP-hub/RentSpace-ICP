import { StyleSheet, Text, View,Image, Touchable,TouchableOpacity,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../../../constants'
import { COLORS, SIZES } from '../../../../constants/themes'
import HotelCard from './HotelDetails/cards/HotelCard'
import { useDispatch, useSelector } from 'react-redux'
import { setHotelList } from '../../../../redux/hotelList/actions'
import { setBookings } from '../../../../redux/UserBookings/actions'

const BookHotelPage = () => {

  const {user}=useSelector(state=>state.userReducer)
  const {hotels}=useSelector(state=>state.hotelsReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const dispatch=useDispatch()
  const [hotelsList,setHotelsList]=useState([])
  const [showReservation,setShowReservations]=useState(true)
  const sampleName='DreamLiner Hotel'
  const sampleDes='2972 Westheimer Rd. Santa Ana, Illinois 85486 '
  async function getReservations(){
    setShowReservations(true)
    await actors?.bookingActor.getBookingId().then((res)=>{
      let bookingList=[]
      res.map(async(r)=>{
        console.log("booking-->",r[0])
        await actors?.bookingActor.getBookingDetials(r[0]).then((resp)=>{
          
          bookingList.push(resp[0])
        }).catch((err)=>console.log(err))
      })
      dispatch(setBookings(bookingList))
      // console.log("bookings : ",res[0][0])
    }).catch((err)=>console.log(err))
  }
  async function getHotelDetails(){
    setHotelsList([])
    for(let i=0;i<hotels?.length;i++){
      await actors.hotelActor?.getHotel(hotels[i]).then((res)=>{
        setHotelsList(hotelsList=>[...hotelsList,{...res[0],id:hotels[i]}])
        console.log({...res[0],id:hotels[i]})
      })
    }
    dispatch(setHotelList(hotelsList))
  }
  useEffect(()=>{
    getHotelDetails()
  },[hotels])

  if(hotels?.length>0){
    return(
      <>
      <TouchableOpacity style={styles.btn} onPress={getReservations}>
        <Text style={styles.btnText}>Show my bookings</Text>
      </TouchableOpacity>
      <FlatList data={hotelsList} style={{marginBottom:80}}  renderItem={(item)=>(
        <HotelCard item={item.item}  />
      )}/>
      </>
    )
  }else{
  return (
    <>
    <HotelCard name={sampleName} des={sampleDes} rating={4} />
    
    </>
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
    },
    btn:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    },
    btnText:{
      color:COLORS.black,
      fontSize:SIZES.small,
      fontWeight:'bold',
      
    }
})