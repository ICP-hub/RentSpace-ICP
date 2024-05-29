import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../../../constants/themes'
import Option from './Option'


const ChoosePayment = ({fullPayment,setFullPayment,price}) => {
  const items=[
    {
      fullPayment:true,
      amount:price,
      text:'Pay in Full',
      subText:'Pay the total'
    },
    {
      fullPayment:false,
      amount:price/2,
      text:'Pay part now, pay later',
      subText:`pay $${price/2} now pay $${price/2} later on Check-In`
    }
  ]
  return (
    <View style={styles.sec}>
      <Text style={styles.heading}>Choose how to pay</Text>
      <Option  item={items[0]} fullPayment={fullPayment} setFullPayment={setFullPayment}/>
      {/* <Option item={items[1]} fullPayment={fullPayment} setFullPayment={setFullPayment}/> */}
    </View>
  )
}

export default ChoosePayment

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
    }
})