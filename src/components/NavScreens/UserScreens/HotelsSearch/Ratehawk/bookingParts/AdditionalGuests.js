import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES} from '../../../../../../constants/themes';
import {useSelector} from 'react-redux';
import {value} from '../../../../../../../dist/LoginWeb';

const AdditionalGuests = ({finalData, setFinalData}) => {
  const {user} = useSelector(state => state.userReducer);
  const [guestNum, setGuestNum] = useState(0);
  const [guestArr, setGuestArr] = useState([
    {first_name: finalData.first_name, last_name: finalData.last_name},
  ]);

//   useEffect(() => {
//       setGuestArr({...guestArr[0], first_name: finalData.first_name, last_name: finalData.last_name})
//   }, [finalData]);

  useEffect(() => {
    setFinalData({
      ...finalData,
      guests: guestArr,
    });
  }, [guestArr]);

  const addGuest = () => {
    let newGuest = {first_name: '', last_name: ''};
    setGuestArr(prevGuestArr => [...prevGuestArr, newGuest]);
  };

  return (
    <View style={styles.sec}>
      <Text style={styles.heading1}>Add Guests</Text>
      <View style={styles.guestCounter}>
        <Text style={styles.heading}>Number of extra guests</Text>
        <View style={styles.counterController}>
          <TouchableOpacity
            style={styles.counterControllerBtn}
            onPress={() => {
              if (guestNum === 0) {
                return;
              }
              setGuestNum(guestNum - 1);
              setGuestArr(guestArr.slice(0, -1)); // remove last element
            }}>
            <Text style={styles.counterControllerText}>-</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.mainPurple,
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {guestNum}
          </Text>
          <TouchableOpacity
            style={styles.counterControllerBtn}
            onPress={() => {
              setGuestNum(guestNum + 1);
              addGuest(); // add new element
            }}>
            <Text style={styles.counterControllerText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {guestArr.length > 1 &&
        guestArr.map(
          (item, index) =>
            index > 0 && (
              <React.Fragment key={index}>
                <Text style={styles.heading}>Guest {index + 1} details : </Text>
                <TextInput
                  value={item.first_name}
                  onChangeText={value => {
                    let newArr = [...guestArr];
                    newArr[index] = {...newArr[index], first_name: value};
                    setGuestArr(newArr);
                  }}
                  style={styles.phoneCont}
                  placeholderTextColor={COLORS.black}
                  placeholder="Enter first name"
                />
                <TextInput
                  value={item.last_name}
                  onChangeText={value => {
                    let newArr = [...guestArr];
                    newArr[index] = {...newArr[index], last_name: value};
                    setGuestArr(newArr);
                  }}
                  style={styles.phoneCont}
                  placeholderTextColor={COLORS.black}
                  placeholder="Enter last name"
                />
              </React.Fragment>
            ),
        )}
    </View>
  );
};

export default AdditionalGuests;

const styles = StyleSheet.create({
  sec: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '85%',
  },
  heading1: {
    color: COLORS.black,
    fontWeight: '800',
    fontSize: SIZES.medium,
  },
  heading: {
    color: COLORS.black,
    fontWeight: '800',
    fontSize: SIZES.preMedium,
  },
  phoneCont: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: SIZES.small - 1,
    width: '80%',
    borderRadius: 4,
    borderColor: COLORS.textLightGrey,
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    height: 30,
    marginVertical: 10,
  },
  smallINput: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: SIZES.small - 1,
    width: '20%',
    borderRadius: 4,
    borderColor: COLORS.textLightGrey,
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    height: 30,
    marginVertical: 10,
  },

  guestCounter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },

  counterController: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
    // backgroundColor:'red'
  },

  counterControllerBtn: {
    width: 30,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mainPurple,
    borderRadius: 5,
  },

  counterControllerText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
