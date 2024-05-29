import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useState} from 'react';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../../../../constants/themes';
import Icon from 'react-native-vector-icons/MaterialIcons'; //0
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; //1
import Icon3 from 'react-native-vector-icons/Foundation'; //2
import axios from 'axios';
import CheckInOut from './CheckInOut';

const RateHawk = ({hotelId, item, setOpen, navigation}) => {
  const [hotelDetails, setHotelDetails] = useState({});
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [calenderPage, setcalenderPage] = useState(false);

  const baseUrl = 'http://localhost:5000/api/v1/hotel/RateHawk/getHotelInfo';

  const serachData = {
    hotelId,
    language: 'en',
  };

  useEffect(() => {
    axios
      .post(baseUrl, serachData)
      .then(response => {
        console.log(response.data);
        setHotelDetails(response.data.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, [hotelId]); // add hotelId as a dependency to re-fetch if it changes

  useEffect(() => {
    if (hotelDetails?.description_struct) {
      console.log(hotelDetails.description_struct[0]);
      setDescription(hotelDetails.description_struct[0].paragraphs[0]);
    } else {
      console.log('hotelDetails or description_struct is undefined');
    }
  }, [hotelDetails]); // add hotelDetails as a dependency to log whenever it updates

  const amenitiesList = [
    {name: 'Pool', icon: 'pool', class: 0},
    {name: 'Hot tub', icon: 'hot-tub', class: 0},
    {name: 'Kitchen', icon: 'kitchen', class: 0},
    {name: 'Outdoor dining area', icon: 'dining', class: 0},
    {name: 'Smoke Alarm', icon: 'smoke-detector-variant', class: 1},
    {name: 'Parking', icon: 'car', class: 1},
    {name: 'Gym', icon: 'dumbbell', class: 1},
  ];

  const defaultImg = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/rentspace-e58b7.appspot.com/o/hotelImage%2F1715757730736?alt=media&token=76fd4072-38ae-437c-b3fe-4b1f857ec4d8',
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          animating={true}
          size={40}
          color={COLORS.mainPurple}
          style={styles.loader}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Icon1
          name="left"
          size={25}
          style={{padding: 10, backgroundColor: COLORS.mainGrey}}
          onPress={() => setOpen(false)}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image style={styles.hotelImage} source={defaultImg} />
          </View>
          <View style={styles.hotelInfo}>
            <Text style={styles.hotelName}>
              {/* Charm Ville - Villa with Nature! FarmVilla n Hosur */}
              {hotelDetails.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Icon1 name="star" size={17} style={{color: COLORS.mainPurple}} />
              <Text style={styles.ratingText}>4.92</Text>
              <Text style={styles.ratingText}>• 432 reviews</Text>
            </View>
            <Text style={styles.ratingText2}>{hotelDetails.address}</Text>
          </View>
          <View style={styles.verificationTag}>
            <Icon
              name="verified"
              size={15}
              style={{color: COLORS.mainPurple}}
            />
            <Text style={styles.verificationTagText}>Verified By Ratehawk</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.showMoreBtn}>Show more</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {amenitiesList.map((item, index) => {
                const IconComponent =
                  item.class === 0 ? Icon : item.class === 1 ? Icon2 : Icon3;
                return (
                  <TouchableOpacity
                    style={styles.amenities}
                    key={index}
                    onPress={() => updateAmenities(item)}>
                    <IconComponent
                      name={item.icon}
                      style={styles.amenityIcon}
                    />
                    <Text style={styles.amenityText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.bottomLink}>
            <View style={styles.bottomLinkHead}>
              <Text style={styles.bottomLinkText}>Staying rules</Text>
            </View>
            <Text style={[styles.bottomLinkSubText2, {marginVertical: 2}]}>
              Check In : {hotelDetails.check_in_time}
            </Text>
            <Text style={[styles.bottomLinkSubText2, {marginVertical: 2}]}>
              Check Out : {hotelDetails.check_out_time}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.reserveBtn}
            onPress={() => {
              setcalenderPage(true);
            }}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.medium,
                fontWeight: 'bold',
              }}>
              Select Room
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={calenderPage}
          onRequestClose={() => setcalenderPage(false)}>
          {/* <RoomList hotelId={hotelId}/> */}
          <CheckInOut
            hotelId={hotelId}
            hotelName={hotelDetails.name}
            hotelAddress={hotelDetails.address}
          />
        </Modal>

        {/* <ActivityIndicator animating={true} size={40} color={COLORS.mainPurple} style={styles.loader}/> */}
      </View>
    );
  }

};

export default RateHawk;

const styles = StyleSheet.create({
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  loader: {
    position: 'absolute',
    top: '40%',
    marginHorizontal: '50%',
  },

  container: {
    backgroundColor: COLORS.mainGrey,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  scrollView: {
    backgroundColor: COLORS.mainGrey,
    marginBottom: 20,
  },

  imageContainer: {
    width: '100%',
    height: 240,
    backgroundColor: COLORS.white,
  },

  hotelImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  hotelInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: 10,
  },

  hotelName: {
    fontSize: SIZES.large,
    fontWeight: '500',
    color: COLORS.black,
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 40,
    // backgroundColor:'red'
  },

  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    paddingHorizontal: 40,
  },

  ratingText: {
    fontSize: SIZES.small,
    fontWeight: '400',
    color: COLORS.black,
  },

  ratingText2: {
    fontSize: SIZES.small,
    fontWeight: '400',
    color: COLORS.textLightGrey,
    marginVertical: 5,
    marginLeft: 40,
    // backgroundColor:'red',
  },

  verificationTag: {
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
    width: 155,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    borderRadius: 25,
    marginLeft: 35,
    padding: 5,
  },

  verificationTagText: {
    color: COLORS.mainPurple,
    fontSize: SIZES.small,
    fontWeight: '700',
  },

  descriptionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  descriptionTitle: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: '500',
    marginBottom: 10,
  },

  description: {
    fontSize: SIZES.preMedium,
    color: COLORS.textLightGrey,
    fontWeight: '400',
    marginBottom: 10,
  },

  showMoreBtn: {
    fontSize: SIZES.medium,
    color: COLORS.textLightGrey,
    fontWeight: '500',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },

  amenitiesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  amenities: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 80,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.mainPurple,
  },

  amenityIcon: {
    color: COLORS.textLightGrey,
    fontSize: SIZES.large,
    alignItems: 'baseline',
    justifyContent: 'center',
  },

  amenityText: {
    color: COLORS.textLightGrey,
    fontSize: SIZES.preMedium,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },

  bottomLink: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },

  bottomLinkHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  bottomLinkText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: '500',
  },

  bottomLinkSubText: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: '400',
    marginHorizontal: 20,
  },

  bottomLinkSubText2: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: '400',
    marginHorizontal: 20,
  },

  showMoreBtn2: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },

  reserveBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: COLORS.mainPurple,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    color: COLORS.white,
  },
});
