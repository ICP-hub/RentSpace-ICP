import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {React, useState} from 'react';
// import { images } from '../../../../constants'
import {COLORS, SIZES} from '../../../../constants/themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Update from '../UpdatePage/Update';

const CustomAlert = ({showAlert, setShowAlert}) => {
  const handleYes = () => {
    setShowAlert(false);
  };

  const handleNo = () => {
    setShowAlert(false);
  };

  return (
    <Modal
      visible={showAlert}
      onRequestClose={() => setShowAlert(false)}
      transparent>
      <View style={styles.customAlertBox}>
        <View style={styles.customAlert}>
          <Text style={styles.CustomAlertTitle}>Delete Listing</Text>
          <Text style={styles.CustomAlertMsg}>
            Are you sure you want to delete this listing?
          </Text>
          <View style={styles.customAlertBtnContainer}>
            <TouchableOpacity onPress={handleYes}>
              <Text style={styles.alertBtns}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNo}>
              <Text style={styles.alertBtns}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ListingCard = ({item}) => {
  let status = item?.status;
  switch (status) {
    case 0:
      status = 'Verification Required';
      break;
    case 1:
      status = 'Verification in Progress';
      break;
    case 2:
      status = 'Verified';
  }

  const [showAlert, setShowAlert] = useState(false);
  const deleteListing = () => {
    setShowAlert(true);
  };

  const [openUpdate, setOpenUpdate] = useState(false);
  const openUpdateModal = () => {
    setOpenUpdate(true);
  };

  return (
    <Pressable style={styles.card} onPress={openUpdateModal}>
      <View style={styles.cardView}>
        <Text style={styles.status}>{status}</Text>
        <Image source={item.image} style={styles.img} />
      </View>
      <View style={styles.textCont}>
        <View>
          <Text style={styles.text}>{item?.name}</Text>
          <Text style={styles.address}>{item?.address}</Text>
        </View>

        <TouchableOpacity onPress={deleteListing}>
          <Icon name="delete" color={COLORS.black} size={20} />
        </TouchableOpacity>
        <CustomAlert showAlert={showAlert} setShowAlert={setShowAlert} />
      </View>

      <Modal visible={openUpdate} onRequestClose={() => setOpenUpdate(false)} >
        <Update setOpenUpdate={setOpenUpdate} />
      </Modal>

    </Pressable>
  );
};

export default ListingCard;

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: '4%',
    width: '90%',
    minHeight: 275,
    maxHeight: 320,
    backgroundColor: 'white',
    elevation: 10,
    marginTop: 15,
    borderRadius: 12,
    paddingVertical: '5%',
    marginLeft: '5%',
  },

  cardView: {
    backgroundColor: 'blue',
    width: '100%',
    height: '85%',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 5,
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

  status: {
    minWidth: 50,
    width: 'fit-content',
    backgroundColor: COLORS.white,
    color: COLORS.black,
    fontSize: SIZES.xSmall - 1,
    position: 'absolute',
    marginLeft: 15,
    top: 15,
    zIndex: 5,
    textAlign: 'center',
    borderRadius: 10,
    padding: 5,
    elevation: 15,
  },

  textCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  text: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: '500',
    marginBottom: 1,
    marginLeft: 5,
  },
  address: {
    fontSize: SIZES.xSmall,
    color: COLORS.textLightGrey,
    fontWeight: '400',
    marginLeft: 5,
  },

  rating: {
    fontSize: SIZES.xSmall,
    color: COLORS.black,
    fontWeight: '400',
    marginBottom: 1,
    marginRight: 10,
  },

  customAlertBox: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
  },

  customAlert: {
    width: '80%',
    height: '30%',
    backgroundColor: COLORS.mainGrey,
    position: 'absolute',
    top: '35%',
    left: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 20,
  },

  CustomAlertTitle: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontWeight: 'bold',
  },

  CustomAlertMsg: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: '400',
    textAlign: 'center',
  },

  customAlertBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },

  alertBtns: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '500',
    padding: 10,
    borderRadius: 15,
    width: 100,
    textAlign: 'center',
    backgroundColor: COLORS.mainPurple,
  },
});
