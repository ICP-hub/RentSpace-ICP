import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {SIZES, COLORS} from '../../../../../../../constants/themes';
import ReviewCard from './ReviewCard';
import AllReviews from './AllReviews';

const reviews = require('./sampleReviews.json');

const itemSample = {
  title: 'Great place',
  des: 'Loved every second of the stay, great hospitality',
  rating: 4,
};

const Reviews = ({hotelReviews,hotelRating}) => {
  console.log("reviews : ",hotelReviews)
  const [showReview, setShowReviews] = useState(false);
  return (
    <View style={styles.reviewCont}>
      <View style={styles.headerCont}>
        <Icon name="star" size={16} color={COLORS.black} />
        <Text style={styles.reviewText}>{hotelRating} • {hotelReviews.length} {hotelReviews.length==1?"review":"reviews"}</Text>
      </View>
      {/* {reviews.map(r => {
        console.log('review element : ', r);
      })} */}
      {reviews?.length == 0 ? (
        <Text style={styles.empty}>No Reviews to show yet</Text>
      ) : (
        // <ReviewCard item={itemSample}/>
        <FlatList
          contentContainerStyle={styles.list}
          data={hotelReviews}
          renderItem={item => <ReviewCard item={item?.item} />}
          horizontal
        />
      )}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setShowReviews(!showReview);
        }}>
        <Text style={styles.btnText}>Show all reviews</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={showReview}>
        <AllReviews setShowReviews={setShowReviews} reviews={hotelReviews} />
      </Modal>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  reviewCont: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
  },
  headerCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
  },
  reviewText: {
    fontWeight: '600',
    color: COLORS.black,
    fontSize: SIZES.preMedium,
    marginLeft: 10,
  },
  btn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderWidth: 1.2,
    borderColor: COLORS.black,
    borderRadius: 12,
    paddingVertical: 10,
    zIndex: 10,
    marginBottom: 0,
  },
  btnText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  empty: {
    width: '100%',
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: '300',
    // backgroundColor:COLORS.black,
    textAlign: 'center',
    marginVertical: 40,
  },
});
