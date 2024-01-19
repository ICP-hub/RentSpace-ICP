import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../constants/themes'
import Icon from 'react-native-vector-icons/Entypo'

const ActionCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.itemCard} onPress={item?.onClick}>
        <View style={styles.titleCont}>
            {
                item?.icon
            }
            <Text style={styles.title}>{item?.text}</Text>
        </View>
        <Icon name='chevron-small-right' size={28} color={COLORS.textLightGrey}/>
    </TouchableOpacity>
  )
}

export default ActionCard

const styles = StyleSheet.create({
    itemCard:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        marginVertical:8
    },
    titleCont:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    title:{
        fontSize:SIZES.medium,
        color:COLORS.black,
        marginLeft:10
    }
})