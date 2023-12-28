import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomNavHost from '../../../Navigation/BottomNavHost'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { COLORS,SIZES } from '../../../../constants/themes'
import ListingCard from './ListingCard'
import { images } from '../../../../constants'

const Listings = ({navigation}) => {
    const listings=[
        {
            name:'Taj Hotel',
            address:'Mumbai, Maharashtra',
            image:images.hotelImg1,
            status:2
        },
        {
            name:'Hotel Ramada',
            address:'Lucknow, UP',
            image:images.hotelImg2,
            status:0
        },
        {
            name:'Hotel Pennsylvania',
            address:'Pennsylvania, Austria',
            image:images.hotelImg3,
            status:1
        },
        {
            name:'Constantinople Inn',
            address:'Istanbul',
            image:images.hotelImg4,
            status:0
        },
        {
            name:'Jaypur Palace',
            address:'Jaypur, Rajasthan',
            image:images.hotelImg5,
            status:1
        },
    ]
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Your listings</Text>
        <View style={styles.iconCont}>
            <TouchableOpacity style={styles.icon}>
                <Icon name='collage' size={30} color={COLORS.textLightGrey}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
                <Icon2 name='plus' size={30} color={COLORS.textLightGrey}/>
            </TouchableOpacity>
        </View>
      </View>
      <FlatList style={styles.list} contentContainerStyle={{paddingBottom:80}} data={listings} renderItem={(item)=>(
        <ListingCard item={item.item}/>
      )}/>
      <BottomNavHost navigation={navigation}/>
    </View>
  )
}

export default Listings

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        backgroundColor:'white'
    },
    header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'90%',
        marginLeft:'2%',
        marginVertical:20
    },
    iconCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:75,
        marginTop:8
    },
    icon:{
        width:30
    },
    title:{
        fontSize:SIZES.medxLarge,
        color:'black',
        fontWeight:'500',
    },
    list:{
        paddingBottom:500,
        width:'100%',
        display:'flex',
        flexDirection:'column',
    }
})