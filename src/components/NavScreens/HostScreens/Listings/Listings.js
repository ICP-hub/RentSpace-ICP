import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import BottomNavHost from '../../../Navigation/BottomNavHost';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../../../constants/themes';
import ListingCard from './ListingCard';
import {images} from '../../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import Step1Manager from '../../../HostViewNew/Step1Manager';
import Step2Manager from '../../../HostViewNew/Step2Manager';
import Step3Manager from '../../../HostViewNew/Step3Manager';
import ChatDrawer from '../ChatPage/ChatDrawer/ChatDrawer';
import Update from '../UpdatePage/Update';
import axios from 'axios';
import { setChatToken } from '../../../../redux/chatToken/actions';

const Listings = ({navigation}) => {
  const {hotels} = useSelector(state => state.hotelsReducer);
  const {actors} = useSelector(state => state.actorReducer);
  const [hotelList, setHotelList] = useState([]);
  const [hostModal, setHostModal] = useState(0);
  const [newHotel, setNewHotel] = useState({});
  const [showDrawer, setShowDrawer] = useState(false);
  const {authData}=useSelector(state => state.authDataReducer)
  const dispatch=useDispatch()

  const [listings, setListings] = useState([]);
  const {principle}=useSelector(state=>state.principleReducer)

  // const baseUrl="https://rentspace.kaifoundry.com"
  const baseUrl="http://localhost:5000"

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
  const ApiLogin=async()=>{
    // console.log("files",files)
     await axios.post(`${baseUrl}/api/v1/login/user`,{},{headers:{
      "x-private":authData.privateKey,
      "x-public":authData.publicKey,
      "x-delegation":authData.delegation
     }}).then((res)=>{
        console.log('hotel login api : ',res.data.userToken)
        dispatch(setChatToken(res.data.userToken))
        // setToken(res.data.userToken)
     })
    }
  useEffect(() => {
    // getHotelDetails();
    ApiLogin()

  }, []);

  // Geting hotel details from the server

  function getHotelDetails() {
    // const userPrincipal = "2yv67-vdt7m-6ajix-goswt-coftj-5d2db-he4fl-t5knf-qii2a-3pajs-cqe" // for testing only
    axios
      .get(`http://localhost:5000/api/v1/hotel/getAllHotels?userPrincipal=${principle}`)
      // .get('http://localhost:5000/api/v1/hotel/getAllHotels')  // when userPrincipal is passed in header
      .then(res => {
        // console.log(res.data.hotels);
        console.log("res",res);
        if(res.data.hotels.length != undefined && res.data.hotels.length != 0){
          setListings(res.data.hotels);
        }else{
          setListings([]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getHotelDetails();
  }, []);

  // const listings = [
  //   {
  //     hotelTitle: 'Taj Hotel',
  //     hotelLocation: 'Mumbai, Maharashtra',
  //     image: images.hotelImg1,
  //     status: 2,
  //     rating: 7.5,
  //   },
  //   {
  //     hotelTitle: 'Hotel Ramada',
  //     hotelLocation: 'Lucknow, UP',
  //     image: images.hotelImg2,
  //     status: 0,
  //     rating: 8.5,
  //   },
  //   {
  //     hotelTitle: 'Hotel Pennsylvania',
  //     hotelLocation: 'Pennsylvania, Austria',
  //     image: images.hotelImg3,
  //     status: 1,
  //     rating: 9.5,
  //   },
  //   {
  //     hotelTitle: 'Constantinople Inn',
  //     hotelLocation: 'Istanbul',
  //     image: images.hotelImg4,
  //     status: 0,
  //     rating: 6.5,
  //   },
  //   {
  //     hotelTitle: 'Jaypur Palace',
  //     hotelLocation: 'Jaypur, Rajasthan',
  //     image: images.hotelImg5,
  //     status: 1,
  //     rating: 7.5,
  //   },
  // ];

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Your listings</Text>
        <View style={styles.iconCont}>
          <TouchableOpacity style={styles.icon}>
            <Icon name="collage" size={30} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => setHostModal(4)}>
            <Icon2 name="plus" size={30} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>

      {listings.length > 0 ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={{paddingBottom: 80}}
          data={listings}
          renderItem={item => (
            <ListingCard navigation={navigation} item={item.item} getHotelDetails={getHotelDetails} />
          )}
        />
      ) : (
        <Text style={{color: COLORS.black, marginTop: 50}}>
          Sorry! No listings to show
        </Text>
      )}

      <BottomNavHost
        navigation={navigation}
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
      />
      <Modal animationType="fade" visible={showDrawer} transparent>
        <ChatDrawer
          navigation={navigation}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
        />
      </Modal>

      {/* 
            Hotel creation models
      */}
      <Modal
        animationType="slide"
        visible={hostModal > 3 && hostModal <= 8 ? true : false}>
        <Step1Manager hostModal={hostModal} setHostModal={setHostModal} />
      </Modal>
      <Modal
        animationType="slide"
        visible={hostModal > 8 && hostModal <= 16 ? true : false}>
        <Step2Manager hostModal={hostModal} setHostModal={setHostModal} />
      </Modal>
      <Modal
        animationType="slide"
        visible={hostModal > 16 && hostModal <= 23 ? true : false}>
        <Step3Manager hostModal={hostModal} setHostModal={setHostModal} />
      </Modal>
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: COLORS.mainGrey,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginLeft: '2%',
    marginVertical: 20,
  },
  iconCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 75,
    marginTop: 8,
  },
  icon: {
    width: 30,
  },
  title: {
    fontSize: SIZES.medxLarge,
    color: 'black',
    fontWeight: '500',
  },
  list: {
    paddingBottom: 500,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
