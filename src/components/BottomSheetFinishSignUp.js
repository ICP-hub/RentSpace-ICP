import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES,COLORS } from '../constants/themes'
import { images } from '../constants'
import { RawButton, TextInput, TouchableOpacity } from 'react-native-gesture-handler'

const BottomSheetFinishSignUp = ({closeModal}) => {
  return (
    <View style={styles.bottomSheet}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>{closeModal()}}>
                <Image  source={images.cross} style={styles.crossImg}/>
            </TouchableOpacity>
            
            <Text style={styles.heading}>FINISHING SIGNING UP</Text>
        
            </View>
            <TextInput placeholder='First name' placeholderTextColor={COLORS.inputBorder} style={styles.firstName} />
            <TextInput placeholder='Last name' placeholderTextColor={COLORS.inputBorder} style={styles.lastName} />
            <Text style={styles.simpleText}>
                Make sure it matches the name on your ID
            </Text>
            <TouchableOpacity style={styles.dateDiv}>
                <Text style={styles.dateDivText}>Birthday(dd/mm/yyyy)</Text>
                <Image source={images.next}/>
            </TouchableOpacity>
            <Text style={styles.simpleText}>
            To sign up, you  need to be at level 18. Your birthday won’t be shared with other people who use Rent space.
            </Text>
            <TextInput placeholder='Email' placeholderTextColor={COLORS.inputBorder} style={styles.simpleInput}/>
            <Text style={styles.simpleText}>
            We’ll email you trip confirmations and receipts.
            </Text>
            <Text style={styles.simpleText}>
            By selecting Agree and continue, I agree to Rent space's{" "}     
            <Text style={styles.linkText}>Terms of Service, Payments Terms of Service and Nondiscrimination Policy</Text>
            {" "}  and acknowledge the  {" "}<Text style={styles.linkText}>Privacy Policy.</Text>
            </Text>
            <TouchableOpacity style={styles.submitBtn}>
                <Text style={styles.submitText}>Accept and continue</Text>
            </TouchableOpacity>
            
    </View>
  )
}

export default BottomSheetFinishSignUp

const styles = StyleSheet.create({
    bottomSheet:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        height:'100%'
    },
    header:{
        display:'flex',
        flexDirection:'row',
        width:'80%',
        alignItems:'center',
        marginTop:5,
        justifyContent:'flex-start',
        marginBottom:30
    },
    crossImg:{
        width:17,
        height:17,
        marginRight:'20%'
    },
    heading:{
        fontSize:SIZES.preMedium,
        fontWeight:'bold',
        color:"black",
    },
    simpleText:{
        color:COLORS.textLightGrey,
        fontSize:SIZES.small,
        width:'80%',
        marginBottom:20
    },
    simpleInput:{
        borderColor:COLORS.inputBorder,
        borderWidth:1,
        borderRadius:10,
        width:'80%',
        marginBottom:20,
        height:50,
        padding:15,
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5
    },
    dateDiv:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        borderColor:COLORS.inputBorder,
        borderWidth:1,
        borderRadius:10,
        width:'100%',
        marginBottom:20,
        height:50,
        padding:15,
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5
    },
    dateDivText:{
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5,
        marginRight:'35%'
    },
    firstName:{
        borderColor:COLORS.inputBorder,
        borderWidth:1,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        width:'80%',
        marginBottom:0,
        height:50,
        padding:15,
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5
    },
    lastName:{
        borderColor:COLORS.inputBorder,
        borderWidth:1,
        borderTopWidth:0,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        width:'80%',
        marginBottom:20,
        height:50,
        padding:15,
        color:COLORS.inputBorder,
        fontSize:SIZES.preMedium,
        opacity:0.5
    },
    linkText:{
        fontWeight:'bold',
        textDecorationLine:'underline',
        
    },
    submitBtn:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        backgroundColor:COLORS.inputBorder,
        borderRadius:10,
        height:50,
        paddingHorizontal:80,
        marginTop:10
    },
    submitText:{
        color:'white',
        fontWeight:'bold',
        fontSize:SIZES.medium
    }
})