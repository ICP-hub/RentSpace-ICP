import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { images } from '../constants'
import { SIZES,COLORS } from '../constants/themes'
import { User } from '../declarations/User/index.js'


const UpdateProfile = ({user,setUser,setUpdatePage}) => {

    const [updatedUser,setUpdatedUser]=useState(user)

    const update=async()=>{
        setUpdatedUser({...updatedUser,userType:user?.userType,hostStatus:false,verificationStatus:false,userId:user?.userId})
        await User.updateUserInfo(user?.userId,updatedUser).then(async(res)=>{
            alert(`Your profile is updated ${user?.firstName} !`)
            await User.getUserInfo(user?.userId).then((res)=>{
                setUser(res[0])
                console.log(res[0])
                setUpdatePage(false)
            })
        }).catch((err)=>{
            console.log(err)
        })
        console.log(updatedUser)
    }

  return (
    <View style={styles.bottomSheet}>
      <Text style={styles.title}>Update Your Profile</Text>
      <TextInput 
        style={styles.inputs} 
        placeholder='First Name' 
        placeholderTextColor={COLORS.inputBorder} 
        value={updatedUser?.firstName}
        onChangeText={value=>{setUpdatedUser({...updatedUser,firstName:value})}}
    />
      <TextInput 
        style={styles.inputs} 
        placeholder='Last Name' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.lastName}
        onChangeText={value=>{setUpdatedUser({...updatedUser,lastName:value})}}
    />
      <TextInput 
        style={styles.inputs} 
        placeholder='Email' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.userEmail}
        onChangeText={value=>{setUpdatedUser({...updatedUser,userEmail:value})}}
        />
      <TextInput 
        style={styles.inputs} 
        placeholder='Govt Id No.' 
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setUpdatedUser({...updatedUser,userGovId:value})}}
        />
      <TextInput 
        style={styles.inputs} 
        placeholder='Profile image' 
        placeholderTextColor={COLORS.inputBorder}
        onChangeText={value=>{setUpdatedUser({...updatedUser,userProfile:value})}}
    />
      <TextInput 
        style={styles.inputs} 
        placeholder='BirthDay(dd/mm/yyyy)' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.dob}
        onChangeText={value=>{setUpdatedUser({...updatedUser,dob:value})}}
        />
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{update()}}>
        <Text style={styles.submitText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.submitBtn,{backgroundColor:'red'}]} onPress={()=>{setUpdatePage(false)}}>
        <Text style={styles.submitText}>cancel</Text>
      </TouchableOpacity>
    </View>
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
        paddingVertical:40
      },
      title:{
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: 'black',
        marginBottom:40
      },
      inputs:{
        borderColor: COLORS.inputBorder,
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,
        height: 50,
        padding: 15,
        color: COLORS.inputBorder,
        fontSize: SIZES.preMedium,
        opacity: 0.5,
      },
      submitBtn:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: COLORS.inputBorder,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 80,
        marginTop: 10,
      },
      submitText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: SIZES.medium,
      }
})