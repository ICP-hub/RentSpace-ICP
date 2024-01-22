import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../../../../constants/themes'

const RequiredPhone = () => {
  const [phone,setPhone]=useState(null)
  const [add,setAdd]=useState(false)
  return (
    <View style={styles.sec}> 
      <Text style={styles.heading}>Required for your trip</Text>
      <View style={styles.cont}>
        <View style={styles.textCont}>
          <Text style={styles.heading}>Phone number</Text>
          <Text style={styles.smallText}>
            Add and confirm your phone number to get trip updates
          </Text>
          {
            add?
            <TextInput
              value={phone}
              onChangeText={value=>setPhone(value)}
              style={styles.phoneCont}
              placeholderTextColor={COLORS.black}
              placeholder='Enter your phone number'
              keyboardType='numeric'
            />  
            :
            <></>
          }
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={()=>setAdd(!add)}>
          <Text style={styles.addBtnText}>
            {
              add?
              "Remove":
              "Add"
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RequiredPhone

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%'
    },
    heading:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.preMedium
    },
    cont:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      alignItems:'flex-start'
    },
    textCont:{
      display:'flex',
      flexDirection:'column',
      width:'60%',
      alignItems:'flex-start',
      marginVertical:10
    },
    smallText:{
      color:COLORS.black,
      fontWeight:'400',
      fontSize:SIZES.small-1,
      width:'80%',
      marginVertical:5
    },
    addBtn:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      height:30,
      width:'25%',
      borderRadius:8,
      borderColor:COLORS.lighterGrey,
      borderWidth:1.5
    },
    addBtnText:{
      color:COLORS.textLightGrey,
      fontWeight:'500',
      fontSize:SIZES.medium-1
    },
    phoneCont:{
      color:COLORS.black,
      fontWeight:'400',
      fontSize:SIZES.small-1,
      width:'80%',
      borderRadius:4,
      borderColor:COLORS.textLightGrey,
      borderWidth:1,
      paddingVertical:5,
      paddingLeft:10,
      height:30
    }
})