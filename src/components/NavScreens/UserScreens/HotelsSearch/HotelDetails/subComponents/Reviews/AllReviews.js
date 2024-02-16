import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReviewCard from './ReviewCard'
import { COLORS, SIZES } from '../../../../../../../constants/themes'
import Icon from 'react-native-vector-icons/FontAwesome'

// const reviews=require('./sampleReviews.json')

const itemSample={
  title:"Great place",
  des:'Loved every second of the stay, great hospitality',
  rating:4
}


const AllReviews = ({setShowReviews,reviews}) => {
  return (
    <View style={styles.view}>
    <TouchableOpacity style={styles.backIcon} onPress={()=>setShowReviews(false)}>
        <Icon name="angle-left" size={30} color={COLORS.textLightGrey}/> 
    </TouchableOpacity>
    <Text style={styles.title}>Reviews</Text>    
    <ScrollView contentContainerStyle={styles.list}>
      {/* {
        reviews.map((review,index)=>(
            <ReviewCard item={review} key={index}/>
        ))
      } */}
      <ReviewCard item={itemSample}/>
    </ScrollView>
    </View>
  )
}

export default AllReviews

const styles = StyleSheet.create({
    
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        paddingBottom:50,
        backgroundColor:'white',
        opacity:1,
    },
    title:{
        fontWeight:'bold',
        color:COLORS.black,
        fontSize:SIZES.medium,
        position:'absolute',
        top:'2%'
    },
    backIcon:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginVertical:10,
        justifyContent:'flex-start',
        paddingLeft:30,
    },
    list:{
        width:'90%',
        paddingLeft:20
    }
})