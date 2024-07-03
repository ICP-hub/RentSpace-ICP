import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../../../../../constants/themes';

const UploadModal = ({transferred}) => {

  let progress = String(transferred) + '%';

  return (
    <View style={styles.container}>
      <View style={styles.uploadBox}>
        <Text style={styles.uploadPercentage}>{transferred}% </Text>
        <View style={styles.uploadBar}>
          <View
            style={[styles.uploadBarProgress, { width: progress }]}></View>
        </View>
        <Text style={styles.uploadText}>Uploading...</Text>
      </View>
    </View>
  );
};

export default UploadModal;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBox: {
    backgroundColor: 'white',
    height: '25%',
    width: '82%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
    elevation:50,
  },
  
  uploadPercentage: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.black,
  },
  
  uploadBar: {
    height: 20,
    width: '80%',
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  uploadBarProgress: {
    height: '100%',
    backgroundColor: COLORS.black,
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 16,
    marginVertical: 10,
    color:COLORS.black,
  },

});
