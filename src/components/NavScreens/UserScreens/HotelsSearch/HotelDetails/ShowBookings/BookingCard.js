import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../../../../constants/themes';
import Icon from 'react-native-vector-icons/Feather';
import AddReview from '../AddReview/AddReview';
import {useSelector} from 'react-redux';
import Line from './Line';

const BookingCard = ({item}) => {
  console.log('IIt : ', item);
  const [showAddReview, setAddReview] = useState(false);
  const [date, setDate] = useState('date');
  const {actors} = useSelector(state => state.actorReducer);
  const [hotel, setHotel] = useState({});

  const getDate = () => {
    try {
      const dateObject = new Date(item?.date);
      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
      const year = dateObject.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      console.log(formattedDate);
      setDate(formattedDate);
    } catch (err) {
      console.log(err);
    }
  };

  const getHotelName = async () => {
    try {
      console.log('hid', item?.hotelId);
      const hotelRes = await actors?.hotelActor?.getHotel(item?.hotelId);
      if (hotelRes?.err !== undefined) {
        console.log('hrr : ', hotelRes?.err);
        return;
      }
      console.log('hres : ', hotelRes);
      setHotel(hotelRes?.ok);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDate();
    getHotelName();
  }, []);
  useEffect(() => {
    console.log('hotel : ', hotel?.hotelTitle);
  }, [hotel]);

  // return (
  //   <View style={styles.card}>

  // <TouchableOpacity
  //   style={styles.editBtn}
  //   onPress={() => {
  //     setAddReview(true);
  //   }}>
  //   <Icon name="edit-3" color={COLORS.black} size={16} />
  //   {/* <Text style={styles.editText}>Review</Text> */}
  // </TouchableOpacity>
  //     <View style={styles.textCont}>
  //       <Text style={styles.title}>Travel Destination </Text>
  //       <Text style={styles.normalText}>{hotel?.hotelTitle}</Text>
  //     </View>
  //     <View style={styles.textCont}>
  //       <Text style={styles.title}>Details</Text>
  //       <Text style={styles.normalText}>Check In : {item?.checkInDate}</Text>
  //       <Text style={styles.normalText}>Check In : {item?.checkOutDate}</Text>
  //       <Text style={styles.normalText}>
  //         Duration of Stay : {item?.bookingDuration + ' '}days
  //       </Text>
  //       {/* {Number(item?.bookingDuration)} */}
  //       {/* <Text style={styles.normalText}>Price per night : ${Number(item?.hotel?.hotelPrice)}</Text> */}
  //     </View>
  //     <View style={styles.whiteHR} />
  //     {/* <View style={styles.priceCont}>
  //       <Text style={styles.total}>Total</Text>
  //       <Text style={styles.total}>${Number(item?.hotel?.hotelPrice)}</Text>
  //     </View> */}
  //     <Modal animationType="slide" visible={showAddReview}>
  //       <AddReview item={item} setAddReview={setAddReview} />
  //     </Modal>
  //   </View>
  // );
  return (
    <View style={styles.card}>
      <View style={styles.row1}>
        <View style={styles.textCont}>
          <Text style={styles.title}>Travel Destination </Text>
          <Text style={styles.normalText}>{hotel?.hotelTitle}</Text>
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            setAddReview(true);
          }}>
          <Icon name="edit-3" color={COLORS.black} size={16} />
        </TouchableOpacity>
      </View>

      <Line />

      <View style={styles.row2}>
        <Text style={styles.title2}>Period</Text>
        <Text style={styles.normalText}>Checkin : {item?.checkInDate}</Text>
        <Text style={styles.normalText}>Checkout : {item?.checkOutDate}</Text>
        <Text style={styles.normalText}>
          {String(item?.bookingDuration)} nights
        </Text>
      </View>

      <Line />

      <View style={styles.row1}>
        <Text
          style={{
            fontSize: SIZES.medium,
            color: COLORS.black,
            fontWeight: '500',
          }}>
          Total
        </Text>
        <Text
          style={{
            fontSize: SIZES.small,
            color: COLORS.black,
            fontWeight: '500',
          }}>
          €{Number(item?.euroAmount)}
        </Text>
      </View>

      <Modal animationType="slide" visible={showAddReview}>
        <AddReview item={item} setAddReview={setAddReview} />
      </Modal>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '92%',
    marginLeft: '5%',
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 10,
  },

  row1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },

  row2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '85%',
  },

  textCont: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: '400',
    marginBottom: 0,
  },
  title2: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: '400',
    marginBottom: 0,
  },
  normalText: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: '600',
  },
  priceCont: {
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
  },
  whiteHR: {
    backgroundColor: 'white',
    width: '85%',
    height: 1,
    marginBottom: 7,
  },
  total: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: '600',
  },
  editBtn: {
    padding: 5,
    position: 'absolute',
    right: '7.5%',
    top: '12%',
    display: 'flex',
    flexDirection: 'row',
  },
  editText: {
    marginLeft: 2,
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
