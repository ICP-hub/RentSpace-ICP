import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../../constants/themes'
import { images } from '../../../../../constants'
import ReplyCard from './ReplyCard'

const CommentCard = ({item,setParent,comRef}) => {

    const reply=()=>{
        setParent(item?.id)
        // Keyboard.emit()
        comRef.current.focus()
        console.log(item?.id)
    }

  return (
    <View style={styles.card}>
      <Image source={images.profileSample} style={styles.img}/>
      <View style={styles.textCont}>
        <Text style={styles.headText}>{item.user}  •  {item.date}</Text>
        <Text style={styles.normalText}>
            {item.text}
        </Text>
        <TouchableOpacity onPress={reply}>
            <Text style={styles.linkText}>Reply</Text>
        </TouchableOpacity>
        {
            item?.replies?.length>0?
            item?.replies.map((reply,index)=>{
                return(
                    <ReplyCard item={reply} key={index}/>
                )
            }):
            <></>
        }
      </View>
    </View>
  )
}

export default CommentCard

const styles = StyleSheet.create({
    card:{
        width:'85%',
        backgroundColor:'white',
        marginVertical:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        // zIndex:100
    },
    img:{
        width:40,
        height:40,
        borderRadius:30,
        marginRight:'3%'
    },
    textCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        width:'90%'
    },
    headText:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        opacity:0.7,
        fontWeight:'600'
    },
    normalText:{
        fontSize:SIZES.small,
        color:COLORS.black,
        fontWeight:'300'
    },
    linkText:{
        fontSize:SIZES.small,
        color:COLORS.textLightGrey,
        opacity:0.7,
        fontWeight:'400',
        textDecorationLine:'underline'
    }
})