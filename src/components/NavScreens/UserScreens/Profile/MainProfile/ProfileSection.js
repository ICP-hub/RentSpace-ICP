import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SectionHeading from './SectionHeading'
import ActionCard from './ActionCard'

const ProfileSection = ({heading,list}) => {
  return (
    <View style={styles.sec}>
      <SectionHeading text={heading}/>
      {
        list.map((item,index)=>(
            <ActionCard item={item} key={index}/>
        ))
      }
    </View>
  )
}

export default ProfileSection

const styles = StyleSheet.create({
    sec:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'88%'
    }
})