import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import PhotoBtn from './PhotoBtn'
import Icon from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux'
import { setListing } from '../../../../redux/NewListing/actions'
import { launchImageLibrary } from 'react-native-image-picker'
import { setFiles } from '../../../../redux/files/actions'

const AddPhotos = ({setHostModal,pos}) => {
  const [images,setImages]=useState("img2")
  const [hotelImgs,setHotelImgs]=useState(null)
  const {listing} = useSelector(state=>state.listingReducer)
  const dispatch=useDispatch()
  const [video,setVideo]=useState(null)
  const checkEmpty=()=>{
    console.log(video,hotelImgs)
    if(hotelImgs==null){
      alert("Please add atleast one image")
      console.log("no images")
      return false
    }
    else if(video==null){
      alert("Please add a Video")
      console.log("no video")
      return false
    }
    else{
      console.log(video,...hotelImgs)
      dispatch(setFiles([video,...hotelImgs]))
      dispatch(setListing({...listing,hotelImage:images}))
      return true
    }
  }
  const chooseUserImg=async()=>{
    const result=await launchImageLibrary({selectionLimit:5,mediaType:'image',includeBase64:false},
    (res)=>{
      //console.log(res)
      setHotelImgs(res.assets)
    })
    .catch((err)=>{console.log(err)})
    console.log(result)
  }
  const chooseVideo=async()=>{
    const result=await launchImageLibrary({mediaType:'video',videoQuality:'medium'},
      (res)=>{
        setVideo(res.assets[0])
      }
    ).catch((err)=>{
      console.log(err)
    })
    console.log(result)
  }
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <Text style={styles.title}>Add some photos of your house</Text>
      <Text style={styles.text}>
        Our comprehensive verification system checks details such as name, address, government ID and more to confirm the identity of guests who book on Rentspace.
      </Text>
      <PhotoBtn text={"Add photos"} icon={<Icon name='plus' size={25} color={COLORS.textLightGrey}/>} onClick={chooseUserImg}/>
      <PhotoBtn text={"Add a video"} icon={<Icon name='plus' size={25} color={COLORS.textLightGrey}/>} onClick={chooseVideo}/>
      <BottomBtn setHostModal={setHostModal} pos={pos} step={2} nextFunc={checkEmpty}/>
    </View>
  )
}

export default AddPhotos

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    title:{
        width:'88%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:10,
        marginLeft:'8%'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginLeft:'7.5%',
        marginBottom:10
    }
})