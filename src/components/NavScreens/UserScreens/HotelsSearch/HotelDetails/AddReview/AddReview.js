import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { COLORS,SIZES } from '../../../../../../constants/themes'

const AddReview = () => {
  return (
    <View style={styles.view}>
        <TouchableOpacity style={styles.backIcon}>
            <Icon name="angle-left" size={25} color={COLORS.textLightGrey}/> 
        </TouchableOpacity>
      <Text style={styles.title}>AddReview</Text>
    </View>
  )
}

export default AddReview

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        height:'100%'
      },
      title:{
        color:COLORS.black,
        position:'absolute',
        top:'2%',
        fontWeight:'bold',
        fontSize:SIZES.medium
      },
      backIcon:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginVertical:10,
        justifyContent:'flex-start',
        paddingLeft:30,
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
        fontSize: SIZES.preMedium
      },
})