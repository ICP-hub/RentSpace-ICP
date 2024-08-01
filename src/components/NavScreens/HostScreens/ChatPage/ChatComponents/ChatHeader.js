import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {COLORS, SIZES} from '../../../../../constants/themes';

const ChatHeader = ({name, status, setOpenChat}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.btn} onPress={() => setOpenChat(false)}>
        <Icon name="chevron-left" size={25} color={COLORS.black} />
      </TouchableOpacity>
      <View style={styles.textCont}>
        <Text style={styles.name}>{name}</Text>
        {/* <Text style={styles.status}>
          {status ? 'Active Now' : 'Last seen on Monday'}
        </Text> */}
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'center',
    gap: 10,
    backgroundColor: COLORS.newBG,
    width: '100%',
    paddingVertical: 10,
  },
  btn: {
    // position:'absolute',
    marginLeft: '3%',
  },
  textCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
  name: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: '600',
  },
  status: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: '300',
  },
});
