import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {COLORS, SIZES} from '../../../constants/themes';
import CustomPopAlert from '../../NavScreens/CustomPopAlert';

const SaveBtn = ({setHostModal}) => {

  // const [showAlertPop, setShowAlertPop] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          // setHostModal(0)
          alert('Please complete your listing first!');
          // setShowAlertPop({
          //   show: true,
          //   title: 'Please complete your listing first!',
          //   message: '',
          //   color: 'black',
          // });
        }}>
        <Text style={styles.btnText}>Save & exit</Text>
      </TouchableOpacity>
      {/* <Modal visible={showAlertPop.show} transparent={true}>
        <CustomPopAlert
          title={showAlertPop.title}
          message={showAlertPop.message}
          color={showAlertPop.color}
          onCloseRequest={setShowAlertPop}
        />
      </Modal> */}
    </View>
  );
};

export default SaveBtn;

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '30%',
    marginLeft: '7.5%',
    borderColor: COLORS.mainPurple,
    borderWidth: 1.2,
    marginTop: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  btnText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: SIZES.preMedium,
  },
});
