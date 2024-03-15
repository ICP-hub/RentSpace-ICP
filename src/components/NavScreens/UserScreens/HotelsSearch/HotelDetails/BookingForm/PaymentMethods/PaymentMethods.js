import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../../../../constants/themes'
import Option from './Option'
import Icon from 'react-native-vector-icons/FontAwesome5'

const PaymentMethods = ({setMethod,method,connect}) => {
  const methods=[
    {
      label:'ckEth',
      icon:<Icon name='ethereum' color={COLORS.textLightGrey} size={30}/>
    },
    {
      label:'applePay',
      icon:<Icon name='apple-pay' color={COLORS.textLightGrey} size={30}/>
    },
    {
      label:'ICP',
      icon:<Text style={{color:COLORS.textLightGrey,fontWeight:'bold',fontSize:SIZES.largeMed}}>ICP</Text>
    },
    {
      label:'gPay',
      icon:<Icon name='google-pay' color={COLORS.textLightGrey} size={26}/>
    },
    {
      label:'SOL',
      icon:<Text style={{color:COLORS.textLightGrey,fontWeight:'bold',fontSize:SIZES.largeMed}}>SOL</Text>
    },
    {
      label:'ckBTC',
      icon:<Icon name='btc' color={COLORS.textLightGrey} size={25}/>
    },
    {
      label:'creditCard',
      icon:<Icon name='credit-card' color={COLORS.textLightGrey} size={25}/>
    },
  ]
  // const [method,setMethod]=useState(methods[0]?.label)
  
  return (
    <View style={styles.sec}>
      <Text style={styles.heading}>Pay with</Text>
      <View style={styles.methodCont}>
        {
          methods.map((item,index)=>(
            <Option item={item} key={index} setMethod={setMethod} method={method} connect={connect}/>
          ))
        }
      </View>
    </View>
  )
}

export default PaymentMethods

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
        fontSize:SIZES.preMedium,
        marginBottom:15
    },
    methodCont:{
      width:'80%',
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',  
      columnGap:8,
      rowGap:8,
      paddingBottom:5
    }
})