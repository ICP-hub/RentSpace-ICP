import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../../../../../../constants/themes';

const CardDetails = ({finalData, setFinalData}) => {
  const [cardDetails, setCardDetails] = useState({
    card_holder: null,
    card_number: null,
    cvc: null,
    month: null,
    year: null,
  });



  return (
    <View style={styles.sec}>
      <Text style={styles.heading1}>Card details for payment</Text>
      <View style={styles.cont2}>
        <TextInput
          value={cardDetails.holderName}
          onChangeText={value =>
            setFinalData({...finalData, card_holder: value})
          }
          style={styles.phoneCont}
          placeholderTextColor={COLORS.black}
          placeholder="Card holder name"
        />
        <TextInput
          value={cardDetails.number}
          onChangeText={value =>
            setFinalData({...finalData, card_number: value})
          }
          style={styles.phoneCont}
          placeholderTextColor={COLORS.black}
          placeholder="Card number"
          keyboardType="numeric"
        />
        <TextInput
          value={cardDetails.cvc}
          onChangeText={value => setFinalData({...finalData, cvc: value})}
          style={styles.phoneCont}
          placeholderTextColor={COLORS.black}
          placeholder="Card CVC"
          keyboardType="numeric"
        />
        <TextInput
          value={cardDetails.month}
          onChangeText={value => setFinalData({...finalData, month: value})}
          style={styles.phoneCont}
          placeholderTextColor={COLORS.black}
          placeholder="Expiry month mm"
          keyboardType="numeric"
        />
        <TextInput
          value={cardDetails.year}
          onChangeText={value => setFinalData({...finalData, year: value})}
          style={styles.phoneCont}
          placeholderTextColor={COLORS.black}
          placeholder="Expiry year yy"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default CardDetails;

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
  cont2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
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
});
