import {StyleSheet, Text, View} from 'react-native';

const SubmitUpdates = () => {
  return (
    <View style={styles.container}>
      <View style={styles.uploadBox}>
        <Text style={styles.uploadText}>Uploading your updates.</Text>
        <Text style={styles.uploadText2}>Please do not close the app.</Text>
      </View>
    </View>
  );
};

export default SubmitUpdates;

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
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  uploadText2: {
    fontSize: 14,
    marginVertical: 5,
  },
});
