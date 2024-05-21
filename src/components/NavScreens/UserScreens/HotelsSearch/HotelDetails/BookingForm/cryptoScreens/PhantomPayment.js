import { StyleSheet, Text, View,ActivityIndicator,TouchableOpacity, Alert } from 'react-native'
import {React,useState} from 'react'
import { COLORS,SIZES } from '../../../../../../../constants/themes'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const PhantomPayment = ({loading,accountId,total,connect,sendNewTransaction,connected,cryptoPrice}) => {


    const payWithPhantom=()=>{
        if(connected){
            sendNewTransaction(total*cryptoPrice)
        }else{
            Alert.alert("Connection Required","Please connect with phantom wallet first to continue the payment")

        }
    }
    
  return (
    <View style={styles.modal}>
        <View style={styles.alert}>
            <Text style={styles.title}>Pay with Phantom wallet</Text>
            <View style={styles.dataCont}>
                {
                    connected?
                    <></>
                    :
                    <Text style={styles.requirement}>
                        Make sure you have Phantom wallet app installed in your device
                    </Text>
                }
                
                <View style={styles.dataContRow}>
                    <Text style={styles.dataHead}>Connection status</Text>
                    <Text style={styles.dataText}>
                        {
                            connected?
                            "Connected"
                            :
                            "Not connected"
                        }
                    </Text>
                </View>
                <View style={styles.dataContRow}>
                    <Text style={styles.dataHead}>Amount</Text>
                    <Text style={styles.dataText}>{total*cryptoPrice} SOL</Text>
                </View>
                <View style={styles.dataContRow}>
                    <Text style={styles.dataHead}>Receiver account</Text>
                    <Text style={styles.dataText}>{accountId}</Text>
                </View>
            </View>
            {
                connected?
                <></>
                :
                <TouchableOpacity style={styles.btn2} onPress={connect}>
                    <Text style={styles.btnText}>
                        {
                            connected?
                            "Connected"
                            :
                            "Connect to phantom"
                        }
                    </Text>
                </TouchableOpacity>
            }
           
            <TouchableOpacity style={styles.btn} onPress={payWithPhantom}>
                <Text style={styles.btnText}>Confirm Payment</Text>
            </TouchableOpacity>
            <ActivityIndicator animating={loading} size={40} style={styles.loader}/>
        </View>
       
    </View>
  )
}

export default PhantomPayment

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
        backgroundColor:COLORS.white,
        elevation:10,
        borderRadius:12,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      },
      title:{
        color:COLORS.mainPurple,
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
        backgroundColor:COLORS.mainPurple,
        borderRadius:12,
        paddingVertical:15,
        alignItems:'center',
        marginVertical:15
      },
      btn2:{
        width:'82%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        borderRadius:12,
        paddingVertical:15,
        alignItems:'center',
        marginTop:15,
        backgroundColor:COLORS.mainPurple
      },
      btnText:{
        color:COLORS.white,
        fontWeight:'bold',
        fontSize:SIZES.medium,
      },
      loader:{
        position:'absolute',
        top:'45%',
        left:'45%'
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
      dataText2:{
        opacity:0.6,
        fontSize:SIZES.small,
        width:'50%',
        fontWeight:'600'
      },
      requirement:{
        color:COLORS.black,
        opacity:0.6,
        fontSize:SIZES.small,
        marginBottom:10,
        fontWeight:'600'
      }
})