import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, SIZES } from '../../../../../../../constants/themes'

const BalanceScreen = ({self,paymentMethod,walletID,balance,receiver,total,transfer,tokenActor,userId,loading,cryptoPrice}) => {

  return (
    <View style={styles.modal}>
      <View style={styles.alert}>
        <Text style={styles.title}>
          {
            (balance>total)?
            "Confirm Transaction"
            :
            "Insufficient Balance"
          }
        </Text>
        <View style={styles.dataCont}>
          <View style={styles.dataContRow}>
            <Text style={styles.dataHead}>Payment Method</Text>
            <Text style={styles.dataText}>{paymentMethod}</Text>
          </View>
          <View style={styles.dataContRow}>
            <Text style={styles.dataHead}>Walled ID</Text>
            <Text style={styles.dataText}>{walletID}</Text>
          </View>
          <View style={styles.dataContRow}>
            <Text style={styles.dataHead}>To be Paid (in {paymentMethod})</Text>
            <Text style={styles.dataText}>{total*cryptoPrice}</Text>
          </View>
          <View style={styles.dataContRow}>
            <Text style={styles.dataHead}>Current Balance</Text>
            <Text style={styles.dataText}>{balance} {paymentMethod}</Text>
          </View>
          <View style={styles.dataContRow}>
            <Text style={styles.dataHead}>Receiver</Text>
            <Text style={styles.dataText}>{receiver}</Text>
          </View>
        </View>
        {
          balance<total?
          <TouchableOpacity style={styles.btn} onPress={()=>{
            transfer(total*cryptoPrice,userId,tokenActor)
          }}>
            <Text style={styles.btnText}>Proceed</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.btn} onPress={()=>{self(false)}}>
            <Text style={styles.btnText}>Choose another method</Text>
          </TouchableOpacity>
        }
        
      </View>
      <ActivityIndicator animating={loading} size={40} style={styles.loader}/>
    </View>
  )
}

export default BalanceScreen

const styles = StyleSheet.create({
  modal:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
    width:'100%',
    backgroundColor:'rgba(128, 128, 128, 0.3)'
  },
  alert:{
    width:'90%',
    backgroundColor:'white',
    elevation:10,
    borderRadius:12,
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  title:{
    color:COLORS.hostTitle,
    fontSize:SIZES.large,
    marginVertical:10,
    fontWeight:'500',
    width:'90%',
    textAlign:'center'
  },
  btn:{
    width:'82%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    backgroundColor:COLORS.hostTitle,
    borderRadius:12,
    paddingVertical:15,
    alignItems:'center',
    marginVertical:15
  },
  btnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:SIZES.medium,
    
  },
  dataCont:{
    width:'90%',
    margin:10,
  },
  dataContRow:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    marginVertical:8
  },
  dataHead:{
    color:COLORS.black,
    fontSize:SIZES.preMedium,
    width:'40%',
    fontWeight:'600'
  },
  dataText:{
    color:COLORS.black,
    opacity:0.6,
    fontSize:SIZES.small,
    width:'50%'
  },
  loader:{
    position:'absolute',
    top:'45%',
    left:'45%'
  }
})