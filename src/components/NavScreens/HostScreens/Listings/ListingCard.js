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
import Icon2 from 'react-native-vector-icons/AntDesign'
import Update from '../UpdatePage/Update';
import { images } from '../../../../constants';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CustomAlert = ({showAlert, setShowAlert,item,getHotelDetails}) => {
  // const [loading,setLoading]=useState(false)
  // const baseUrl="http://localhost:5000"
  const baseUrl="https://rentspace.kaifoundry.com"

  const {authData}=useSelector(state=>state.authDataReducer)
  const handleYes = async() => {
    console.log(item.hotelId)
    console.log(authData.privateKey,authData.publicKey,authData.delegation)
    await axios.delete(`${baseUrl}/api/v1/hotel/deleteHotel?hotelId=${encodeURIComponent(item.hotelId)}`,{
      headers:{
        "x-private":authData.privateKey,
        "x-public":authData.publicKey,
        "x-delegation":authData.delegation,
        "Content-Type":"multipart/form-data"
      }
    }).then((res)=>{
      console.log(res)
      setShowAlert(false);
      getHotelDetails()
    }).catch((err)=>{
      console.log(err)
    })
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
          <Text style={styles.CustomAlertTitle}>Delete Space</Text>
          <Text style={styles.CustomAlertMsg}>
            Are you sure you want to delete this space?
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

const ListingCard = ({item, getHotelDetails}) => {
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

  const imgX = item.imagesUrls;

  return (
    <View style={styles.card} >
      <View style={styles.cardView}>
        <Text style={styles.status}>{"verified"}</Text>
        <Image source={{uri:imgX}} style={styles.img} />
      </View>
      <View style={styles.textCont}>
        <View>
          <Text style={styles.text}>{item?.hotelName}</Text>
          <Text style={styles.address}>{item?.location}</Text>
        </View>
        <View style={styles.iconCont}>
          <TouchableOpacity onPress={openUpdateModal}>
            <Icon2 style={{marginRight:15}} name="edit" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteListing}>
            <Icon name="delete" color={COLORS.black} size={20} />
          </TouchableOpacity>
        </View>
        <CustomAlert getHotelDetails={getHotelDetails} showAlert={showAlert} setShowAlert={setShowAlert} item={item} />
      </View>

      <Modal visible={openUpdate} onRequestClose={() => setOpenUpdate(false)} >
        <Update item={item} setOpenUpdate={setOpenUpdate} getHotelDetails={getHotelDetails} />
      </Modal>

    </View>
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
  iconCont:{
    display:'flex',
    flexDirection:'row'
  },

  cardView: {
    backgroundColor: COLORS.black,
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
