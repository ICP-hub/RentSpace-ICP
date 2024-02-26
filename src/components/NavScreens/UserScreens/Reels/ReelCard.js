import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS,SIZES } from '../../../../constants/themes'
import Icon from'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome5'
import Video from 'react-native-video'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider,BottomSheetModal } from '@gorhom/bottom-sheet'
import Comments from './Comments/Comments'
import { useSelector } from 'react-redux'
import { Principal } from '@dfinity/principal'
import axios from 'axios'

const months=[
    "January","Febraury","March","April","May","June","July","August","September","October","November","December"
]

const ReelCard = ({item}) => {
    const [likeDisabled,setLikeDisabled]=useState(false)
    const {user}=useSelector(state=>state.userReducer)
    const {principle}=useSelector(state=>state.principleReducer)
    const [liked,setLiked]=useState(item?.likedBy.includes(principle)==true)
    const btmSheetComments=useRef(null)
    const {actors}=useSelector(state=>state.actorReducer)
    const [reelComments,setReelComments]=useState([])
    const baseURL="https://rentspace.kaifoundry.com"
    const openComments=()=>{
        btmSheetComments.current.present()
    }

  const getComments=async()=>{
    console.log(actors?.commentActor)
    // console.log(item.hotelId)
    const comments=[]
    await actors?.commentActor?.getComments(item?.hotelId).then((res)=>{
        console.log("comment resp : ",res)
        let newRes=[]
        res.map((r)=>{
            if(r[1].parentCommentId==""){
                newRes.push(r)
            }
        })
        console.log('newRes',newRes.length)
        res.map((r)=>{
            if(newRes.indexOf(r)==-1){
                // console.log(newRes.indexOf(r[1].id))
                newRes.push(r)
            }
        })
        let rootCount=0
        let replyCount=0
        console.log('newRes',newRes.length)
        newRes.map(async(r)=>{
            
            await actors?.userActor?.getUserInfoByPrincipal(Principal.fromText(r[1].userId)).then((userRes)=>{
                console.log(userRes)
                const date=new Date(r[1].createdAt)
                const dateString=`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
                console.log(dateString)
                const newComment={
                    id:r[0],
                    user:`${userRes[0].firstName} ${userRes[0].lastName}`,
                    text:r[1].comment,
                    date:dateString,
                    userId:r[1].userId,
                    hotelId:r[1].hotelId,
                    parentCommentId:r[1].parentCommentId,
                    replies:[]
                }
                console.log(newComment)
                if(newComment.parentCommentId==""){
                    comments.push(newComment)
                    rootCount+=1
                    // console.log("comments:",comments)
                }else{
                    let index=-1
                    comments.map((comment)=>{
                        
                        if(comment.id==newComment.parentCommentId){
                            index=comments.indexOf(comment)
                            console.log('found index',index)
                        }
                    })
                    if(index!=-1){
                        comments[index]={...comments[index],replies:[...comments[index].replies,newComment]}
                        // comments[index].replies?.push(newComment)
                        console.log(index,comments[index])
                        replyCount+=1
                    }else{
                        comments.push(newComment)
                    }
                    // console.log("comments:",comments)
                }
                
            }).catch((err)=>console.log(err))
            
        })
        setReelComments(comments)
        console.log(comments.length,rootCount,replyCount)
    }).catch((err)=>{
        console.log("err fetching comments : ",err)
    })
  }

  const updateLike=async()=>{
    setLiked(!liked)
    setLikeDisabled(true)
    await axios.patch(`${baseURL}/api/v1/updateLikesOnHotel`,{user:principle,hotelId:item?.hotelId}).then((res)=>{
        console.log("updated like : ",res)
        console.log(item?.likedBy.includes(principle))
        setLikeDisabled(false)
    }).catch((err)=>{
        setLikeDisabled(false)
        console.log(err)
    })
    
  }

  useEffect(()=>{
    // getComments()
    console.log("running useEffect reels")
  },[])

  return (

      <View style={styles.reel}>

          <Video
              source={{ uri: item?.videoUrls[0]?.url }}
              resizeMode="cover"
              pause={false}
              style={styles.bg}
              repeat={true}
          />
          {/* <Image source={images.reelBG} style={styles.bg}/>  */}
          <View style={styles.iconCont}>
              <TouchableOpacity style={styles.icon} disabled={likeDisabled} onPress={updateLike} > 
                  {
                      liked ?
                          <Icon name='heart' color={'red'} size={25} />
                          :
                          <Icon name='hearto' color={'white'} size={25} />
                  }

              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={()=>getComments()}>
                  <Icon name='plus' color={'white'} size={25} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={openComments}>
                  <Icon2 name='chatbubble-ellipses-outline' color={'white'} size={25} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.bigIcon}>
                  <Icon3 name='film' color={'white'} size={22} />
              </TouchableOpacity>
          </View>
          <View style={styles.infoCont}>
              <Text style={styles.infoTitle}>{item?.hotelName}</Text>
              <Text style={styles.infoText}>499 kilometers away</Text>
              <Text style={styles.infoText}>1-6 Dec</Text>
              <Text style={styles.infoText}>
                  <Text style={{ fontWeight: 'bold' }}>
                      ${item?.price}
                  </Text>
                  {" "}
                  night
              </Text>
          </View>
            <BottomSheetModal 
                ref={btmSheetComments}
                index={0}
                snapPoints={["95%"]}>
                <Comments item={item} comments={reelComments} getComments={getComments}/>
            </BottomSheetModal>
        </View>
  )
}

export default ReelCard

const styles = StyleSheet.create({
    reel:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:COLORS.darkPurple
    },
    iconCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
        height:'32%',
        width:50,
        position:'absolute',
        bottom:'7%',
        right:'3%',
    },
    infoCont:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        position:'absolute',
        bottom:'10%',
        left:'8%',
        padding:5
    },
    infoTitle:{
        color:'white',
        fontSize:SIZES.large-1,
        fontWeight:'500',
        marginBottom:10
    },
    infoText:{
        color:'white',
        fontSize:SIZES.preMedium,
        fontWeight:'300',
        marginBottom:1
    },
    icon:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:40,
        height:40,
        borderRadius:30,
    },
    bigIcon:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:45,
        height:45,
        borderRadius:30,
        backgroundColor:COLORS.hostTitle,
        marginVertical:15
    },
    bg:{
        width:'100%',
        height:'100%',
        // objectFit:'cover',
    }
})