import { StyleSheet, Text, View,TextInput, TouchableOpacity, Image ,ScrollView} from 'react-native'
import React, { useState } from 'react'
import { images } from '../constants'
import { SIZES,COLORS } from '../constants/themes'
import { User } from '../declarations/User/index.js'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Fontisto'
import Icon3 from 'react-native-vector-icons/FontAwesome5'


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
    <ScrollView>
    <View style={styles.bottomSheet}>
      <View style={styles.titleCont}>
        <Text style={styles.title}>Edit Profile</Text>
        <Icon name='edit' size={25} color='black'/>
      </View>
      <View style={styles.imageCont}>
        <TouchableOpacity>
          <Image source={images.profile2} style={styles.img}/>
        </TouchableOpacity> 
        
        <Text style={styles.simpleText}>Edit Photo</Text>
      </View>
      <View style={styles.labelCont}>
      <Icon3 name='user-edit' size={15} color={'black'} style={{marginRight:6}}/>
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
      <Icon3 name='user-edit' size={15} color={'black'} style={{marginRight:6}}/>
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
      <Icon2 name='email' size={18} color={'black'} style={{marginRight:6}}/>
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
        <Icon name='idcard' size={18} color={'black'} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>Govt ID </Text>
      </View>
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
    <View style={styles.labelCont}>
        <Icon3 name='birthday-cake' size={15} color={'black'} style={{marginRight:6}}/>
        <Text style={styles.simpleText}>BirthDay</Text>
      </View>
      <TextInput 
        style={styles.inputs} 
        placeholder='BirthDay(dd/mm/yyyy)' 
        placeholderTextColor={COLORS.inputBorder}
        value={updatedUser?.dob}
        onChangeText={value=>{setUpdatedUser({...updatedUser,dob:value})}}
        />
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{update()}}>
        <Text style={styles.submitText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.submitBtn,{backgroundColor:'red'}]} onPress={()=>{setUpdatePage(false)}}>
        <Text style={styles.submitText}>cancel</Text>
      </TouchableOpacity>
      </View>
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
        paddingVertical:40
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
        marginBottom:5
      },
      iconPlus:{

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
        borderColor: COLORS.inputBorder,
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,
        height: 50,
        padding: 15,
        color: COLORS.textLightGrey,
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