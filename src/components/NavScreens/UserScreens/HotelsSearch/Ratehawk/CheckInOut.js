import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../../../constants/themes';
import {Calendar} from 'react-native-calendars';
import RoomList from './RoomList';

const CheckInOut = ({hotelId}) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = `${year}-${month}-${day}`;

  const [roomsPage, setRoomsPage] = useState(false);

  const [checkInDate, setCheckInDate] = useState({
    date: `${year}-${month}-${day}`,
    marked: false,
  });
  const [checkOutDate, setCheckOutDate] = useState({
    date: '',
    marked: false,
  });

//   useEffect(() => {
//     console.log('CheckIn Date: ', checkInDate.date);
//     console.log('CheckOut Date: ', checkOutDate.date);
//   }, [checkInDate, checkOutDate]);

  return (
    <View style={styles.conatiner}>
      <Text style={styles.pageTitle}>Select CheckIn and CheckOut Date</Text>
      <ScrollView style={styles.scrollView}>
        <Calendar
          style={styles.calendar}
          minDate={today}
          onDayPress={day => {
            setCheckInDate({
              ...checkInDate,
              date: day.dateString,
              marked: true,
            });
          }}
          markedDates={{
            [checkInDate.date]: {
              selected: checkInDate.marked,
              selectedColor: COLORS.mainPurple,
            },
          }}
        />

        <Calendar
          style={styles.calendar}
          minDate={checkInDate.date}
          onDayPress={day => {
            setCheckOutDate({
              ...checkOutDate,
              date: day.dateString,
              marked: true,
            });
          }}
          markedDates={{
            [checkOutDate.date]: {
              selected: checkOutDate.marked,
              selectedColor: COLORS.mainPurple,
            },
          }}
        
        />

        <TouchableOpacity style={styles.reserveBtn} onPress={()=>setRoomsPage(true)} >
          <Text style={styles.btnText}>Select Room</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={roomsPage} onRequestClose={() => setRoomsPage(false)}>
        <RoomList hotelId={hotelId} checkInDate={checkInDate.date} checkOutDate={checkOutDate.date} />
      </Modal>
    </View>
  );
};

export default CheckInOut;

const styles = StyleSheet.create({
  conatiner: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.mainGrey,
    width: '100%',
    height: '100%',
  },

  pageTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    marginLeft: 15,
  },

  scrollView: {
    marginBottom: 20,
  },

  calendar: {
    borderRadius: 20,
    padding: 10,
    marginTop: 25,
    marginHorizontal: 12,
  },

  reserveBtn: {
    backgroundColor: COLORS.mainPurple,
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },

  btnText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});
