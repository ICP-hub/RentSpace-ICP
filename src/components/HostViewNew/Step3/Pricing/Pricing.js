import { StyleSheet, Text, View,TextInput, Alert, ScrollView, Dimensions, Modal } from 'react-native'
import React, { useState } from 'react'
import { SIZES,COLORS } from '../../../../constants/themes'
import SaveBtn from '../../Reusables/SaveBtn'
import BottomBtn from '../../Reusables/BottomBtn'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import { useDispatch, useSelector } from 'react-redux'
import { setListing } from '../../../../redux/NewListing/actions'
import MethodOption from './MethodOption'
import GetWalletId from './GetWalletId'



const methods=[
    {
      label:'ckEth',
      icon:<Icon name='ethereum' color={COLORS.textLightGrey} size={30}/>
    },
    {
      label:'applePay',
      icon:<Icon name='apple-pay' color={COLORS.textLightGrey} size={30}/>
    },
    {
      label:'ICP',
      icon:<Text style={{color:COLORS.textLightGrey,fontWeight:'bold',fontSize:SIZES.largeMed}}>ICP</Text>
    },
    {
      label:'gPay',
      icon:<Icon name='google-pay' color={COLORS.textLightGrey} size={26}/>
    },
    {
      label:'ckBTC',
      icon:<Icon name='btc' color={COLORS.textLightGrey} size={25}/>
    },
    {
      label:'creditCard',
      icon:<Icon name='credit-card' color={COLORS.textLightGrey} size={25}/>
    },
    {
      label:'SOL',
      icon:<Text style={{color:COLORS.textLightGrey,fontWeight:'bold',fontSize:SIZES.largeMed}}>SOL</Text>
    }
  ]

const Pricing = ({setHostModal,pos}) => {
    const [price,setPrice]=useState(0)
    const {listing}=useSelector(state=>state.listingReducer)
    const dispatch=useDispatch()
    const [paymentMethods,setPaymentMethods]=useState([])
    const [walletIDModal,setWalletIDModal]=useState(false)
    const [phantomAccID,setPhantomAccID]=useState("")
    const [phantomAccIDValidated,setPhantomAccIDValidated]=useState(false)

    const chechSol=()=>{
        if(paymentMethods.includes('SOL') && !(phantomAccIDValidated)){
         console.log("sol is selected")
         setWalletIDModal(true)
         return false
        }else{
            return checkEmpty()
        }
    }

    const checkEmpty=()=>{
        if(price==0){
            Alert.alert("No price selected","You cannot add a listing for free! Please add a price for it")
            return false
        }
        else if(paymentMethods.length==0){
            Alert.alert('No payment method selected',"Add atleast one payment method through which you are willing to accept payments")
        }
        else{
            dispatch(setListing({...listing,hotelPrice:price.toString()}))
            return true
        }
    }
    
  return (
    <View style={styles.view}>
      <SaveBtn setHostModal={setHostModal}/>
      <ScrollView contentContainerStyle={{
        width:Dimensions.get('window').width,
        paddingBottom:'30%',
      }}>
        <Text style={styles.title}>
        Now, set your priceand payment method
        </Text>
        <View style={styles.subView}>
        <Text style={styles.title}>Accept payment in</Text>
        <Text style={styles.text}>You can change it any time</Text> 
        <View style={styles.methodCont}>
            {
            methods.map((item,index)=>(
                <MethodOption item={item} key={index} setMethod={setPaymentMethods} method={paymentMethods}/>
            ))
            }
        </View> 
        <Text style={styles.title}>Now, set your price</Text>
        <Text style={styles.text}>You can change it any time as well</Text>
            <View style={styles.priceCont}>
                <TextInput 
                style={styles.bigText}
                value={`$${price}`}
                onChangeText={(value)=>{setPrice(value.substring(1))}}
            />
                <Icon2 name='pencil' size={12} color={COLORS.textLightGrey} />
            </View>
        <View style={styles.pricingCard}>
            <View style={styles.pricingRow}>
                <Text style={styles.pricingNormal}>Base price</Text>
                <Text style={styles.pricingNormal}>${price}</Text>
            </View>
            <View style={styles.pricingRow}>
                <Text style={styles.pricingNormal}>Guest service fee</Text>
                <Text style={styles.pricingNormal}>${99}</Text>
            </View>
            <View style={styles.DarkLine}/>
            <View style={styles.pricingRow}>
                <Text style={styles.pricingBold}>Guest price before taxes</Text>
                <Text style={styles.pricingBold}>${Number(price)+99}</Text>
            </View>
        </View>
        <View style={styles.earningCard}>
            <Text style={styles.earningText}>You earn</Text>
            <Text style={styles.bigText}>${(price<200)?0:price-200}</Text>
        </View>
            </View>
      </ScrollView>
      
      <BottomBtn setHostModal={setHostModal} pos={pos} step={3} nextFunc={chechSol} />
      <Modal transparent visible={walletIDModal} onRequestClose={()=>{
        setWalletIDModal(false)
      }}>
        <GetWalletId 
            phantomAccID={phantomAccID} 
            setPhantomAccID={setPhantomAccID} 
            setPhantomAccIDValidated={setPhantomAccIDValidated} 
            setWalletIDModal={setWalletIDModal}
        />
      </Modal>
    </View>
  )
}

export default Pricing

const styles = StyleSheet.create({
    view:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'100%',
        height:'100%',
    },
    subView:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        // backgroundColor:'red',
        width:'100%'
    },
    title:{
        width:'85%',
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:5,
        marginLeft:'8%'
    },
    text:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        width:'85%',
        marginLeft:'7.5%',
        marginBottom:10
    },
    bigText:{
        color:COLORS.hostTitle,
        fontSize:SIZES.xxLarge,
        fontWeight:'500',
        marginBottom:5,
        paddingVertical:0
    },
    priceCont:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginLeft:'7.5%',
        
    },
    pricingCard:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'88%',
        marginLeft:'6%',
        borderWidth:1,
        borderRadius:10,
        paddingTop:15,
        borderColor:COLORS.textLightGrey,
        marginVertical:30,
        // backgroundColor:'blue'
    },
    pricingRow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        marginBottom:15,
    },
    pricingNormal:{
        fontSize:SIZES.preMedium,
        color:COLORS.textLightGrey,
        opacity:0.5
    },
    pricingBold:{
        fontSize:SIZES.preMedium,
        color:COLORS.black,
        fontWeight:'bold'
    },
    DarkLine:{
        height:1,
        backgroundColor:COLORS.textLightGrey,
        width:'90%',
        marginBottom:15
    },
    earningCard:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'40%',
        borderColor:COLORS.textLightGrey,
        borderWidth:1,
        marginLeft:'30%',
        borderRadius:10 
    },
    earningText:{
        color:COLORS.black,
        fontSize:SIZES.xLarge,
        fontWeight:'bold'
    },
    methodCont:{
        width:'80%',
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',  
        columnGap:8,
        rowGap:8,
        paddingBottom:5,
        marginLeft:'7.5%',
        marginVertical:10
      }
})