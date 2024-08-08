import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image ,ScrollView,Modal, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../../../../constants'
import { SIZES,COLORS } from '../../../../../constants/themes'
import { User } from '../../../../../declarations/User/index.js'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Fontisto'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import {Calendar} from 'react-native-calendars';
import { launchImageLibrary } from 'react-native-image-picker'
import { useSelector,useDispatch } from 'react-redux'
import { setUser } from '../../../../../redux/users/actions'
import { updatingUser } from '../../../../../redux/actor/actions'
import { Dialog,ALERT_TYPE } from 'react-native-alert-notification'
import DatePicker from 'react-native-date-picker'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../../../../firebaseConfig'

const UpdateProfile = ({setEditProfile}) => {

    const {user}=useSelector(state=>state.userReducer)
    const {actors}=useSelector(state=>state.actorReducer)
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(false)
    const [updatedUser,setUpdatedUser]=useState({
      ...user,
      userGovId:user?.userGovId=="nothing"||user?.userGovId==""?"Not Provided":user?.userGovId,
      userImage:"img"
    })
    const [userImg,setUserImg]=useState((user?.userImage==""||user?.userImage=="img")?images.sampleProfile2:{uri:user?.userImage})
    const [showCalendar, setShowCalendar] = useState(false);
    const [date,setDate]=useState(new Date())

    // upload function to upload image to firebase
  async function uploadImage(uri){
    return new Promise(async(resolve,reject)=>{
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, 'hotelImage/' + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob);
  
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        error => {
          console.log('Error => ', error);
          reject(new Error("Some error occured while trying to upload images"))
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            resolve(downloadURL)
          });
        },
      );
    })
    
  };

    const update=async()=>{
        setLoading(true)
        // console.log("1",newBase64)
        if(userImg.uri==undefined){
          setUpdatedUser({
            ...updatedUser,
            userRole:user?.userRole,
            isHost:user?.isHost,
            isVerified:false,
            agreementStatus:user?.agreementStatus,
            // userGovID:user?.userGovId,
          })
          console.log("2",updatedUser)
          
          await actors.userActor?.updateUserDetails({...updatedUser})
          .then(async(res)=>{
            if(res?.ok==undefined){
              setLoading(false)
              Dialog.show({
                type:ALERT_TYPE.DANGER,
                title:'Failed',
                textBody:`${res?.err} !`,
                button:'OK',
              })
              return
            }
            console.log("3")
              console.log("update res : ",res[0])
              // alert(`Your profile is updated ${updatedUser?.firstName} !`)
              Dialog.show({
                type:ALERT_TYPE.SUCCESS,
                title:'SUCCESS',
                textBody:`Your profile is updated ${updatedUser?.firstName} !`,
                button:'OK',
              })
              await actors.userActor?.getuserDetails()
              .then(async(res)=>{
                  setLoading(false)
                  dispatch(setUser(res?.ok))
                  console.log("response user",res?.ok)
                  setEditProfile(false)
              }).catch((err)=>{
                console.log(err)
                setLoading(false)
              })
          }).catch((err)=>{
            setLoading(false)
            console.log(err)
          })
          return
        }
        await uploadImage(userImg.uri).then(async(res)=>{
          console.log(res)
          setUpdatedUser({
            ...updatedUser,
            userRole:user?.userRole,
            isHost:user?.isHost,
            agreementStatus:user?.agreementStatus,
            userImage:res,
            userGovID:user?.userGovId,
          })
          console.log("2",updatedUser)
          
          await actors.userActor?.updateUserDetails({...updatedUser,userImage:res})
          .then(async(res)=>{
            if(res?.ok==undefined){
              setLoading(false)
              Dialog.show({
                type:ALERT_TYPE.DANGER,
                title:'Failed',
                textBody:`${res?.err} !`,
                button:'OK',
              })
              return
            }
            console.log("3")
              console.log("update res : ",res[0])
              // alert(`Your profile is updated ${updatedUser?.firstName} !`)
              Dialog.show({
                type:ALERT_TYPE.SUCCESS,
                title:'SUCCESS',
                textBody:`Your profile is updated ${updatedUser?.firstName} !`,
                button:'OK',
              })
              await actors.userActor?.getuserDetails()
              .then(async(res)=>{
                  setLoading(false)
                  dispatch(setUser(res?.ok))
                  console.log("response user",res?.ok)
                  setEditProfile(false)
              }).catch((err)=>{
                console.log(err)
                setLoading(false)
              })
          }).catch((err)=>{
            setLoading(false)
            console.log(err)
          })
        }).catch((err)=>{
          console.log(err)
        })
    }
    const chooseUserImg=async()=>{
      const result=await launchImageLibrary({mediaType:'image',includeBase64:true},
      (res)=>{
        //console.log(res)
        setUserImg(res.assets[0])
        console.log(res.assets[0].uri)
      })
      .catch((err)=>{console.log(err)})
      console.log(result.assets[0].uri)
      // setUpdatedUser({
      //   ...updatedUser,
      //   userImage:result.assets[0].uri
      // })
      setUserImg(result.assets[0])
      // console.log(result.assets[0].base64)
    }

  return (
    <ScrollView>
    <View style={styles.bottomSheet}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Edit Profile</Text>
        <Icon name='edit' size={25} color={COLORS.black}/>
      </View>
      <View style={styles.imageCont}>
        <TouchableOpacity onPress={()=>{
          chooseUserImg()
        }}>
          <Icon name='pluscircle' size={20} color={COLORS.black} style={styles.iconPlus}/>
          <Image source={userImg.uri==null?userImg:{uri:userImg.uri}} style={styles.img}/>
        </TouchableOpacity> 
        
        <Text style={styles.simpleText}>Edit Photo</Text>
      </View>
      <View style={styles.labelCont}>
      <Icon3 name='user-edit' size={15} color={COLORS.black} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>First Name</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        placeholder='First Name' 
        placeholderTextColor={COLORS.inputBorder} 
        value={updatedUser?.firstName}
        onChangeText={value=>{setUpdatedUser({...updatedUser,firstName:value})}}
    />
      <View style={styles.labelCont}>
      <Icon3 name='user-edit' size={15} color={COLORS.black} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Last Name</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        placeholder='Last Name' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.lastName}
        onChangeText={value=>{setUpdatedUser({...updatedUser,lastName:value})}}
    />
      <View style={styles.labelCont}>
      <Icon2 name='email' size={18} color={COLORS.black} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Email ID</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        placeholder='Email' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.userEmail}
        onChangeText={value=>{setUpdatedUser({...updatedUser,userEmail:value})}}
        />
      <View style={styles.labelCont}>
        <Icon name='idcard' size={18} color={COLORS.black} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Govt ID </Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        placeholder='Govt Id No.' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.userGovID}
        onChangeText={value=>{setUpdatedUser({...updatedUser,userGovID:value})}}
        />
      {/* <TextInput 
        style={styles.inputs} 
        placeholder='Profile image' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.userImage}
        onChangeText={value=>{setUpdatedUser({...updatedUser,userImage:value})}}
    /> */}
    <View style={styles.labelCont}>
        <Icon3 name='birthday-cake' size={15} color={COLORS.black} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Date of Birth</Text>
      </View>
        <TouchableOpacity style={styles.inputs} onPress={()=>{
            setShowCalendar(true)
        }}>
            <Text style={styles.dateText}>{updatedUser?.dob}</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.submitBtn} onPress={update}>
        <Text style={styles.submitText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{setEditProfile(false)}}>
        <Text style={styles.submitText}>cancel</Text>
      </TouchableOpacity>
      </View>
      <DatePicker
        modal
        mode='date'
        open={showCalendar}
        date={date}
        onConfirm={(date) => {
          console.log(date)
          setShowCalendar(false)
          setDate(date)
          setUpdatedUser({...updatedUser,dob:`${(date.getDate()<10)?"0"+date.getDate():date.getDate()}/${(date.getMonth()+1<10)?"0"+(date.getMonth()+1):date.getMonth()+1}/${date.getFullYear()}`});
        }}
        onCancel={() => {
          setShowCalendar(false)
        }}
        maximumDate={new Date()}
      />

      <ActivityIndicator animating={loading} size={40} style={styles.loader}/>
    </ScrollView>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
    bottomSheet: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingVertical:40,
        backgroundColor:COLORS.newBG
      },
      titleCont:{
        display:'flex',
        flexDirection:'row'
      },
      title:{
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: 'black',
        marginBottom:40,
        marginRight:6
      },
      imageCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginBottom:35
      },
      img:{
        width:80,
        height:80,
        marginBottom:5,
        borderRadius:50
      },
      iconPlus:{
        position:'absolute',
        right:5,
        zIndex:5,
        bottom:5,
        backgroundColor:'white',
        borderRadius:10
      },
      labelCont:{
        display:'flex',
        flexDirection:'row',
        marginBottom:4,
        width:'80%',
        justifyContent:'flex-start',
        alignContent:'center'
      },
      simpleText:{
        fontSize:SIZES.preMedium,
        color:'black',

      },
      inputs:{
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,
        height: 50,
        padding: 15,
        color: COLORS.black,
        fontSize: SIZES.preMedium,
      },
      submitBtn:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: COLORS.black,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 80,
        marginTop: 10,
      },
      submitText:{
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.medium,
      },
      dateText:{
        color: COLORS.black,
        fontSize: SIZES.preMedium,
      },
      calendar: {
        marginHorizontal: 35,
        borderRadius: 10,
        elevation: 2,
        marginTop: '60%',
        borderWidth: 1,
      },
      loader:{
        position:'absolute',
        top:'45%',
        left:'45%'
      }
})