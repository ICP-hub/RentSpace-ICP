import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../../../../constants/themes'
import PriceCard from './PriceCard'

const PriceDetails = ({basePrice,nights}) => {
    const [finalPrice,setFinalPrice]=useState(((basePrice*nights)*0.15)+((basePrice*nights)*0.10)+(basePrice*nights))
    const prices=[
        {
            label:`$${basePrice} x ${nights}`,
            price:basePrice*nights
        },
        {
            label:'RentSpace service fee',
            price:(basePrice*nights)*0.15
        },
        {
            label:'Taxes',
            price:finalPrice
        }
    ]
  return (
    <View style={styles.sec}>
      <Text style={styles.heading}>PriceDetails</Text>
      {
        prices.map((item,index)=>(
            <PriceCard item={item} key={index}/>
        ))
      }
      <View style={styles.line}/>
      <View style={styles.line}/>
    </View>
  )
}

export default PriceDetails

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
    line:{
        width:'100%',
        backgroundColor:COLORS.textLightGrey,
        height:0.5,
        opacity:0.5,
        marginVertical:15
    }
})