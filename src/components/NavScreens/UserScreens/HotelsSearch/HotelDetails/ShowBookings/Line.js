import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../../constants/themes'

const Line = () => {
  return (
    <View style={styles.line}/>
  )
}

export default Line

const styles = StyleSheet.create({
    line:{
        width:'85%',
        height:1,
        borderWidth:0.3,
        borderStyle:'dashed',
        opacity:0.2,
        marginVertical:10
    }
})