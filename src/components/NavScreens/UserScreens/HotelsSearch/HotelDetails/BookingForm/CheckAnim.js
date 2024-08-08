import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../../../../constants/themes';
import {images} from '../../../../../../constants';

const CheckAnim = () => {
  return (
    <View style={styles.page}>
      {/* <Image source={images.check} style={styles.img}/> */}
      <View style={styles.innerCard}>
        <Image source={images.congro} style={styles.img} />
        <Text style={styles.texth}>Congrats!</Text>
        <Text style={styles.text}>Your Space is Booked</Text>
      </View>
    </View>
  );
};

export default CheckAnim;

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.7)',

    height: '100%',
    width: '100%',
  },
  texth: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: '800',
    textAlign: 'center',
  },
  text: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: '400',
    textAlign: 'center',
  },
  img: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  innerCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
});
