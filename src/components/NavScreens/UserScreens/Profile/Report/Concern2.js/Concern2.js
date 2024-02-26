import { ScrollView, StyleSheet, Text, TouchableOpacity, View,TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import Icon from 'react-native-vector-icons/Entypo'
import BottomBtn from '../BottomBtn'
import AddressFileds from './AddressFileds'
import { useSelector } from 'react-redux'

const Concern2 = ({setConcernForm,setReportPage,setReport,report}) => {
    const [userDetails,setUserDetails]=useState({
        name:"",
        email:""
    })
    const [address,setAddress]=useState({
        region:"",
        streetAdd:"",
        suiteBuilding:"",
        city:"",
        country:"",
        postcode:""
    })
    const {actors}=useSelector(state=>state.actorReducer)
    const [loading,setLoading]=useState(false)
    const submitReport=async()=>{
        setLoading(true)
        console.log(actors?.supportActor)
        await actors?.supportActor?.raiseNewTicket(
          report?.reason,
          report?.hostMessage,
          report?.adminMessage,
          report?.address
        ).then((res)=>{
          console.log("res raising ticket : ",res)
          setLoading(false)
          alert('Your issue ticket have been raised!')
          setConcernForm(0)
          setReportPage(false)
        }).catch((err)=>{
          console.log("err raising ticket : ",err)
        })
        // setTimeout(()=>{
        //     setLoading(false)
        //     // alert('Your issue ticket have been raised!')
        //     // setConcernForm(0)
        //     // setReportPage(false)
        //     console.log(report)
        // },1000)
    }
  return (
    <View style={styles.modal}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.topNav}>
            <TouchableOpacity style={{marginLeft:'2%'}} onPress={()=>setConcernForm(0)}>
            <Icon name='chevron-small-left' color={COLORS.black} size={30}/>
            </TouchableOpacity>
        </View>
        <Text style={styles.title2}>Report</Text>
        <Text style={styles.title}>Report a concern</Text>
        <Text style={styles.normalText}>
            All fields are required unless otherwise noted.
        </Text>
        <Text style={styles.sectionHeading}>
            What’s the address?
        </Text>
        <AddressFileds setAddress={setAddress} address={address} setReport={setReport} report={report}/>
        <Text style={styles.sectionHeading}>
            Let the Host of the listing know about the issue
        </Text>
        <Text style={styles.normalText}>
            We’ll send this message to the Host.
        </Text>
        <TextInput 
            style={styles.bigInput}
            value={report.hostMessage}
            onChangeText={value=>setReport({...report,hostMessage:value})}
            placeholder='How can Host improve?'
            placeholderTextColor={COLORS.textLightGrey}
            multiline
            numberOfLines={7}
            textAlignVertical='top'
        />
        <Text style={styles.sectionHeading}>
            Let the RentSpace know about the issue
        </Text>
        <Text style={styles.normalText}>
            This won’t be send to the Host.
        </Text>
        <TextInput 
            style={styles.bigInput}
            value={report.adminMessage}
            onChangeText={value=>setReport({...report,adminMessage:value})}
            placeholder='How can RentSpace help?'
            placeholderTextColor={COLORS.textLightGrey}
            multiline
            numberOfLines={7}
            textAlignVertical='top'
        />
        <Text style={styles.sectionHeading}>
            Your contact details
        </Text>
        <Text style={styles.normalText}>
            Your contact details will not be shared with the host.
        </Text>
        <TextInput 
            style={styles.input}
            value={userDetails.name}
            onChangeText={value=>setUserDetails({...userDetails,name:value})}
            placeholderTextColor={COLORS.hostTitle}
            placeholder='Full name'
        />
        <TextInput 
            style={styles.input}
            value={userDetails.email}
            onChangeText={value=>setUserDetails({...userDetails,email:value})}
            placeholderTextColor={COLORS.hostTitle}
            placeholder='email'
        />
      </ScrollView>
      <BottomBtn step={2} onClickNext={submitReport} nextText={"Submit"} setConcernForm={setConcernForm}/>
      <ActivityIndicator animating={loading} size={40} style={styles.loader}/>
    </View>
  )
}

export default Concern2

const styles = StyleSheet.create({
    modal:{
        height:'100%',
        width:'100%'
    },
    page:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        minHeight:'100%',
        width:'100%',
        backgroundColor:'white',
        paddingBottom:150,
        marginTop:10
      },
      topNav:{
        width:'100%',
        backgroundColor:'white',
        padding:0,
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center'
      },
      title:{
        color:COLORS.black,
        fontSize:SIZES.xxLarge,
        marginLeft:'7%',
        width:'70%',
        fontWeight:'600',

      },
      title2:{
        color:COLORS.black,
        fontSize:SIZES.xLarge,
        marginLeft:'5.5%',
        width:'85%',
        fontWeight:'600',
        marginTop:10,
        marginBottom:25
      },
      normalText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.medium,
        marginLeft:'7%',
        width:'80%',
        fontWeight:'400',
        marginVertical:10,
        opacity:0.7,
        lineHeight:22
      },
      sectionHeading:{
        color:COLORS.black,
        fontSize:SIZES.large,
        marginLeft:'7%',
        width:'85%',
        fontWeight:'bold',
        marginTop:15
      },
      input:{
        marginLeft:'7.5%',
        width:'82%',
        borderWidth:0.8,
        borderRadius:10,
        borderColor:COLORS.hostTitle,
        marginBottom:10,
        opacity:0.8,
        color:COLORS.black,
        paddingLeft:15
      },
      bigInput:{
        marginLeft:'7.5%',
        width:'85%',
        borderWidth:0.8,
        borderRadius:10,
        borderColor:COLORS.hostTitle,
        marginVertical:10,
        opacity:0.8,
        color:COLORS.black,
        paddingLeft:15,
        paddingVertical:20,
        fontSize:SIZES.small
      },
      loader:{
        position:'absolute',
        top:'45%',
        left:'45%'
      }
})