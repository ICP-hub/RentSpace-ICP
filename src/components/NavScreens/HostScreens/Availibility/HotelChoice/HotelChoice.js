import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {React, useEffect, useState} from 'react';
import {COLORS} from '../../../../../constants/themes';
import BottomNavHost from '../../../../Navigation/BottomNavHost';
import Icon from 'react-native-vector-icons/AntDesign';
import CalendarScreen from '../CalendarScreen/CalendarScreen';
// import {useSelector} from 'react-redux';
import axios from 'axios';

const HotelChoice = ({navigation}) => {

  // const {hotels} = useSelector(state => state.hotelsReducer);
  // const {actors} = useSelector(state => state.actorReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});

  const [hotelList, setHotelList] = useState([]);

  // async function getHotelDetails() {
  //   setHotelList([]);
  //   for (let i = 0; i < hotels?.length; i++) {
  //     await actors.hotelActor?.getHotel(hotels[i]).then(res => {
  //       let newEL={...res[0],id:hotels[i]}
  //       setHotelList(hotelList => [...hotelList,newEL]);
  //       console.log(res[0])
  //     });
  //   }
  // }

  // useEffect(()=>{
  //   getHotelDetails()
  // },[])

  function getHotelDetails() {
    const userPrincipal =
      '2yv67-vdt7m-6ajix-goswt-coftj-5d2db-he4fl-t5knf-qii2a-3pajs-cqe'; // for testing only
    axios
      .get(
        `http://localhost:5000/api/v1/hotel/getAllHotels?userPrincipal=${userPrincipal}`,
      ) // for testing only
      // .get('http://localhost:5000/api/v1/hotel/getAllHotels')  // when userPrincipal is passed in header
      .then(res => {
        // console.log(res.data.hotels);
        setHotelList(res.data.hotels);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getHotelDetails();
  }, []);

  const openCalendarModal = hotel => {
    setSelectedHotel(hotel);
    setModalVisible(true);
  };

  // func to change the date format to dd-mm (25 Dec)
  function changeDateFormat(date) {
    const d = new Date(date);
    const month = d.toLocaleString('default', {month: 'short'});
    return `${d.getDate()} ${month}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Hotel Selection</Text>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainerStyle}>
        {hotelList.map((hotel, index) => {

          const startDate = changeDateFormat(hotel.availableFrom);
          const endDate = changeDateFormat(hotel.availableTill);

          return (
            <View style={styles.listItem}>
              <Image
                style={styles.listItemImage}
                source={{uri: hotel.imagesUrls}}
              />
              <View style={styles.listItemOverlay}>
                <View style={styles.editContainer}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => openCalendarModal(hotel)}>
                    <Icon name="edit" size={20} style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.listItemBottomBar}>
                  <Text style={styles.listItemText}>{hotel.hotelName}</Text>
                  <Text style={styles.dates}>{startDate} - {endDate}</Text>
                  {/* <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                  /> */}
                  {/* BlurView package open an unexpected modal on exit */}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <BottomNavHost navigation={navigation} />

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <CalendarScreen
          item={selectedHotel}
          setModalVisible={setModalVisible}
          getHotelDetails={getHotelDetails}
        />
      </Modal>
    </View>
    
  );
};

export default HotelChoice;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.mainGrey,
    height: '100%',
    width: '100%',
  },

  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    color: COLORS.black,
    padding: 20,
  },

  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginBottom: 70,
  },

  contentContainerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    width: '95%',
    height: 220,
    padding: 10,
    elevation: 15,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: COLORS.white,
  },

  listItemImage: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },

  listItemOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 10,
    height: '100%',
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  editContainer: {
    maxWidth: '100%',
    // backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },

  editIcon: {
    color: COLORS.white,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 10,
  },

  listItemBottomBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },

  listItemText: {
    fontSize: 19,
    fontWeight: '400',
    color: COLORS.white,
    paddingLeft: 5,
    zIndex: 1,
  },

  dates: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.mainPurple,
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 25,
    width: 120,
    textAlign: 'center',
    zIndex: 1,
  },

  // modalVisible: {
  //   display: 'block',
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   backgroundColor: COLORS.mainGrey,
  // },

  // modalHidden: {
  //   display: 'none',
  // },
});
