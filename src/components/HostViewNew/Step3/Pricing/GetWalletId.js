import { ActivityIndicator, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl("devnet"));

const GetWalletId = ({phantomAccID,setPhantomAccID}) => {
    const [loading,setLoading]=useState(false)
    const [respText,setRespText]=useState("Make sure to put a valid account ID for accepting payments")
    const [formatValid,setFormatValid]=useState(false)
    const validateFormat=()=>{
        try{
            const p=new PublicKey(phantomAccID)
            return true
        }catch(err){
            console.log(err)
            setRespText("Format of account ID is not valid")
        }
    }
  return (
    <View style={styles.modal}>
        <View style={styles.alert}>
            <Text style={styles.title}>Enter account ID</Text>
            <View style={styles.instructionCont}>
                <Text style={styles.instructionHead}>How to get one?</Text>
                <Text style={styles.instructionText}>1. Launch phantom app</Text>
                <Text style={styles.instructionText}>2. Go to Settings</Text>
                <Text style={styles.instructionText}>1. Click on your account</Text>
                <Text style={styles.instructionText}>1. Copy the account id</Text>
            </View>
            <TextInput
                placeholder="account ID"
                placeholderTextColor={COLORS.textLightGrey}
                style={styles.input}
                value={phantomAccID}
                onChangeText={value => {
                    setPhantomAccID(value);
                }}
            />
            <Text style={[styles.requirement,{color:(formatValid?COLORS.lightGreen:"red")}]}></Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
            <ActivityIndicator style={styles.loader} size={40} animating={loading}/>
        </View>
    </View>
  )
}

export default GetWalletId

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
        width:'60%',
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
      loader:{
        position:'absolute',
        top:'45%',
        left:'45%'
      },
      input:{
        borderColor: COLORS.textLightGrey,
        borderWidth: 1,
        borderRadius:10,
        width: '80%',
        marginVertical: 10,
        height: 50,
        padding: 15,
        color: COLORS.black,
        fontSize: SIZES.preMedium,
        opacity: 0.5,
      },
      instructionCont:{
        width:'80%',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        marginVertical:10
      },
      instructionHead:{
        fontSize:SIZES.preMedium,
        color:COLORS.black,
        fontWeight:'600',
        marginBottom:7
      },
      instructionText:{
        fontSize:SIZES.small,
        color:COLORS.black,
        fontWeight:'300',
        marginBottom:5
      },
      requirement:{
        opacity:0.6,
        fontSize:SIZES.small,
        marginBottom:10,
        fontWeight:'600'
      }
})