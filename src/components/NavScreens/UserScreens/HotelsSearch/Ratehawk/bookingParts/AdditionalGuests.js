import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../../../../../constants/themes'


const AdditionalGuests = () => {
    const [guestNum,setGuestNum]=useState(1)
    const [guestArr,setGuestArr]=useState([{firstName:null,lastName:null}])
  return (
    <View style={styles.sec}>
      <Text style={styles.heading1}>Add Guests</Text>
      <Text style={styles.heading}>Number of extra guests</Text>      
      <TextInput
          value={guestNum}
          onChangeText={value=>{
            if(value==''){
                setGuestArr([])
                setGuestNum(0)
                return
            }
            console.log(value)
            setGuestNum(value)
            let arr=new Array(parseInt(value)).fill({
                firstname:null,
                lastname:null
            })
            setGuestArr(arr)
            console.log(arr,value)
        }}
          style={styles.smallINput}
          placeholderTextColor={COLORS.black}
          placeholder='Enter number of additional guests'
          keyboardType='numeric'
        />  
        {
            guestArr.map((item,index)=>(
                <>
                    <Text style={styles.heading}>Guest {index+1} details : </Text>
                <TextInput
                    value={guestArr[index].firstName}
                    onChangeText={value=>{
                        let newArr=[...guestArr]
                        newArr[index]={...guestArr[index],firstName:value}
                        setGuestArr([...newArr])
                    }}
                    style={styles.phoneCont}
                    placeholderTextColor={COLORS.black}
                    placeholder='Enter first name'
                />  
                
                <TextInput
                    value={guestArr[index].lastName}
                    onChangeText={value=>{
                        let newArr=[...guestArr]
                        newArr[index]={...guestArr[index],lastName:value}
                        setGuestArr([...guestArr])
                    }}
                    style={styles.phoneCont}
                    placeholderTextColor={COLORS.black}
                    placeholder='Enter last name'
                /> 
                </>
            ))
        }
    </View>
  )
}

export default AdditionalGuests

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'85%',
    },
    heading1:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.medium
    },
    heading:{
        color:COLORS.black,
        fontWeight:'800',
        fontSize:SIZES.preMedium
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
        height:30,
        marginVertical:10
      },
      smallINput:{
        color:COLORS.black,
        fontWeight:'400',
        fontSize:SIZES.small-1,
        width:'20%',
        borderRadius:4,
        borderColor:COLORS.textLightGrey,
        borderWidth:1,
        paddingVertical:5,
        paddingLeft:10,
        height:30,
        marginVertical:10
      }
})