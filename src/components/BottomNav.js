import { View, Text,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { COLORS ,SIZES} from '../constants/themes'
import {images} from '../constants'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Fontisto'



const BottomNav = ({handlePresentModal,openFinishSignUp,openComm,openNotiModal,openDetailsModal}) => {


  return (
    
    
    <View style={styles.viewNav}>
        {/* <Icon name="home" size={20} color={COLORS.inputBorder}/> */}
        <TouchableOpacity style={styles.iconNav} onPress={()=>{openFinishSignUp()}}>
        <Icon name="filter" size={25} color={COLORS.inputBorder}/>
        </TouchableOpacity >
        <TouchableOpacity style={styles.iconNav} onPress={()=>{openComm()}}>
            {/* <Image source={images.search}/> */}
            <Icon name="search1" size={25} color={COLORS.inputBorder}/>
        </TouchableOpacity >
        <TouchableOpacity style={styles.iconNav} onPress={()=>{openNotiModal()}}>
        <Icon name="hearto" size={25} color={COLORS.inputBorder}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconNav} onPress={()=>{openDetailsModal()}}>
        <Icon2 name="comment" size={20} color={COLORS.inputBorder}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconNav} onPress={()=>{handlePresentModal()}}>
        <Icon name="user" size={25} color={COLORS.inputBorder}/>
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
        width:25,
        height:25
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