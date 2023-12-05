import { View, Text,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { COLORS ,SIZES} from '../constants/themes'
import {images} from '../constants'



const BottomNav = ({handlePresentModal,openFinishSignUp,openComm,openNotiModal}) => {


  return (
    
    
    <View style={styles.viewNav}>
        <TouchableOpacity style={styles.iconNav} onPress={()=>{openFinishSignUp()}}>
            <Image source={images.search}/>
        </TouchableOpacity >
        <TouchableOpacity style={styles.iconNav} onPress={()=>{openComm()}}>
            <Image source={images.search}/>
        </TouchableOpacity >
        <TouchableOpacity style={styles.iconNav} onPress={()=>{openNotiModal()}}>
            <Image source={images.favourite}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconNav}>
            <Image source={images.message}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileCont} onPress={()=>{handlePresentModal()}}>
            <Image source={images.profileHead}/>
            <Image source={images.profile}/>
            
        </TouchableOpacity>
    </View>
      

    
  )
}
const styles=StyleSheet.create({
    profileCont:{
        display:'flex',
        flexDirection:'column',
        width:25,
        height:25,
        justifyContent:'space-between',
        alignItems:'center',
        padding:5
    },
    iconNav:{
        display:'inline',
        width:20,
        height:20
    },
    viewNav:{
        backgroundColor:"white",
        width:"100%",
        display:'flex',
        justifyContent:"space-around",
        position:"absolute",
        bottom:0,
        paddingVertical:20,
        flexDirection:"row"
    },
    text:{
        textAlign:"center",
        color:"blue"
    }
})

export default BottomNav