import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, SIZES} from '../../../../constants/themes';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';
import Comments from './Comments/Comments';
import {useSelector} from 'react-redux';
import {Principal} from '@dfinity/principal';
import axios from 'axios';

const months = [
  'January',
  'Febraury',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ReelCard = ({item, reelIndex}) => {
  const [likeDisabled, setLikeDisabled] = useState(false);
  const {user} = useSelector(state => state.userReducer);
  const {principle} = useSelector(state => state.principleReducer);
  const [liked, setLiked] = useState(item?.likedBy.includes(principle));
  const btmSheetComments = useRef(null);
  const {actors} = useSelector(state => state.actorReducer);
  const [reelComments, setReelComments] = useState([]);
  const [loading, setLoading] = useState(false);
  // const baseURL="https://rentspace.kaifoundry.com"
  const baseURL = 'http://localhost:5000';
  const openComments = () => {
    btmSheetComments.current.present();
  };
  const sortCreatedAt = arr => {
    const tempArr = arr;
    tempArr.sort((a, b) => {
      const date1 = new Date(a[1].createdAt);
      const date2 = new Date(b[1].createdAt);
      return date1.getTime() - date2.getTime();
    });
    return tempArr;
  };

  const getComments = async () => {
    setLoading(true);

    const comments = [];
    await actors?.commentActor
      ?.getComments(item?.hotelId)
      .then(res => {
        let newRes = [];
        res.map(r => {
          if (r[1].parentCommentId == '') {
            newRes.push(r);
          }
        });
        res.map(r => {
          if (newRes.indexOf(r) == -1) {
            newRes.push(r);
          }
        });
        let rootCount = 0;
        let replyCount = 0;
        newRes = sortCreatedAt(newRes);
        console.log('nes', newRes);
        newRes.map(async r => {
          setLoading(true);
          await actors?.userActor
            ?.getUserInfoByPrincipal(Principal.fromText(r[1].userId))
            .then(userRes => {
              const date = new Date(r[1].createdAt);
              const dateString = `${date.getDate()} ${
                months[date.getMonth()]
              } ${date.getFullYear()}`;
              const newComment = {
                id: r[0],
                user: `${userRes[0].firstName} ${userRes[0].lastName}`,
                text: r[1].comment,
                date: dateString,
                userId: r[1].userId,
                hotelId: r[1].hotelId,
                parentCommentId: r[1].parentCommentId,
                replies: [],
              };
              if (newComment.parentCommentId == '') {
                comments.push(newComment);
                rootCount += 1;
                setLoading(false);
                setReelComments([...comments]);
              } else {
                let index = -1;
                comments.map(comment => {
                  if (comment.id == newComment.parentCommentId) {
                    index = comments.indexOf(comment);
                  }
                });
                if (index != -1) {
                  comments[index] = {
                    ...comments[index],
                    replies: [...comments[index].replies, newComment],
                  };
                  replyCount += 1;
                  setReelComments([...comments]);
                  setLoading(false);
                } else {
                  comments.push(newComment);
                  setReelComments([...comments]);
                  setLoading(false);
                }
              }
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
            });
        });
        console.log(comments.length, rootCount, replyCount);
        return comments;
      })
      .catch(err => {
        console.log('err fetching comments : ', err);
        setLoading(false);
      });
  };

  const updateLike = async () => {
    setLiked(!liked);
    setLikeDisabled(true);
    await axios
      .patch(`${baseURL}/api/v1/updateLikesOnHotel`, {
        user: principle,
        hotelId: item?.hotelId,
      })
      .then(res => {
        console.log('updated like : ', res.data);
        console.log('includes principal : ', item?.likedBy.includes(principle));
        setLikeDisabled(false);
      })
      .catch(err => {
        setLikeDisabled(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setLiked(item?.likedBy.includes(principle));
  }, [reelIndex]);

  return (
    <View style={styles.reel}>
      <Video
        source={{uri: item?.videoUrls}}
        resizeMode="cover"
        pause={false}
        style={styles.bg}
        repeat={true}
      />
      <View style={styles.iconCont}>
        <TouchableOpacity
          style={styles.icon}
          disabled={likeDisabled || user?.firstName == undefined}
          onPress={updateLike}>
          {liked ? (
            <Icon name="heart" color={COLORS.mainPurple} size={25} />
          ) : (
            <Icon name="hearto" color={COLORS.white} size={25} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={user?.firstName == undefined}
          style={styles.icon}
          onPress={() => {
            getComments();
            console.log('liked by ', item?.likedBy.includes(principle));
          }}>
          <Icon name="plus" color={COLORS.white} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={openComments}
          disabled={user?.firstName == undefined}>
          <Icon2
            name="chatbubble-ellipses-outline"
            color={COLORS.white}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bigIcon}
          disabled={user?.firstName == undefined}>
          <Icon3 name="film" color={COLORS.white} size={22} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoCont}>
        <Text style={styles.infoTitle}>{item?.hotelName}</Text>
        <Text style={styles.infoText}>499 kilometers away</Text>
        <Text style={styles.infoText}>1-6 Dec</Text>
        <Text style={styles.infoText}>
          <Text style={{fontWeight: 'bold'}}>${item?.price}</Text> night
        </Text>
      </View>
      <BottomSheetModal ref={btmSheetComments} index={0} snapPoints={['95%']}>
        <Comments
          id={item?.hotelId}
          comments={reelComments}
          getComments={getComments}
          loading={loading}
          setLoading={setLoading}
        />
      </BottomSheetModal>
      <ActivityIndicator animating={true} style={styles.loader} size={40} />
    </View>
  );
};

export default ReelCard;

const styles = StyleSheet.create({
  reel: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: COLORS.mainGrey,
  },
  iconCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '32%',
    width: 50,
    position: 'absolute',
    bottom: '7%',
    right: '3%',
    zIndex: 10,
  },
  infoCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: '10%',
    left: '8%',
    padding: 5,
    zIndex: 5,
  },
  infoTitle: {
    color: 'white',
    fontSize: SIZES.large - 1,
    fontWeight: '500',
    marginBottom: 10,
  },
  infoText: {
    color: 'white',
    fontSize: SIZES.preMedium,
    fontWeight: '300',
    marginBottom: 1,
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    zIndex: 5,
  },
  bigIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: COLORS.mainPurple,
    marginVertical: 15,
    zIndex: 5,
  },
  bg: {
    width: '100%',
    height: '100%',
    // objectFit:'cover',
    zIndex: 5,
  },
  loader: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    zIndex: 0,
  },
});
