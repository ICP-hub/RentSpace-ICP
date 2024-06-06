import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../../../../constants/themes';

const ReserveBtn = ({item, onClick, setCloseBottomSheet}) => {
  function convertDate(input) {
    const date = new Date(input);
    const day = date.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getMonth()].slice(0, 3);
    const formattedDate = `${day} ${month}`;
    return formattedDate;
  }

  return (
    <View style={styles.card}>
      <View style={styles.textCont}>
        <View style={styles.price}>
          <Text style={styles.boldText}>${item?.hotelPrice}</Text>
          {/* <Text style={styles.boldText}>$500</Text> */}
          <Text style={styles.smallText}>{item.price}/night</Text>
        </View>
        <Text style={styles.normalText}>
          {convertDate(item.availableFrom)} - {convertDate(item.availableTill)}
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onClick}>
        {/* <TouchableOpacity> */}
        <Text style={styles.btnText}>Reserve</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReserveBtn;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    width: '100%',
    // backgroundColor:'red',
  },
  textCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '30%',
    marginLeft: '6%',
  },
  price: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // backgroundColor:COLORS.mainGrey,
    marginBottom: 5,
  },
  boldText: {
    color: COLORS.black,
    fontSize: SIZES.medium + 1,
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: SIZES.preMedium - 1,
    color: COLORS.black,
    opacity: 0.6,
    marginBottom: 5,
  },
  smallText: {
    color: COLORS.black,
    opacity: 0.5,
    fontSize: SIZES.small,
  },
  btn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mainPurple,
    borderRadius: 12,
    width: '37%',
    paddingVertical: 6,
    marginRight: '6%',
  },
  btnText: {
    backgroundColor: COLORS.mainPurple,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.mainPurple,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
