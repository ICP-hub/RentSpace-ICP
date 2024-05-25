import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../../constants/themes';

const AmenityCard = ({item, amenities, setAmenities}) => {
  const putItem = () => {
    if (amenities.includes(item?.name)) {
      let arr = [];
      amenities.map(am => {
        if (am != item?.name) {
          arr.push(am);
        }
      });
      setAmenities(arr);
    } else {
      setAmenities([...amenities, item?.name]);
    }
  };
  return (
    <TouchableOpacity
      style={amenities.includes(item?.name) ? styles.cardActive : styles.card}
      onPress={putItem}>
      {item?.icon}
    </TouchableOpacity>
  );
};

export default AmenityCard;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    width: '25%',
  },
  cardActive: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    width: '25%',
    backgroundColor: COLORS.mainPurple,
    borderRadius: 10,

  },
});
