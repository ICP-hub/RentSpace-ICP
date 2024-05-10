import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/themes';
import Icon from 'react-native-vector-icons/Entypo';

// const [showAlertPop, setShowAlertPop] = useState(false); // use this 

const defaultAlert = (title, message, color, onCloseRequest) => {
  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <View style={styles.alertSec}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMsg}>{message}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnsOk}
            onPress={() => onCloseRequest(false)}>
            <Text style={[styles.btnText, {color: color ? color : 'black'}]}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const confirmAlert = (title,message,color,onCloseRequest,yesRequest,noRequest,) => {
  return (
    <View style={styles.container}>
      <View style={styles.alertBox}>
        <View style={styles.alertSec}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMsg}>{message}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => {
              onCloseRequest(false);
              noRequest();
            }}>
            <Text style={[styles.btnText, {color: color ? color : 'black'}]}>
              NO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => {
              onCloseRequest(false);
              yesRequest();
            }}>
            <Text style={[styles.btnText, {color: color ? color : 'black'}]}>
              YES
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const errorAlert = (title, message, color, onCloseRequest) => {
  return (
    <View style={styles.container}>
      <View style={styles.errAlertBox}>
        <View style={styles.errAlertSec}>
          <View style={styles.errAlertHeader}>
            <Icon name="warning" size={25} color={color ? color : 'red'} />
            <Text style={styles.errAlertTitle}>{title}</Text>
          </View>

          <Text style={styles.errAlertMsg}>{message}</Text>
        </View>
        <TouchableOpacity onPress={() => onCloseRequest(false)}>
          <Icon
            name="cross"
            size={25}
            color={color ? color : 'grey'}
            style={{position: 'absolute', top: 2, right: 3}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomPopAlert = ({
  type,
  title,
  message,
  color,
  onCloseRequest,
  yesRequest,
  noRequest,
}) => {
  if (type === 'default') {
    return defaultAlert(title, message, color, onCloseRequest);
  }
  if (type === 'confirmation') {
    return confirmAlert(
      title,
      message,
      color,
      onCloseRequest,
      yesRequest,
      noRequest,
    );
  }
  if (type === 'error') {
    return errorAlert(title, message, color, onCloseRequest);
  }
};

export default CustomPopAlert;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertBox: {
    width: '80%',
    height: 180,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 50,
  },

  alertSec: {
    width: '100%',
    height: 130,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  alertMsg: {
    fontSize: 16,
    color: COLORS.black,
  },

  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  btns: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '51%',
    height: '100%',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomColor: COLORS.mainGrey,
    borderTopColor: COLORS.mainGrey,
    borderRightColor: COLORS.mainGrey,
    borderLeftColor: COLORS.mainGrey,
  },

  btnsOk: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderBottomColor: COLORS.mainGrey,
    borderTopColor: COLORS.mainGrey,
    borderRightColor: COLORS.mainGrey,
    borderLeftColor: COLORS.mainGrey,
  },

  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  errAlertBox: {
    width: '80%',
    height: 'fit-content',
    backgroundColor: COLORS.white,
    elevation: 50,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 10,
  },

  errAlertSec: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 12,
  },

  errAlertHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },

  errAlertTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '100%',
    color: COLORS.black,
  },

  errAlertMsg: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'justify',
    color: COLORS.black,
    width: '100%',
    height: 'fit-content',
  },
});
