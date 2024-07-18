import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {COLORS, SIZES} from '../../../../constants/themes';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const GetPaypal = ({
  clientID,
  setClientID,
  clientSecret,
  setClientSecret,
  setCreditcardForwards,
  setPaypalModal,
}) => {

  const submitPaypal = () => {
    console.log('Client ID:', clientID);
    console.log('Client Secret:', clientSecret);
    if(clientID && clientSecret) {
      setCreditcardForwards(true);
      setPaypalModal(false);
    }
    else {
       Dialog.show({
        type:ALERT_TYPE.WARNING,
        title:'Please fill all fields',
        textBody:'Please fill all fields to continue',
        button:'OK',
      })
    }
  };

  return (
    <View style={styles.modal}>
      <View style={styles.box}>
        <Text style={styles.title}>Add Your Paypal Account</Text>
        <View style={styles.instructionCont}>
          <Text style={styles.instructionHead}>How to get one?</Text>
          <Text style={styles.instructionText}>1. Go to https://developer.paypal.com</Text>
          <Text style={styles.instructionText}>2. Create Account</Text>
          <Text style={styles.instructionText}>3. Go to App & Credentials</Text>
          <Text style={styles.instructionText}>4. Create and App</Text>
          <Text style={styles.instructionText}>5. Copy 	Client ID &	Secret</Text>
        </View>
        <TextInput
          placeholder="Client ID"
          placeholderTextColor={COLORS.black}
          style={styles.input}
          value={clientID}
          onChangeText={value => {
            setClientID(value);
          }}
        />
        <TextInput
          placeholder="Secret"
          placeholderTextColor={COLORS.black}
          style={styles.input}
          value={clientSecret}
          onChangeText={value => {
            setClientSecret(value);
          }}
        />
        <TouchableOpacity style={styles.btn} onPress={submitPaypal}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetPaypal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  box: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    minHeight: 200,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  instructionCont: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  instructionHead: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 7,
  },
  instructionText: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: '300',
    marginBottom: 5,
  },
  input: {
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    height: 50,
    padding: 15,
    color: COLORS.black,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
  },
  btn: {
    width: '80%',
    backgroundColor: COLORS.black,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
});
