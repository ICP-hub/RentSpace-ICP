import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../../../../constants/themes';
import {images} from '../../../../../../constants';
import Icon2 from 'react-native-vector-icons/AntDesign';

const HostBand = ({rooms, hostData, hotelRating, hotelReviews}) => {
  const userImg = hostData?.userImage;
  console.log(rooms);
  return (
    <View style={styles.band}>
      <View style={{display: 'flex', flexDirection: 'row', width:'90%', marginBottom:5}}>
        <Icon2
          name="star"
          size={12}
          color={COLORS.black}
          style={{marginRight: 5}}
        />
        <Text style={styles.ratingBand}>
          {hotelRating} • {hotelReviews.length}{' '}
          {hotelReviews.length == 1 ? 'review' : 'reviews'}
        </Text>
      </View>
      <View style={styles.subCont}>
        <Image source={{uri: userImg}} style={styles.img} />
        <View style={styles.TextCont}>
          <Text style={styles.Title}>
            Entire place hosted by {hostData?.firstName}!
          </Text>
          <Text style={styles.simpleText}>{rooms.length} bedrooms</Text>
        </View>
      </View>
    </View>
  );
};

export default HostBand;

const styles = StyleSheet.create({
  band: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    elevation: 5,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  ratingBand: {
    color: COLORS.black,
    fontSize: SIZES.small,
    fontWeight: '400',
    width: '90%',
  },
  subCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // height: '100%',
    width: '90%',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 20,
  },
  TextCont: {
    display: 'flex',
    flexDirection: 'column',
    height: 52,
    width: '70%',
    gap: 5,
    // justifyContent: 'space-between',
  },
  Title: {
    color: COLORS.black,
    fontSize: SIZES.preMedium,
    fontWeight: 'bold',
  },
  simpleText: {
    color: COLORS.black,
    fontSize: SIZES.xSmall,
    width: '90%',
  },
});
