import { Image, StyleSheet, Text, TouchableOpacity, View ,ActivityIndicator, Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { images } from '../../../../constants'
import {useDispatch, useSelector} from 'react-redux'
import { setHotels } from '../../../../redux/hotels/actions'
import { setChatToken } from '../../../../redux/chatToken/actions'
import axios, { formToJSON } from 'axios'

const Congratulations = ({setHostModal,pos}) => {
  const [loading,setLoading]=useState(false)
  const [token,setToken]=useState("")
  const {listing}=useSelector(state=>state.listingReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const {authData}=useSelector(state=>state.authDataReducer)
  const dispatch=useDispatch()
  const baseUrl="https://rentspace.kaifoundry.com"
  const {files}=useSelector(state=>state.filesReducer)
  
  const ApiLogin=async()=>{
    console.log(`authData : ${authData}\n principal : ${authData.principal}\n publicKey : ${authData.publicKey}`)
    console.log({
        principal:authData.principal,
        publicKey:authData.publicKey
     })
     await axios.post(`${baseUrl}/api/v1/login/user`,{
        principal:authData.principal,
        publicKey:authData.publicKey
     }).then((res)=>{
        console.log('hotel login api : ',res.data.userToken)
        dispatch(setChatToken(res.data.userToken))
        setToken(res.data.userToken)
     })
    }
    useEffect(()=>{
      ApiLogin()
    },[])
    const ApiHotelFilters=async()=>{
      await axios.get(`${baseUrl}/api/v1/hotel/filters`).then((res)=>{
        console.log("hotel filters resp : ",res)
      }).catch((err)=>{console.log("hotel filters err : ",err)})
    }
    const ApiHotelCreate=async()=>{
      const data={
        hotelTitle:listing?.hotelTitle,
        hotelDes:listing?.hotelDes,
        hotelPrice:listing?.hotelPrice,
        hotelLocation:listing?.hotelLocation,
        longitude:parseFloat(listing?.hotelLocation.split('#')[0]),
        latitude:parseFloat(listing?.hotelLocation.split('#')[1])
      }
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("files",files)
      console.log(formData)
      await axios.post(`${baseUrl}/api/v1/hotel/register`,formData,{
        headers:{
          "x-principal":authData.principal,
          "x-private-token":token
        }
      }).then((res)=>{
        console.log("hotel creation api response : ",res)
      }).catch((err)=>{
        console.log("hotel creation api err : ",err)
      })
    }
  const createHotel=async()=>{
    console.log('create hotel')
    setLoading(true)
  await actors.hotelActor?.createHotel({...listing,hotelLocation:"Ludhiana"}).then(async(res)=>{
    setLoading(false)
    await actors.hotelActor?.getHotelId().then(async(res)=>{
      console.log(res)
      dispatch(setHotels(res))
      setHostModal(false)
      ApiHotelFilters()
      ApiHotelCreate()
    })

  }).catch((err)=>{
    setLoading(false)
    alert(err)
    console.log(err)})
  }
  return (
    <View style={styles.view}>
      <Image source={images.congrats} style={styles.img}/>  
      <Text style={styles.title}>Congratulations, Lucy</Text>
      <Text style={styles.text}>
        From one Host to another - welcome aboard.
        Thank you for sharing your home and helping to create incredible experiences for our guests.    
      </Text>
      <Text style={styles.subtitle}>
      Brian Chesky, CEO
      </Text>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={createHotel}>
            <Text style={styles.btnText}>Let’s get started</Text>
        </TouchableOpacity>
      </View>
      <ActivityIndicator size={40} animating={loading} style={styles.loader}/>
    </View>
  )
}

export default Congratulations

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'85%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:20,
        marginLeft:'7.5%'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginBottom:15,
        marginLeft:'7.5%'
    },
    subtitle:{
        fontSize:SIZES.xLarge,
        color:COLORS.black,
        fontWeight:'600',
        marginLeft:'7.5%'
    },
    img:{
        marginTop:60,
        marginBottom:25,
        marginLeft:'7.5%'
    },
    btnView:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        backgroundColor:'white',
        elevation:15,
        width:'100%',
        paddingVertical:20,
        position:'absolute',
        bottom:0
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'90%',
        paddingVertical:15,
        backgroundColor:COLORS.hostTitle,
        borderRadius:10
    },
    btnText:{
        fontSize:SIZES.medium,
        fontWeight:'bold',
        color:'white'
    },
    loader:{
      position:'absolute',
      top:'45%',
      left:'45%'
    }
})