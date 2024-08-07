import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from './Header'
import BackBtn from '../Reusables/BackBtn'
import SearchMap from './SearchMap'
import ComparisonFeatures from './ComparisonFeatures/ComparisonFeatures'
import Questions from './Q&A/Questions'
import { COLORS } from '../../../constants/themes'

const HostFirstScreen = ({setHostModal,navigation}) => {
  return (
        <ScrollView contentContainerStyle={styles.view}>
            <BackBtn setHostModal={setHostModal} navigation={navigation}/>
            <Header/>
            <SearchMap/>
            {/* <ComparisonFeatures/> */}
            <Questions/>
            <View style={styles.footer}>
                <View style={styles.footerEnv}>
                    <TouchableOpacity onPress={()=>{setHostModal(2)}}>
                        <Text style={styles.text}>Continue</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
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
        backgroundColor:COLORS.mainGrey
    },
    footer:{
        width:'100%',
        height:100,
    },
    footerEnv:{
        backgroundColor:COLORS.white,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:'100%',
        elevation:5
    },
    text:{
        color:COLORS.black,
        textAlign:'center',
        opacity:0.8,
        fontWeight:'bold',
        marginTop:10
    }
})