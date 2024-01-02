import { Image, StyleSheet, Text, TouchableOpacity, View ,ActivityIndicator, Alert} from 'react-native'
import React,{useState} from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import { images } from '../../../../constants'
import {useDispatch, useSelector} from 'react-redux'
import { setHotels } from '../../../../redux/hotels/actions'

const Congratulations = ({setHostModal,pos}) => {
  const [loading,setLoading]=useState(false)
  const {listing}=useSelector(state=>state.listingReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const dispatch=useDispatch()
  const createHotel=async()=>{
    console.log('create hotel')
    setLoading(true)
  await actors.hotelActor?.createHotel(listing).then(async(res)=>{
    setLoading(false)
   
    await actors.hotelActor?.getHotelId().then(async(res)=>{
      console.log(res)
      dispatch(setHotels(res))
      setHostModal(false)
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