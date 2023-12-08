import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/themes'

const UserDetailDemo = ({user}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.simpleInfo}>Name : {user?.firstName +" "+ user?.lastName}</Text>
      <Text style={styles.simpleInfo}>DOB :  {user?.dob}</Text>
      <Text style={styles.simpleInfo}>hostStatus {user?.hostStatus?"Lender":"User"}</Text>
      <Text style={styles.simpleInfo}>Email : {user?.userEmail}</Text>
      <Text style={styles.simpleInfo}>Type :  {user?.userType}</Text>
      <Text style={styles.simpleInfo}>Verified : {user?.verificationStatus?"Yes":"No"}</Text>
      <Text style={styles.simpleInfo}>Id : {user?.userId}</Text>
      <Text style={styles.simpleInfo}>Govt Id : {user?.userGovId?"Something":"Not Provided"}</Text>
      <TouchableOpacity style={[styles.bookHotelBtn,{backgroundColor:(user?.verificationStatus)?'green':'red'}]} >
        <Text style={styles.btnText}>Book Hotel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateBtn}>
        <Text style={styles.updateBtn}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserDetailDemo

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%'
    },
    title:{
        fontSize:SIZES.large,
        color:'black',
        textAlign:'center',
        marginBottom:30
    },
    simpleInfo:{
        color:'black',
        fontSize:SIZES.largeMed,
        textAlign:'center'
    },
    bookHotelBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'50%',
        marginVertical:30,
        borderRadius:20,
        paddingVertical:10
    },
    updateBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'50%',
        backgroundColor:COLORS.lightPurple,
        borderRadius:20,
        paddingVertical:10
    },
    btnText:{
        fontSize:SIZES.medium,
        color:COLORS.darkPurple
    }
})