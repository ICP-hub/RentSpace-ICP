import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {images} from '../../../../constants';
import {COLORS, SIZES} from '../../../../constants/themes';
import HotelCard from './HotelDetails/cards/HotelCard';
import {useDispatch, useSelector} from 'react-redux';
import {setHotelList} from '../../../../redux/hotelList/actions';
import {setBookings} from '../../../../redux/UserBookings/actions';
import ShowBookings from './HotelDetails/ShowBookings/ShowBookings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import RateHawk from './RateHawk';
import CustomPopAlert from '../../CustomPopAlert';

const BookHotelPage = ({navigation, queryHotels}) => {

  // --------- UI test for CustomPopAlert ---------
  const [makeVisible, setMakeVisible] = useState(false);

  const testyesFunc =()=>{
    console.log('yes')
  }
  const testnoFunc =()=>{
    console.log('no')
  }

  // --------- UI test for CustomPopAlert end ---------

  const [hotelProfile, setHotelProfile] = useState(false);

  const firstRender = useRef(true);
  const {user} = useSelector(state => state.userReducer);
  const {hotels} = useSelector(state => state.hotelsReducer);
  const {actors} = useSelector(state => state.actorReducer);
  const {principle} = useSelector(state => state.principleReducer);
  // const {authData}=useSelector(state=>state.authDataReducer)
  const dispatch = useDispatch();
  const [hotelsList, setHotelsList] = useState([]);
  const [showReservation, setShowReservations] = useState(false);
  const sampleName = 'DreamLiner Hotel';
  const sampleDes = '2972 Westheimer Rd. Santa Ana, Illinois 85486 ';
  const [bookingList, setBookingList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const [bottom,setBottom]=useState(70)

  async function getReservations(setRefreshing) {
    setBookingList([]);
    await actors?.bookingActor
      .getBookingId()
      .then(res => {
        console.log('getid resp : ', res);

        console.log('all bookings1: ', res[0]);
        res.map(async r => {
          setRefreshing(true);
          console.log('booking-->', r);
          let hotelId = r.split('#')[0] + '#' + r.split('#')[1];
          console.log(hotelId);
          await actors?.bookingActor
            .getBookingDetials(r)
            .then(async resp => {
              let hotel = null;

              await actors?.hotelActor
                .getHotel(hotelId)
                .then(hRes => {
                  setRefreshing(false);
                  hotel = {...hRes[0], hotelId: hotelId};
                })
                .catch(err => {
                  console.log(err);
                  setRefreshing(false);
                });
              console.log('booking details : ', resp);
              console.log({...resp[0], hotel: hotel, bookingId: r});
              setBookingList(b => [
                ...b,
                {...resp[0], hotel: hotel, bookingId: r},
              ]);
            })
            .catch(err => {
              console.log(err);
              setRefreshing(false);
            });
        });
      })
      .catch(err => {
        console.log('getid err :', err);
        setRefreshing(false);
      });
    console.log('bookingList', bookingList);
  }
  async function dispatchBookingData() {
    setShowReservations(true);
    console.log('final booking', bookingList);
  }
  async function getQueryHotelDetails() {
    const newArr = [];
    setRefreshing(true);
    if (queryHotels.length == 0) {
      setRefreshing(false);
      setHotelsList([]);
      return;
    }
    for (let i = 0; i < queryHotels?.length; i++) {
      console.log('el', queryHotels[i].hotelId);
      await actors.hotelActor
        ?.getHotel(queryHotels[i].hotelId)
        .then(res => {
          newArr.push({
            ...res[0],
            id: queryHotels[i].hotelId,
            details: queryHotels[i],
          });
          setRefreshing(false);
          setHotelsList([...newArr]);
        })
        .catch(err => {
          console.log(err);
          setRefreshing(false);
        });
    }
  }
  const refresh = () => {
    console.log(queryHotels);
    // getQueryHotelDetails()
    getReservations();
  };

  // useEffect(()=>{
  //     Keyboard.addListener('keyboardDidShow',()=>{
  //         setBottom(0)
  //     })
  //     Keyboard.addListener('keyboardDidHide',()=>{
  //         setBottom(70)
  //     })
  // })
  useEffect(() => {
    if (firstRender.current) {
      console.log(firstRender.current);
      firstRender.current = false;
    } else {
      getQueryHotelDetails();
      // getReservations()
    }
    ``;
  }, [queryHotels, principle]);

  if (hotelsList?.length > 0) {
    return (
      <>
        <View style={styles.btnCont}>
          <TouchableOpacity style={[styles.btn]} onPress={refresh}>
            <Icon2 name="reload-circle-sharp" size={20} color={COLORS.black} />
            <Text style={styles.btnText}>Reload Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={dispatchBookingData}>
            <Icon name="address-book" size={20} color={COLORS.black} />
            <Text style={styles.btnText}>Show my bookings</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={hotelsList}
          style={{marginBottom: 70, backgroundColor: 'white'}}
          renderItem={item => (
            <HotelCard item={item.item} navigation={navigation} />
          )}
          refreshing={refreshing}
          onRefresh={refresh}
        />
        <Modal animationType="slide" visible={showReservation}>
          <ShowBookings
            getReservations={getReservations}
            bookingList={bookingList}
            setShowReservations={setShowReservations}
          />
        </Modal>
      </>
    );
  } else {
    return (
      <>
        {/* <HotelCard name={sampleName} des={sampleDes} rating={4} /> */}
        <Text style={styles.empty}>Sorry nothing to show</Text>

        {/* UI test for Rate Hawk  */}
        <Pressable onPress={() => setHotelProfile(true)}>
          <Text
            style={{
              backgroundColor: 'grey',
              maxWidth: 'fit-content',
              marginHorizontal: 50,
              color: 'white',
              padding: 10,
            }}>
            Make RateHawk visible
          </Text>
        </Pressable>

        <TouchableOpacity
          style={{backgroundColor: 'red', padding: 10, marginTop: 20}}
          onPress={() => setMakeVisible(true)}>
          <Text>Alert Visible</Text>
        </TouchableOpacity>

        <Modal
          visible={hotelProfile}
          onRequestClose={() => setHotelProfile(false)}>
          <RateHawk setHotelProfile={setHotelProfile} />
        </Modal>

        <Modal
          transparent
          visible={makeVisible}
          onRequestClose={() => setMakeVisible(false)}>
          <CustomPopAlert
            type="default"
            title="Oops! Something went wrong."
            message="We're sorry, but the mobile app encountered a serious error.
            Please try again later or contact support for assistance."
            color={COLORS.mainPurple}
            onCloseRequest={setMakeVisible}
            yesRequest={testyesFunc}
            noRequest={testnoFunc}
            
          />
        </Modal>
      </>
    );
  }
};

export default BookHotelPage;

const styles = StyleSheet.create({
  hotelPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '98%',
    backgroundColor: COLORS.mainPurple,
    paddingTop: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    marginLeft: 4,
    // marginBottom:20
  },
  title: {
    fontSize: SIZES.preMedium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  img: {
    width: '80%',
    height: 240,
    borderRadius: 30,
    marginBottom: 10,
  },
  desc: {
    fontSize: SIZES.small,
    color: COLORS.white,
    opacity: 0.6,
    width: '80%',
  },
  bookBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bookTxt: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: SIZES.medium,
  },
  descCont: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  btnCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '8%',
    backgroundColor: COLORS.mainGrey,
    paddingBottom: 10,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '45%',
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 8,
    elevation: 10,
  },
  btnText: {
    color: COLORS.black,
    fontSize: SIZES.small,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  empty: {
    width: '90%',
    height: 200,
    fontSize: SIZES.preMedium,
    color: COLORS.textLightGrey,
    fontWeight: '300',
    backgroundColor: COLORS.lighterGrey,
    borderRadius: 20,
    marginTop: 40,
    marginLeft: '5%',
    textAlign: 'center',
    paddingTop: 20,
  },
});
