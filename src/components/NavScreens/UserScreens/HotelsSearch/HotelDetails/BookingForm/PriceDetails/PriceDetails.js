import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../../../../constants/themes'
import PriceCard from './PriceCard'

const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
const PriceDetails = ({basePrice,nights,fullPayment,checkIn}) => {

    const [finalPrice,setFinalPrice]=useState(((basePrice)*0.15)+((basePrice)*0.10)+(basePrice))
    const prices=[
        {
            label:`$${basePrice} x 1`,
            price:basePrice
        },
        {
            label:'RentSpace service fee',
            price:(basePrice)*0.15
        },
        {
            label:'Taxes',
            price:finalPrice*0.10
        }
    ]
  return (
    <View style={styles.sec}>
      <Text style={styles.title}>PriceDetails</Text>
      {
        prices.map((item,index)=>(
            <PriceCard item={item} key={index}/>
        ))
      }
      <View style={styles.line}/>
      <View style={styles.textCont}>
        <Text style={styles.heading}>Total(USD)</Text>
        <Text style={styles.heading}>${finalPrice}</Text>
      </View>
      
      <View style={styles.line}/>
      {
        fullPayment==true?
        <>
        <View style={styles.textCont}>
          <Text style={styles.heading}>Due now</Text>
          <Text style={styles.heading}>${finalPrice}</Text>
        </View>
        </>
        :
        <>
        <View style={styles.textCont}>
          <Text style={styles.heading}>Due now</Text>
          <Text style={styles.heading}>${finalPrice/2}</Text>
        </View>
        <View style={styles.textCont}>
          <Text style={styles.lightText}>
            Due on {checkIn.split("/")[0]} 
            {" "+months[parseInt(checkIn.split("/")[1])-1]}
          </Text>
          <Text style={styles.lightText}>${finalPrice/2}</Text>
        </View>
        </>
        }
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
    },
    title:{
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
    },
    textCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    lightText:{
        color:COLORS.black,
        fontWeight:'500',
        fontSize:SIZES.preMedium,
    }
})