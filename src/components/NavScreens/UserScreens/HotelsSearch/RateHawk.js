import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRef, useEffect} from 'react';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {container} from 'webpack';
import {COLORS, SIZES} from '../../../../constants/themes';
import Icon from 'react-native-vector-icons/MaterialIcons'; //0
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; //1
import Icon3 from 'react-native-vector-icons/Foundation'; //2
import {TouchableOpacity} from 'react-native-gesture-handler';
import Reviews from './HotelDetails/subComponents/Reviews/Reviews';
import ReserveBtn from './HotelDetails/cards/ReserveBtn';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const RateHawk = ({setHotelProfile}) => {
  const btmBtn = useRef(null);

  useEffect(() => {
    btmBtn.current.present();
  }, []);


  const amenitiesList = [
    {name: 'Pool', icon: 'pool', class: 0},
    // {name: 'Outdoor shower', icon: 'shower', class: 0},
    {name: 'Hot tub', icon: 'hot-tub', class: 0},
    {name: 'Kitchen', icon: 'kitchen', class: 0},
    // {name: 'TV', icon: 'tv', class: 0},
    {name: 'Outdoor dining area', icon: 'dining', class: 0},
    // {name: 'Lake access', icon: 'houseboat', class: 0},
    // {name: 'Workspace', icon: 'computer', class: 0},
    // {name: 'Wifi', icon: 'wifi', class: 0},
    // {name: 'Beach access', icon: 'beach-access', class: 0},
    // {name: 'Skii in/out', icon: 'downhill-skiing', class: 0},
    {name: 'Smoke Alarm', icon: 'smoke-detector-variant', class: 1},
    // {name: 'Patios', icon: 'balcony', class: 1},
    // {name: 'Washing Machine', icon: 'washing-machine', class: 1},
    // {name: 'BBQ grill', icon: 'grill', class: 1},
    {name: 'Parking', icon: 'car', class: 1},
    // {name: 'Fire extinguisher', icon: 'fire-extinguisher', class: 1},
    // {name: 'indoor fireplace', icon: 'fireplace', class: 1},
    // {name: 'AC', icon: 'air-conditioner', class: 1},
    {name: 'Gym', icon: 'dumbbell', class: 1},
    // {name: 'Pool table', icon: 'billiards', class: 1},
    // {name: 'Piano', icon: 'piano', class: 1},
    // {name: 'Safe', icon: 'safe', class: 1},
    // {name: 'First Aid Kit', icon: 'first-aid', class: 2},
  ];

  return (
    <BottomSheetModalProvider style={styles.container}>
      <Icon1
        name="left"
        size={25}
        style={{padding:10, backgroundColor: COLORS.mainGrey}}
        onPress={() => setHotelProfile(false)}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.hotelImage}
            source={require('../../../../assets/images/hostView/hotelImg4.png')}
          />
        </View>
        <View style={styles.hotelInfo}>
          <Text style={styles.hotelName}>
            Charm Ville - Villa with Nature! FarmVilla n Hosur
          </Text>
          <View style={styles.ratingContainer}>
            <Icon1 name="star" size={17} style={{color: COLORS.mainPurple}} />
            <Text style={styles.ratingText}>4.92</Text>
            <Text style={styles.ratingText}>• 432 reviews</Text>
            <Text style={styles.ratingText}>• Ubdu, Bai, Indonesia</Text>
          </View>
        </View>
        <View style={styles.verificationTag}>
          <Icon name="verified" size={15} style={{color: COLORS.mainPurple}} />
          <Text style={styles.verificationTagText}>Verified By Ratehawk</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            A sleepover in Villa surrounded by agricultural land, where you get
            to enjoy Wakeup calls from birds, Lotus breaks the surface of the
            water and blooms untouched by the mud with sunshine.
          </Text>
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
                  <IconComponent name={item.icon} style={styles.amenityIcon} />
                  <Text style={styles.amenityText}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Reviews />

        {/* <View style={styles.bottomLink}>
          <View style={styles.bottomLinkHead}>
            <Text style={styles.bottomLinkText}>Availability</Text>
            <Icon1 name="right" size={20} />
          </View>
          <Text style={styles.bottomLinkSubText}>17-22 Dec</Text>
        </View>
        <View style={styles.bottomLink}>
          <View style={styles.bottomLinkHead}>
            <Text style={styles.bottomLinkText}>Cancellation policy</Text>
            <Icon1 name="right" size={20} />
          </View>
          <Text style={styles.bottomLinkSubText2}>
            Free cancellation before{' '}
            <Text style={{fontWeight: 'bold'}}>19 Dec</Text>.
          </Text>
          <Text style={styles.bottomLinkSubText2}>
            Reviews the host full cancelation policy which applies even if you
            cancel for illness or disruptions caused by COVID-19.
          </Text>
        </View>
        <View style={styles.bottomLink}>
          <View style={styles.bottomLinkHead}>
            <Text style={styles.bottomLinkText}>Staying rules</Text>
            <Icon1 name="right" size={20} />
          </View>
          <Text style={[styles.bottomLinkSubText2, {marginVertical: 2}]}>
            Check-in:14:00 - 17:00
          </Text>
          <Text style={[styles.bottomLinkSubText2, {marginVertical: 2}]}>
            Check-out before:11:00
          </Text>
          <Text style={[styles.bottomLinkSubText2, {marginVertical: 2}]}>
            4 guests maximum
          </Text>
          <Text style={styles.showMoreBtn2}>Show more</Text>
        </View>
        <View style={styles.bottomLink}>
          <View style={styles.bottomLinkHead}>
            <Text style={styles.bottomLinkText}>Safety & property</Text>
            <Icon1 name="right" size={20} />
          </View>
          <Text style={[styles.bottomLinkSubText2, {marginVertical: 2}]}>
            Carbon monoxide alarm not reported
          </Text>
          <Text style={[styles.bottomLinkSubText2, {marginVertical: 2}]}>
            Smoke alarm not reported
          </Text>
          <Text style={styles.showMoreBtn2}>Show more</Text>
        </View>
        <Icon name="report" size={25} style={{marginLeft: 20,color:COLORS.mainPurple}} />
        <Text style={styles.showMoreBtn2}>Report this listing </Text> */}

        <BottomSheetModal
          ref={btmBtn}
          index={0}
          snapPoints={['15%']}
          backgroundStyle={{backgroundColor: COLORS.white}}
          style={{elevation: 20}}>
          <ReserveBtn />
        </BottomSheetModal>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

export default RateHawk;

const styles = StyleSheet.create({
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
    alignItems: 'center',
    marginBottom: 10,
  },

  hotelName: {
    fontSize: SIZES.large,
    fontWeight: '500',
    color: COLORS.black,
    marginHorizontal: 35,
    marginVertical: 10,
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
    marginBottom: 10,
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
});
