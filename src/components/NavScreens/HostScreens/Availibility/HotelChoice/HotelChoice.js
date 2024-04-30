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
import { useSelector } from 'react-redux';
import { images } from '../../../../../constants';

const HotelChoice = ({navigation}) => {
  const {hotels} = useSelector(state => state.hotelsReducer);
  const {actors} = useSelector(state => state.actorReducer);
  // const hotels = [
    // {
    //   name: 'Hotel 1',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 2',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 3',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 4',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 5',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 6',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 7',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 8',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 9',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 10',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 11',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 12',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 13',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 14',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 15',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 16',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 17',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 18',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 19',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
    // {
    //   name: 'Hotel 20',
    //   image: require('../../../../../assets/images/hotelDemo.jpg'),
    // },
  // ];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [hotelList,setHotelList]=useState([])

  async function getHotelDetails() {
    setHotelList([]);
    for (let i = 0; i < hotels?.length; i++) {
      await actors.hotelActor?.getHotel(hotels[i]).then(res => {
        let newEL={...res[0],id:hotels[i]}
        setHotelList(hotelList => [...hotelList,newEL]);
        console.log(res[0])
      });
    }
  }

  const openCalendarModal = (hotel) => {
    setModalVisible(true);
    setSelectedHotel(hotel);
  };

  useEffect(()=>{
    getHotelDetails()
  },[])

  return (
    <View style={styles.container}>
      
        <Text style={styles.mainText}>Hotel Selection</Text>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainerStyle}>
        {hotelList.map((hotel, index) => {
          return (
            <Pressable
              style={styles.listItem}
              key={index}
              onPress={() => openCalendarModal(hotel)}>
              <Image style={styles.listItemImage} source={images.hotelImg2} />

              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={styles.listItemText}>{hotel?.hotelTitle}</Text>
                <Text style={styles.listItemSubText}>Available On</Text>
              </View>

              <View style={styles.editContainer} >
                <Icon name="edit" size={20} color={COLORS.black} />
                <Text style={styles.dates}>15 Mar - 28 Mar </Text>
              </View>
            </Pressable>
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
    padding:20,
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
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    elevation: 15,
    marginVertical: 10,
    width: '95%',
  },

  listItemImage: {
    height: 80,
    width: 100,
    borderRadius: 10,
  },

  listItemText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.black,
    paddingLeft: 5,

  },

  listItemSubText: {
    fontSize: 12,
    color: COLORS.black,
    padding: 5,
    marginTop: 5,
  },

  editContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'baseline',
    gap: 10,
  },


  dates: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
    backgroundColor: COLORS.lightPurple,
    padding: 5,
    borderRadius: 25,
  },

  modalVisible: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.mainGrey,
  },

  modalHidden: {
    display: 'none',
  },
});
