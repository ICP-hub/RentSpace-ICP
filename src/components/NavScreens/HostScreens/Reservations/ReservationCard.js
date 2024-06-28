import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'

const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]

const ReservationCard = ({item}) => {

  const parseDMY = s => {
    let [d, m, y] = s.split(/\D/);
    return new Date(y, m-1, d);
  };

  const parseDate=(date)=>{
    let d=parseDMY(date)
    let day=d.getDate()
    let month=months[d.getMonth()]
    return `${day} ${month}`
  }
//yuku.app nfts rent
  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <View style={styles.textRow}>
          <Text style={styles.title}>CheckIn Date</Text>
          <Text style={styles.normalText}>{parseDate(item?.bookingData?.checkInDate)}</Text>
        </View>
        <View style={styles.textRow}>
          <Text style={styles.title}>Duration</Text>
          <Text style={styles.normalText}>1 days</Text>
          </View>
        <View style={styles.textRow}>
          <Text style={styles.title}>Customer Name</Text>
          <Text style={styles.normalText}>{item?.customerData?.firstName}</Text>
        </View>
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
        width:Dimensions.get("window").width*0.8,
        // marginLeft:'5%',
        paddingVertical:20,
        borderRadius:12,
        marginBottom:20,
        elevation:10,
        maxHeight:140,
        marginRight:20
    },
    textCont:{
        width:'85%',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        marginBottom:10
      },
      textRow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        marginVertical:5
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
        fontWeight:'600'
      },
})