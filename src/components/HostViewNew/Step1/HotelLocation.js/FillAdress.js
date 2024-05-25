import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SIZES, COLORS} from '../../../../constants/themes';
import Icon from 'react-native-vector-icons/Entypo';
import {Dropdown} from 'react-native-element-dropdown';
import { Dialog,ALERT_TYPE } from 'react-native-alert-notification';

const data = [
  {label: 'India', value: 'India'},
  {label: 'USA', value: 'USA'},
  {label: 'UK', value: 'UK'},
  {label: 'China', value: 'China'},
  {label: 'South Africa', value: 'South Africa'},
];

const FillAdress = ({self, setLocation, location}) => {
 

  const [address, setAddress] = useState({
    region: '',
    streetAdd: '',
    suiteBuilding: '',
    city: '',
    country: '',
    postcode: '',
  });
  const [bottom, setBottom] = useState(true);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setBottom(false);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setBottom(true);
    });
  });

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => self(false)}>
          <Icon name="chevron-left" color={COLORS.black} size={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Confirm Your Address</Text>
      <View style={styles.cont}>
        <Dropdown
          data={data}
          value={address?.region}
          placeholder="Country/region"
          onChange={value => setAddress({...address, region: value})}
          labelField="label"
          valueField="value"
          style={styles.drop}
          placeholderStyle={styles.textDropdownPlaceHolder}
          selectedTextStyle={styles.textDropdown}
          itemTextStyle={styles.textDropdownPlaceHolder}
          iconColor={COLORS.mainPurple}
        />
        <TextInput
          style={styles.firstInp}
          value={address?.streetAdd}
          onChangeText={value => setAddress({...address, streetAdd: value})}
          placeholder="Street address"
          placeholderTextColor={COLORS.black}
        />
        <TextInput
          style={styles.middleInputs}
          value={address?.building}
          onChangeText={value => setAddress({...address, building: value})}
          placeholder="Apt, suite, bldg (optinal)"
          placeholderTextColor={COLORS.black}
        />
        <TextInput
          style={styles.middleInputs}
          value={address?.city}
          onChangeText={value => {
            setAddress({...address, city: value});
          }}
          placeholder="City"
          placeholderTextColor={COLORS.black}
        />
        <TextInput
          style={styles.middleInputs}
          value={address?.country}
          onChangeText={value => setAddress({...address, country: value})}
          placeholder="Country"
          placeholderTextColor={COLORS.black}
        />
        <TextInput
          style={styles.lastInp}
          value={address?.postalCode}
          onChangeText={value => setAddress({...address, postalCode: value})}
          placeholder="Postcode"
          placeholderTextColor={COLORS.black}
        />
      </View>
      <View
        style={
          bottom
            ? [styles.btnCont, {bottom: 0}]
            : [styles.btnCont, {bottom: -100}]
        }>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (address.city != '') {
              let temp = location;
              setLocation(`${temp}#${address.city}`);
              console.log(location);
              self(false);
            } else {
              // alert('Please do not leave any fields empty!');
              Dialog.show({
                type:ALERT_TYPE.WARNING,
                title:'WARNING',
                textBody:'Please do not leave any fields empty!',
                button:'OK',
              })
                
            }
          }}>
          <Text style={styles.btnText}>Looks Good</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

export default FillAdress;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '94%',
    position: 'absolute',
    top: '6%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 10,
  },
  title: {
    width: '85%',
    color: COLORS.mainPurple,
    fontSize: SIZES.xxLarge,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: '7.5%',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  closeIcon: {
    marginLeft: '3%',
  },
  cont: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%',
    marginLeft: '7.5%',
    marginTop: 20,
    marginBottom: 10,
  },
  middleInputs: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: COLORS.black,
    opacity: 0.8,
    color: COLORS.black,
    paddingLeft: 15,
    borderTopWidth: 0,
  },
  lastInp: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: COLORS.black,
    opacity: 0.8,
    color: COLORS.black,
    paddingLeft: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
  },
  firstInp: {
    width: '100%',
    borderWidth: 0.8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderColor: COLORS.black,
    opacity: 0.8,
    color: COLORS.black,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  drop: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: COLORS.black,
    opacity: 0.8,
    color: COLORS.black,
    paddingLeft: 15,
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 10,
  },
  textDropdown: {
    color: COLORS.black,
    fontSize: SIZES.preMedium,
  },
  textDropdownPlaceHolder: {
    color: COLORS.black,
    fontSize: SIZES.preMedium,
    opacity: 0.8,
  },
  btn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.hostTitle,
    marginTop: 15,
  },
  btnText: {
    color: 'white',
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  btnCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
    paddingVertical: 12,
    width: '100%',
    position: 'absolute',
  },
});
