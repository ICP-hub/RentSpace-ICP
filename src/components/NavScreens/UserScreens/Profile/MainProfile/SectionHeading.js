import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../../../../constants/themes'

const SectionHeading = ({text}) => {
  return (
    <Text style={styles.text}>{text}</Text>
  )
}

export default SectionHeading

const styles = StyleSheet.create({
    text:{
        fontWeight:'600',
      fontSize:SIZES.xLarge+2,
      color:'black',
      marginBottom:16
    }
})