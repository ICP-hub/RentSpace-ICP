import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../../../constants/themes'
import { images } from '../../../../../constants'
import { useSelector } from 'react-redux'
import {Principal} from '@dfinity/principal'

const ReplyCard = ({item}) => {

  console.log("Item on Reply Card",item);

  const {actors}=useSelector(state=>state.actorReducer)
  const [cardUser,setCardUser]=useState({})
  const getUser=async()=>{
    try{
      let usrresp = await actors?.userActor.getUserByPrincipal(Principal.fromText(item?.userId));
      console.log('UserResp', usrresp);
      setCardUser(usrresp.ok);
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getUser()
  },[])
  return (
    <View style={styles.card}>
      <Image source={(cardUser?.userProfile==""||cardUser?.userProfile=="img"||cardUser=={})?images.sampleProfile2:{uri:cardUser?.userProfile}} style={styles.img}/>
      <View style={styles.textCont}>
        <Text style={styles.headText}>{item.user}  •  {item.date}</Text>
        <Text style={styles.normalText}>
            {item.text}
        </Text>
      </View>
    </View>
  )
}

export default ReplyCard

const styles = StyleSheet.create({
    card:{
        width:'85%',
        backgroundColor:'white',
        marginVertical:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        // zIndex:100
    },
    img:{
        width:40,
        height:40,
        borderRadius:30,
        marginRight:'3%'
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'90%'
    },
    headText:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        opacity:0.7,
        fontWeight:'600'
    },
    normalText:{
        fontSize:SIZES.small,
        color:COLORS.black,
        fontWeight:'300'
    },
})