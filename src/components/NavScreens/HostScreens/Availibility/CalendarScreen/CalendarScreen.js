import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../../constants/themes';

const CalendarScreen = ({item, setModalVisible, getHotelDetails}) => {
  const [startDate, setStartDate] = useState({
    // date: today,
    date: item.availableFrom.slice(0, 10),
    marked: false,
  });

  const [endDate, setEndDate] = useState({
    date: '',
    marked: false,
  });

  const [secondCalenderDisplay, setSecondCalenderDisplay] = useState(true);

  const selectStartDate = date => {
    setStartDate({
      date: date.dateString,
      marked: true,
    });
    setSecondCalenderDisplay(false);
  };

  const selectEndDate = date => {
    setEndDate({
      date: date.dateString,
      marked: true,
    });
  };

  const updateDates = async () => {
    const updateDates = {
      hotelId: item.hotelId,
      availableFrom: startDate.date + ' 00:00:00+05:30',
      availableTill: endDate.date + ' 00:00:00+05:30',
    };
    console.log(updateDates);

    await axios
      .put(
        'http://localhost:5000/api/v1/hotel/updateHotelAvailbility',
        updateDates,
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    setModalVisible(false);
    getHotelDetails();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.headerImage} source={{uri: item.imagesUrls}} />
        <Text style={styles.headerText}>{item?.hotelTitle}</Text>
        <View style={styles.headerIcon}>
          <Icon name="calendar" size={20} color={COLORS.black} />
          <Icon2 name="settings-outline" size={20} color={COLORS.black} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={{width: Dimensions.get('window').width}}>
        <Calendar
          style={styles.calendar}
          minDate={item.availableFrom.slice(0, 10)}
          onDayPress={day => selectStartDate(day)}
          markedDates={{
            [startDate.date]: {
              selected: startDate.marked,
              selectedColor: COLORS.mainPurple,
            },
          }}
        />

        <Calendar
          style={styles.calendar}
          minDate={startDate.date}
          onDayPress={startDate.marked ? day => selectEndDate(day) : null}
          markedDates={{
            [endDate.date]: {
              selected: endDate.marked,
              selectedColor: COLORS.mainPurple,
            },
          }}
          disabledByDefault={secondCalenderDisplay}
        />

        <Pressable style={styles.button} onPress={updateDates}>
          <Text style={styles.butttonText}>Update</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.mainGrey,
    height: '100%',
    width: '100%',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 20,
    height: 'fit-content',
    marginHorizontal: 12,
  },

  headerImage: {
    height: 50,
    width: 70,
    borderRadius: 50,
  },

  headerText: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },

  headerIcon: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginLeft: 'auto',
  },

  scrollViewStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },

  calendar: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 25,
    marginHorizontal: 12,
  },

  button: {
    backgroundColor: COLORS.mainPurple,
    color: COLORS.white,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  butttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
