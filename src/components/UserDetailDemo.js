import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/themes'

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
    </View>
  )
}

export default UserDetailDemo

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    title:{
        fontSize:SIZES.largeMed,
        color:'black',
        textAlign:'center'
    },
    simpleInfo:{
        color:'black',
        fontSize:SIZES.medium,
        textAlign:'center'
    }
})