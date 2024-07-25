import { ActivityIndicator, StyleSheet, Text, Image, TouchableOpacity, View, Modal, ScrollView } from 'react-native'
import  { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../../../constants/themes'
import { User } from '../../../../../declarations/User/index.js'
import {hotel} from '../../../../../declarations/hotel/index.js'
import { images } from '../../../../../constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import { useSelector,useDispatch } from 'react-redux'
import { setUser } from '../../../../../redux/users/actions'
import { setHotels } from '../../../../../redux/hotels/actions'
import HostWelcomeManager from '../../../../HostViewNew/HostWelcomeManager'
import Step1Manager from '../../../../HostViewNew/Step1Manager'
import Step2Manager from '../../../../HostViewNew/Step2Manager'
import Step3Manager from '../../../../HostViewNew/Step3Manager'
import BottomNav from '../../../../Navigation/BottomNav'
import UpdateProfile from './UpdateProfile'
import { useRoute } from '@react-navigation/native'
import { createActor as createUserActor  } from '../../../../../declarations/User'
import { createActor as createHotelActor } from '../../../../../declarations/hotel'
import { createActor } from '../../../../../declarations/backend'
import { setActor } from '../../../../../redux/actor/actions'
import MainProfile from '../MainProfile/MainProfile'
import { Dialog,ALERT_TYPE } from 'react-native-alert-notification'

const UserDetailDemo = ({navigation,setShowDetails}) => {

  const {user}=useSelector(state=>state.userReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const dispatch=useDispatch()
  const [editProfile,setEditProfile]=useState(false)
  const [createHotel,setCreateHotel]=useState(false)
  const [noListing,setNoListing]=useState(false)
  const [loading,setLoading]=useState(false)
  const [newProfile,setNewProfile]=useState(false)

  const getHotelList=async()=>{
    await actors.hotelActor.getHotelId().then((res)=>{
      console.log(res)
      dispatch(setHotels(res))
    }).catch((err)=>{
        console.log(err)
        setNoListing(true)
        dispatch(setHotels([]))
    })
  }

  useEffect(()=>{
    console.log(user?.userImage)
    // getHotelList()
  },[])

  const makeHost=async()=>{
    setLoading(true)
    console.log("You are host now")
    console.log({...user
      ,userRole:'Host',
      isHost:true,
      userImage:(user?.userImage)!=""?user?.userImage:"img",
      userGovID:((user?.userGovID==""||user?.userGovID==null)?"Not Provided":user?.userGovID)})
    await actors.userActor?.updateUserInfo({...user
      ,userRole:'Host',
      isHost:true,
      userImage:(user?.userImage)!=""?user?.userImage:"img",
      userGovID:((user?.userGovID==""||user?.userGovID==null)?"Not Provided":user?.userGovID
      
      ),
      agreementStatus:user?.agreementStatus
    }).then(async(res)=>{
      console.log(res)
      
      setLoading(false)
      // alert('You are a host now!')
      Dialog.show({
        type:ALERT_TYPE.SUCCESS,
        title:'SUCCESS',
        textBody:'You are a host now!',
        button:'OK',
      })
      setCreateHotel(true)
      await actors.userActor?.getUserInfo().then((res)=>{
        console.log(res[0])
        dispatch(setUser(res[0]))
      }).then(()=>{
        getHotelList()
      }).catch((err)=>{
        setLoading(false)
        // alert(err)
        Dialog.show({
          type:ALERT_TYPE.DANGER,
          title:'ERROR',
          textBody:err,
          button:'OK',
        })
        console.log(err)
      })

    }).catch((err)=>{
      setLoading(false)
      // alert(err)
      Dialog.show({
        type:ALERT_TYPE.DANGER,
        title:'ERROR',
        textBody:err,
        button:'OK',
      })
      console.log(err)
    })
  }

  return (

    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Image source={(user?.userImage==""||user?.userImage=="img")?images.sampleProfile2:{uri:user.userImage}} style={styles.profileLogo}/>
        <Text style={styles.headerName}>{user?.firstName +" "+ user?.lastName}</Text>
        <Text style={styles.headerText}>{user?.userEmail}</Text>
        <Text style={styles.headerText}>{user?.dob}</Text>
      </View>
      <View style={styles.dataCont}>
        <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
          <Icon3 name='manage-accounts' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>Host Status</Text>
          </View>
          <Text style={styles.valueText}>{user?.isHost?"True":"False"}</Text>
        </View>
        <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
            <Icon name='idcard' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>Government ID</Text>
          </View>
          <Text style={styles.valueText}>{(user?.userGovID==""||user?.userGovID=="Not Provided")?"Not Provided":user?.userGovID}</Text>
        </View>
        {/* <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
          <Icon3 name='verified' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>Verified</Text>
          </View>
          <Text style={styles.valueText}>{user?.verificationStatus?"Yes":"No"}</Text>
        </View> */}
        <View style={styles.dataRow}>
          <View style={styles.propertyCont}>
          <Icon2 name='user' size={20} color={'black'} style={{marginRight:8}}/>
            <Text style={styles.propertyText}>User Type</Text>
          </View>
          <Text style={styles.valueText}>{user?.userRole}</Text>
        </View>
        <ActivityIndicator size={40} animating={loading}/>
        
        <View style={styles.btnCont}>
          <TouchableOpacity style={styles.btn} onPress={()=>setEditProfile(true)}>
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={()=>setShowDetails(false)}>
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
          </View>
        
        {/* {
          (user?.userRole!='Host')? 
          <TouchableOpacity style={styles.updateBtn} onPress={()=>{
            makeHost()
            
          }}>
            <Text style={styles.btnText}>Make me a host</Text>
          </TouchableOpacity> :
          
          <TouchableOpacity style={styles.updateBtn} onPress={()=>navigation.navigate('hostHome')}>
          <Text style={styles.btnText}>Switch to host View</Text>
        </TouchableOpacity>
          
       
        } */}
        
          
      </View>
      {/*Modals */}
      <Modal animationType='slide' visible={editProfile} onRequestClose={()=>setEditProfile(false)}>
        <UpdateProfile setEditProfile={setEditProfile} />
      </Modal>
      {/* <BottomNav navigation={navigation}/> */}
    </ScrollView>
  )
}

export default UserDetailDemo

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
        backgroundColor:COLORS.mainGrey
    },
    header:{
      backgroundColor:COLORS.white,
      borderBottomRightRadius:20,
      borderBottomLeftRadius:20,
      height:'38%',
      width:'100%',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
    },
    title:{
        fontSize:SIZES.medium,
        color:COLORS.black,
        textAlign:'center',
        marginBottom:40,
        marginTop:18,
        fontWeight:'bold'
    },
    profileLogo:{
      height:110,
      width:110,
      borderRadius:75,
      borderColor:COLORS.black,
      borderWidth:2,
      marginBottom:10
    },
    headerName:{
      fontSize:SIZES.medium,
        color:COLORS.black,
        textAlign:'center',
        marginBottom:8,
    },
    headerText:{
      fontSize:SIZES.preMedium,
        color:COLORS.black,
        textAlign:'center',
        marginBottom:3,
        opacity:0.8
    },
    dataCont:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'80%'
    },
    dataRow:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      marginTop:32
    },
    propertyCont:{
      display:'flex',
      flexDirection:'row',
      alignItems:'flex-start'
    },
    propertyText:{
      fontSize:SIZES.preMedium,
      color:COLORS.black,
      fontWeight:'bold'
    },
    valueText:{
      fontSize:SIZES.preMedium,
      color:COLORS.black,
      opacity:0.6
    },
    btnCont:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      marginTop:60
    },
    btn:{
      width:'40%',
      borderRadius:10,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:COLORS.white,
      height:60,
      width:'40%',
    },
    updateBtn:{
      width:'80%',
      borderRadius:10,
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:COLORS.mainGrey,
      height:60,
      width:'100%',
      marginTop:20
    },
    btnText:{
        fontSize:SIZES.medium,
        color:COLORS.black,
        fontWeight:'bold'
    }
})