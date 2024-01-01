import { StyleSheet, Text, View ,TouchableOpacity,Image,ScrollView, Modal} from 'react-native'
import React, { useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS,SIZES } from '../../../../../constants/themes'
import { images } from '../../../../../constants'
import Icon2 from 'react-native-vector-icons/AntDesign'
import HostBand from './cards/HostBand'
import HotelFacilityCard from './cards/HotelFacilityCard'
import ReserveBtn from './cards/ReserveBtn'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Reviews from './subComponents/Reviews/Reviews'

const HotelDetailPage = ({item,setOpen}) => {
    const btmBtn=useRef(null)
    useEffect(()=>{
        btmBtn.current.present()
    },[])
  return (
    <BottomSheetModalProvider>
    <ScrollView>
    <View style={styles.bottomSheet} >

      <TouchableOpacity style={styles.backIcon} onPress={()=>{setOpen(false)}}>
        <Icon name="angle-left" size={30} color={COLORS.textLightGrey} />    
      </TouchableOpacity> 
     
      <Image source={images.hotel} style={styles.hotelImg}/>
      <View style={styles.hotelTitleReviewCont}>
        <View style={styles.hotelTitleCont}>
            <Text style={styles.hotelTitle}>{item?.hotelTitle}</Text>
            <TouchableOpacity style={styles.likeCont}>
                <Icon2 name="hearto" size={20} color={COLORS.textLightGrey} />
            </TouchableOpacity>    
        </View>
        <View style={styles.hotelReviewCont}>
            <Icon2 name='star' size={12} color={COLORS.inputBorder} style={{marginRight:5}}/>
            <Text style={styles.hotelReviewText}>4.92 • 432 reviews • {item?.hotelLocation}</Text>
        </View>
        
      </View>
      <HostBand/>
      <View style={[styles.allCont,{marginVertical:25}]}>
        <HotelFacilityCard />
      </View>
      <View style={styles.hrLine}></View>
      <Reviews/>  

      <BottomSheetModal ref={btmBtn} index={0} snapPoints={['12']} style={{elevation:10,backgroundColor:'white'}}>
        <ReserveBtn item={item}/>
      </BottomSheetModal>
      
    </View>
    </ScrollView>
    </BottomSheetModalProvider>
  )
}

export default HotelDetailPage

const styles = StyleSheet.create({
    bottomSheet:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        paddingBottom:100
    },
    backIcon:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginTop:10,
        justifyContent:'flex-start',
        paddingLeft:30
    },
    hotelImg:{
        width:'100%',
        height:220
    },
    hotelTitle:{
        width:"90%",
        fontSize:SIZES.large,
        fontWeight:'bold',
        color:"black",
        marginRight:15
    },
    hotelTitleReviewCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'90%',
        marginTop:15,
        marginLeft:40
    },
    hotelTitleCont:{
        display:'flex',
        flexDirection:'row',
        width:'90%',
        alignItems:'flex-start'
    },
    likeCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginTop:3
    },
    hotelReviewCont:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        alignItems:'flex-start',
        marginVertical:12
    },
    hotelReviewText:{
        width:"80%",
        fontSize:SIZES.xSmall,
        color:"black",
        marginBottom:15,
        opacity:0.6
    },
    allCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%'
    },
    hrLine:{
        height:2,
        borderBottomWidth:2,
        borderBottomColor:COLORS.hrLine,
        width:"100%",
        marginBottom:20
    }
})