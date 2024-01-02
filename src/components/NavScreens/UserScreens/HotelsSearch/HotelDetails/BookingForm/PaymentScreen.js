import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import { createTokenActor } from './utils'
import {Principal} from "@dfinity/principal"
import React, { useEffect, useState } from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { useSelector } from 'react-redux'

const PaymentScreen =({booking,item,self}) => {

  // code for the transation starts from here
  const [payment,setPayment]=useState(0)
    const {actors}=useSelector(state=>state.actorReducer)
    const {principle}=useSelector(state=>state.principleReducer)
    const [userId,setUserId]=useState("sample")
  const [metaData,setMetaData] = useState(null);
  
  async function settingToken(){
    // console.log("first")
    // setTokenActor(createTokenActor("ryjl3-tyaaa-aaaaa-aaaba-cai"));
    console.log("token actor",actors?.tokenActor)
    await actors.tokenActor.icrc1_metadata().then((res)=>{
      console.log(res)
      setMetaData(res)
    }).catch((err)=>{console.log(err)})
    console.log("metadate:",metaData);
  }

  // function  for the transfer
  const transfer=async (sendAmount,sendPrincipal) =>{
    console.log("metaData[decimals]",parseInt(metaData[0][1]["Nat"]))
    let transaction = {
      amount: parseInt(Number(sendAmount) * Math.pow(10, parseInt(metaData[0][1]["Nat"]))),
      from_subaccount: [],
      to: {
        owner: Principal.fromText(sendPrincipal),
        subaccount: [],
      },
      fee: [parseInt(metaData[3][1]["Nat"])],
      memo: [],
      created_at_time: [],
    };
    console.log("metadata inside transfer",metaData)
  let response = await actors?.tokenActor.icrc1_transfer(transaction);
  let data = displayObject(response);
      if (response.Err) {
       return toast.error(data);
      } else {
        toast.success("Transaction successful");
        let balance = await actors?.tokenActor.icrc1_balance_of({ owner: sendPrincipal , subaccount: [] });
        balance = parseInt(balance) / Math.pow(10, tokenMetaData?.metadata?.["icrc1:decimals"]);
        return balance
      }
    };
    
    const getOwner=()=>{
        setUserId(item?.id.split('#')[0])
        console.log(userId)
        setPayment(Number(booking.bookingDuration)*Number(item?.hotelPrice))
        console.log(Number(booking.bookingDuration)*Number(item?.hotelPrice))
    }
    useEffect(()=>{
        getOwner()
        settingToken()
    },[])
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Your Current Balance : {100}</Text>
      <Text style={styles.title}>Hotel Name: {item?.hotelTitle}</Text>
      {/* <Text style={styles.title}>Sender's id: {"  "}<Text style={{color:COLORS.hostTitle}}>"{principle?.toString()}"</Text></Text>
      <Text style={styles.title}>Receiver's id:{"  "} <Text style={{color:COLORS.hostTitle}}>"{userId.toString()}"</Text></Text> */}
      <TextInput 
        style={styles.inputs}
        value={"$"+payment.toString()}/>
        {/* // placeholder="Amount"
        // placeholderTextColor={COLORS.textLightGrey}
        // onChangeText={value=>setPayment(value.toString())}/> */}
        <TouchableOpacity style={styles.btn} onPress={()=>{
          transfer(2000000000,"qkb5l-wokwi-xjxsf-i73hq-iyk3j-qb723-vpmes-oxzvs-e37yb-ih7kp-iqe")
        }}>
            <Text style={styles.btnText}>Confirm Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=>self.current.dismiss()}>
            <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%',
        paddingTop:20
      },
      title:{
        color:COLORS.black,
        fontWeight:'400',
        fontSize:SIZES.preMedium,
        marginBottom:10,
        width:'80%'
      },
      inputs:{
        borderColor: COLORS.hostTitle,
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginBottom: 40,
        height: 50,
        padding: 15,
        color: COLORS.textLightGrey,
        fontSize: SIZES.preMedium,
        marginTop:15
      },
      btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.hostTitle,
        borderRadius:12,
        width:'80%',
        paddingVertical:15,
        marginBottom:12,
        
      },
      btnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium,
      }
})