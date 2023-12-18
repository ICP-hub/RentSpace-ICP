import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import BackBtn from '../Reusables/BackBtn'
import SearchMap from './SearchMap'

const HostFirstScreen = ({setHostModal}) => {
  return (
        <ScrollView contentContainerStyle={styles.view}>
            <BackBtn setHostModal={setHostModal}/>
            <Header/>
            <SearchMap/>
        </ScrollView>    
  )
}

export default HostFirstScreen

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
    }
})