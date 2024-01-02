import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import { createTokenActor } from './utils'
import {Principal} from "@dfinity/principal"
import React, { useEffect, useState } from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { useSelector } from 'react-redux'

const PaymentScreen = async ({booking,item,self}) => {

  // code for the transation starts from here
  const [tokenActor,setTokenActor] = useState(null);
  const [metaData,setMetaData] = useState(null);
  setMetaData(await tokenActor.icrc1_metadata())
  setTokenActor(createTokenActor("ryjl3-tyaaa-aaaaa-aaaba-cai"));
  console.log(metaData);

  // function  for the transfer
  const transfer=async (sendAmount,sendPrincipal) =>{
    let transaction = {
      amount: parseInt(Number(sendAmount) * Math.pow(10, parseInt(metaData?.metadata?.["icrc1:decimals"]))),
      from_subaccount: [],
      to: {
        owner: Principal.fromText(sendPrincipal),
        subaccount: [],
      },
      fee: [parseInt(metaData?.metadata?.["icrc1:fee"])],
      memo: [],
      created_at_time: [],
    };
  let response = await tokenActor.icrc1_transfer(transaction);
  let data = displayObject(response);
      if (response.Err) {
       return toast.error(data);
      } else {
        toast.success("Transaction successful");
        let balance = await tokenActor.icrc1_balance_of({ owner: , subaccount: [] });
        balance = parseInt(balance) / Math.pow(10, tokenMetaData?.metadata?.["icrc1:decimals"]);
        await updateLocalStorageBalance(balance);
        reloadFunction();
        closeModalSend();
        closeModalNextSection();
        setSendAmount(0);
        setSendPrincipal("");
      }
    };
    const [payment,setPayment]=useState(0)
    const {actors}=useSelector(state=>state.actorReducer)
    const {principle}=useSelector(state=>state.principleReducer)
    const [userId,setUserId]=useState("sample")
    const getOwner=()=>{
        setUserId(item?.id.split('#')[0])
        console.log(userId)
        setPayment(Number(booking.bookingDuration)*Number(item?.hotelPrice))
        console.log(Number(booking.bookingDuration)*Number(item?.hotelPrice))
    }
    useEffect(()=>{
        getOwner()
    },[])
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Your Current Balance : {100}</Text>
      <Text style={styles.title}>Hotel Name: {item?.hotelTitle}</Text>
      <Text style={styles.title}>Sender's id: {"  "}<Text style={{color:COLORS.hostTitle}}>"{principle?.toString()}"</Text></Text>
      <Text style={styles.title}>Receiver's id:{"  "} <Text style={{color:COLORS.hostTitle}}>"{userId.toString()}"</Text></Text>
      <TextInput 
        style={styles.inputs}
        value={"$"+payment.toString()}/>
        {/* // placeholder="Amount"
        // placeholderTextColor={COLORS.textLightGrey}
        // onChangeText={value=>setPayment(value.toString())}/> */}
        <TouchableOpacity style={styles.btn}>
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