import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, COLORS} from '../../../../../../constants/themes';
import {images} from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import HotelDetailPage from '../HotelDetailPage';

const HotelCard = ({item, navigation}) => {
  // console.log(item?.details?.imagesUrls)

  // console.log(item)

  const [open, setOpen] = useState(false);

  // const defaultImg =  "https://firebasestorage.googleapis.com/v0/b/rentspace-e58b7.appspot.com/o/hotelImage%2F1715757730736?alt=media&token=76fd4072-38ae-437c-b3fe-4b1f857ec4d8"
  // const imageurls = item?.details?.imagesUrls === '' || item?.details?.imagesUrls === null || item?.details?.imagesUrls === undefined ? defaultImg : {uri: item?.details?.imagesUrls};

  return (
    <View style={styles.cardCont}>
      <TouchableOpacity
        style={styles.detailLink}
        onPress={() => {
          setOpen(true);
        }}>
        <Icon2 name="page-next" size={30} color="white" />
      </TouchableOpacity>

      {/* <Image source={(item?.details?.imagesUrls==""?images.hotel:{uri:item?.details?.imagesUrls})} style={styles.img}/> */}
      <Image source={{uri : item.details.imagesUrls }} style={styles.img} />
      {/* <Image source={images.hotelImg3} style={styles.img}/> */}
      <View style={styles.dataCont}>
        <Text style={styles.title}>{item.details.hotelName}</Text>
        <Text style={styles.simpleText}>{item.details.hotelDescription}</Text>
        <View style={styles.ratingCont}>
          <Icon name="star" size={15} color="white" />
          <Icon name="star" size={15} color="white" />
          <Icon name="star" size={15} color="white" />
          <Icon name="star" size={15} color="white" />
        </View>
      </View>
      
      <Modal animationType="slide" visible={open}>
        <HotelDetailPage
          item={item}
          setOpen={setOpen}
          navigation={navigation}
        />
      </Modal>
    </View>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  cardCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    paddingVertical: 40,
    backgroundColor: COLORS.darkerPurple,
    marginLeft: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  img: {
    width: 110,
    height: 110,
    borderRadius: 15,
    marginRight: 10,
  },
  dataCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '50%',
    height: 100,
  },
  title: {
    fontSize: SIZES.medium,
    color: 'white',
    fontWeight: 'bold',
  },
  simpleText: {
    opacity: 0.6,
    fontSize: SIZES.small,
    color: 'white',
  },
  ratingCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  detailLink: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
