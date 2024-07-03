import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, SIZES} from '../../../../../../constants/themes';
import {useSelector} from 'react-redux';
import BookingCard from './BookingCard';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

const ShowBookings = ({bookingList, setShowReservations, getReservations}) => {
  const {authData} = useSelector(state => state.authDataReducer);
  const [refreshing, setRefreshing] = useState(false);
  const {actors} = useSelector(state => state.actorReducer);

  const [loaderState, setLoaderState] = useState();

  const loadData = () => {
    // setRefreshing(true);
    getReservations(setRefreshing);
  };

  // console.log('bookingList : ',bookingList)

  const addNewReview = async () => {
    // setLoading(true)
    // console.log("reviewObj : ",review)
    // console.log("reviewActors : ",await actors.reviewActor.getPk())

    try {
      let ReviewInput = {
        hotelId:
          'j435d-ase4s-ebukf-tr6fc-5gt5c-mjsqh-awkvq-56gsw-s2vbv-nbohg-gae#c8bf686b-83d3-4790-b507-54523ea42b5b',
        rating: 4.5,
        title: 'Great Hotel',
        des: 'I had a great experience at this hotel',
      };

      console.log('Review add', actors.reviewActor);
      console.log('a : ', actors.reviewActor);
      await actors.reviewActor
        .createReview(ReviewInput.hotelId, ReviewInput)
        .then(res => {
          console.log('review creation response : ', res);
          // setLoading(false)
          // alert('Thanks for giving your valueble feedback!')
          Dialog.show({
            title: 'SUCCESS',
            type: ALERT_TYPE.SUCCESS,
            textBody: 'Thanks for giving your valueable feedback',
          });
          // setAddReview(false)
        })
        .catch(err => {
          console.log('review err :', err);
          // setLoading(false)
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('authData', authData);
    setLoaderState(bookingList);
    loadData();
  }, []);
  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => setShowReservations(false)}>
        <Icon name="angle-left" size={25} color={COLORS.textLightGrey} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Your Bookings</Text>
        <TouchableOpacity style={styles.reloadIcon}>
          <Icon2
            name="assignment-add"
            size={30}
            color={COLORS.black}
            onPress={() => setShowReservations(false)}
          />
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.title}>Your Bookings</Text> */}

      {loaderState !== undefined ? (
        bookingList.length > 0 ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={loadData}
            contentContainerStyle={styles.list}
            style={styles.Flist}
            data={bookingList}
            renderItem={({item}) => <BookingCard item={item} />}
          />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.emptyText}>Please wait we are fetching your Bookings</Text>
            <ActivityIndicator size="large" color={COLORS.black} style={{marginTop:10}} />
          </View>
        )
      ) : (
        <Text style={styles.emptyText}>No bookings to show</Text>
      )}
    </View>
  );
};

export default ShowBookings;

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.mainGrey,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    color: COLORS.black,
    top: '2%',
    fontWeight: 'bold',
    fontSize: SIZES.xLarge,
  },
  backIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    justifyContent: 'flex-start',
    paddingLeft: 30,
  },
  Flist: {
    width: '100%',
    marginTop: 30,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
    width: '90%',
    marginLeft: '5%',
  },
  reloadIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.black,
    fontSize: SIZES.small,
    marginTop: 80,
  },
});
