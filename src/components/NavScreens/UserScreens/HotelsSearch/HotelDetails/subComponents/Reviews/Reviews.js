import { FlatList, Modal, StyleSheet, Text,  TouchableOpacity,  View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { SIZES,COLORS } from '../../../../../../../constants/themes'
import ReviewCard from './ReviewCard'
import AllReviews from './AllReviews'


const reviews=require('./sampleReviews.json')

const Reviews = () => {

  const [showReview,setShowReviews]=useState(true)
  return (
    <View style={styles.reviewCont}>
        <View style={styles.headerCont}>
            <Icon name="star" size={16} color={COLORS.hostTitle} />
            <Text style={styles.reviewText}>4.92 • 432 reviews</Text>
        </View>
        <FlatList contentContainerStyle={styles.list} data={reviews} renderItem={(item)=>(
            <ReviewCard item={item?.item}/>
        )}
        horizontal/>
        
        <TouchableOpacity style={styles.btn} onPress={()=>{
            setShowReviews(!showReview)
        }}>
            <Text style={styles.btnText}>Show all reviews</Text>
        </TouchableOpacity>
        <Modal animationType='slide' visible={showReview}>
            <AllReviews setShowReviews={setShowReviews}/>
        </Modal>
    </View>
  )
}

export default Reviews

const styles = StyleSheet.create({
    reviewCont:{
        backgroundColor:'white',
        display:'flex',
        flexDirection:'column',
        width:'100%',
        alignItems:'center',marginBottom:90
    },
    headerCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'80%',
        
    },
    reviewText:{
        fontWeight:'600',
        color:COLORS.black,
        fontSize:SIZES.preMedium,
        marginLeft:10
    },
    btn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'80%',
        backgroundColor:'white',
        borderWidth:1.2,
        borderColor:COLORS.hostTitle,
        borderRadius:12,
        paddingVertical:10,
        zIndex:10
    },
    btnText:{
        fontSize:SIZES.large,
        color:COLORS.hostTitle,
        fontWeight:'600',
    },
    list:{
        paddingHorizontal:20,
        paddingVertical:15
    }
})