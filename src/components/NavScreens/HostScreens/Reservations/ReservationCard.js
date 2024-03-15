import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'

const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]

const ReservationCard = ({item}) => {

  const parseDate=(date)=>{
    let d=new Date(date)
    let day=d.getDate()
    let month=months[d.getMonth()]
    return `${day} ${month}`
  }

  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <Text style={styles.title}>CheckIn Date</Text>
        <Text style={styles.normalText}>{parseDate(item?.date)}</Text>
        <Text style={styles.title}>CheckIn</Text>
        <Text style={styles.normalText}>{item?.bookingDuration}</Text>
        <Text style={styles.title}>Customer Name</Text>
        <Text style={styles.normalText}>username</Text>
      </View>
    </View>
  )
}

export default ReservationCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:COLORS.royalPurple,
        width:'90%',
        // marginLeft:'5%',
        paddingVertical:20,
        borderRadius:12,
        marginBottom:20,
        elevation:10
    },
    textCont:{
        width:'85%',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        marginBottom:10
      },
      title:{
        fontSize:SIZES.preMedium,
        color:'white',
        fontWeight:'600',
        marginBottom:0
      },
      normalText:{
        fontSize:SIZES.small,
        color:'white',
        fontWeight:'300'
      },
})