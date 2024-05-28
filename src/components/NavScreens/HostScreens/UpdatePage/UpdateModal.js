import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../../constants/themes';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import {launchImageLibrary} from 'react-native-image-picker';

import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from '../../../../../firebaseConfig';
import axios from 'axios';
import UploadModal from './Popups/UploadModal';
import SubmitUpdates from './Popups/SubmitUpdates';
import { useSelector } from 'react-redux';

const UpdateModal = ({item, passData, exitModal, getHotelDetails}) => {
  // console.log(item);

  let img = item.imagesUrls;
  let vdo = item.videoUrls;

  const [upload, setUpload] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [pauseReel, setPauseReel] = useState(true);
  const [videoControlOpacity, setVideoControlOpacity] = useState(true);
  const [hotelImg, setHotelImg] = useState(item.imagesUrls);
  const [hotelVdo, setHotelVdo] = useState(item.videoUrls);
  const {authData}=useSelector(state => state.authDataReducer)

  const [transferred, setTransferred] = useState(0);

 

  const [checkOption, setCheckOption] = useState({
    camera: true,
    weapon: true,
    animal: true,
  });

  const [payOption, setPayOption] = useState({
    ethereum: false,
    applePay: false,
    googlePay: false,
    btc: false,
    icp: false,
    creditCard: false,
  });

  const [discounts, setDiscounts] = useState({
    '10%': false,
    '20%': false,
    '30%': false,
  });

  const [finalData, setFinalData] = useState({
    hotelId: passData.hotelId,
    hotelName: passData.title,
    location: passData.location,
    amenities: passData.propertyAmenities,
    propertyType: passData.propertyName,
    hotelDes: '',
    price: '',
    imagesUrls: '',
    videoUrls: '',
    paymentMethods: [],
  });

  const videoControl = () => {
    setVideoControlOpacity(!videoControlOpacity);
  };
  const videoControl2 = () => {
    setTimeout(() => {
      setVideoControlOpacity(!videoControlOpacity);
    }, 1500);
  };

    const chooseHotelImg = async () => {
    await launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      response => {
        if (response && !response.didCancel) { // Check if response is valid and not cancelled
          setHotelImg(response.assets[0].uri);
          console.log('Image => ', response.assets[0].uri);
          setUpload(true);
          uploadImage(response.assets[0].uri);
        } else {
          console.log('No Image Selected or Image Picker Cancelled');
        }
      },
    );
  };

  const chooseHotelvdo = async () => {
    await launchImageLibrary(
      { mediaType: 'video', includeBase64: true },
      response => {
        if (response && !response.didCancel) { // Check if response is valid and not cancelled
          setHotelVdo(response.assets[0].uri);
          console.log('Video => ', response.assets[0].uri);
          setUpload(true);
          uploadVideo(response.assets[0].uri);
        } else {
          console.log('No Video Selected or Video Picker Cancelled');
        }
      },
    );
  };

  // upload function to upload image to firebase
  const uploadImage = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, 'hotelImage/' + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setTransferred(progress.toFixed());
      },
      error => {
        console.log('Error => ', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
          console.log('File available at', downloadURL);
          setFinalData({...finalData, imagesUrls: downloadURL});
          setUpload(false);
        });
      },
    );
  };

  // upload function to upload image to firebase
  const uploadVideo = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, 'hotelVideo/' + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setTransferred(progress.toFixed());
      },
      error => {
        console.log('Error => ', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
          console.log('File available at', downloadURL);
          setFinalData({...finalData, videoUrls: downloadURL});
          setUpload(false);
        });
      },
    );
  };



  // save and exit function to save data and exit modal
  const saveAndExit = async () => {
    console.log('Save And Exit');

    setSubmit(true);

    await axios
      .put('http://localhost:5000/api/v1/hotel/updateHotel', finalData,{
        headers:{
        "x-private":authData.privateKey,
        "x-public":authData.publicKey,
        "x-delegation":authData.delegation,
      }})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    setTimeout(() => {
      setSubmit(false);
    }, 5000);

    getHotelDetails();
    exitModal(false);
    console.log(finalData);
  };





  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Update Page</Text>
        <View style={styles.headerIcons}>
          {/* <TouchableOpacity>
            <Icon name="collage" size={25} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon2 name="plus" size={25} color={COLORS.black} />
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          width: Dimensions.get('window').width,
          paddingHorizontal: 10,
        }}>
        {/* sec1 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Place Description</Text>
        </View>
        <TextInput
          style={[styles.textInput, {height: 100, textAlignVertical: 'top'}]}
          multiline={true}
          placeholder={item.hotelDescription}
          onChangeText={text => setFinalData({...finalData, hotelDes: text})}
        />

        {/* sec2 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cover Photo</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: hotelImg}} style={styles.imgStyle} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => chooseHotelImg()}>
            <Text style={styles.btn}>Upload New Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btn}>Add Photo Upoald</Text>
            {/* Add Photo */}
          </TouchableOpacity>
        </View>

        {/* sec3 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Video</Text>
        </View>
        <View style={styles.imageContainer}>
          <Video
            source={{uri: hotelVdo}}
            resizeMode="cover"
            paused={pauseReel}
            onEnd={() => setPauseReel(true)}
            playbackRate={1.0}
            volume={1.0}
            muted={false}
            ignoreSilentSwitch="ignore"
            controls={true}
            posterResizeMode="cover"
            poster={hotelImg}
            style={styles.backgroundVideo}
            
          />
          <TouchableOpacity
            onPress={videoControl}
            style={
              videoControlOpacity
                ? styles.videoControlBtnContainer
                : styles.videoControlBtnContainerInvisible
            }>
            <Icon
              name={pauseReel ? 'play-circle-outline' : 'pause-circle-outline'}
              size={50}
              style={
                videoControlOpacity ? styles.videoControlBtn : {display: 'none'}
              }
              onPress={() => {
                setPauseReel(!pauseReel);
                videoControl2();
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => chooseHotelvdo()}>
            <Text style={styles.btn}>Upload New Video</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btn}>Add Video</Text>
          </TouchableOpacity>
        </View>

        {/* sec4 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Price</Text>
        </View>
        <TextInput
          style={styles.textInput}
          inputMode="numeric"
          placeholder={`$${item.price}/Night`}
          onChangeText={text =>
            setFinalData({...finalData, price: parseFloat(text)})
          }
        />

        {/* sec5 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
        </View>
        <View style={styles.payContainer}>
          <TouchableOpacity
            onPress={() => {
              setPayOption({...payOption, ethereum: !payOption.ethereum});
              setFinalData(prevState => ({
                ...prevState,
                paymentMethods: [...prevState.paymentMethods, 'ckEth'],
              }));
            }}>
            <View
              style={
                payOption.ethereum ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="ethereum" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPayOption({...payOption, applePay: !payOption.applePay});
              setFinalData(prevState => ({
                ...prevState,
                paymentMethods: [...prevState.paymentMethods, 'applePay'],
              }));
            }}>
            <View
              style={
                payOption.applePay ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="apple-pay" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPayOption({...payOption, googlePay: !payOption.googlePay});
              setFinalData(prevState => ({
                ...prevState,
                paymentMethods: [...prevState.paymentMethods, 'gPay'],
              }));
            }}>
            <View
              style={
                payOption.googlePay ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="google-pay" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPayOption({...payOption, btc: !payOption.btc});
              setFinalData(prevState => ({
                ...prevState,
                paymentMethods: [...prevState.paymentMethods, 'ckBTC'],
              }));
            }}>
            <View style={payOption.btc ? styles.payItemActive : styles.payItem}>
              <Icon4 name="btc" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPayOption({...payOption, icp: !payOption.icp});
              setFinalData(prevState => ({
                ...prevState,
                paymentMethods: [...prevState.paymentMethods, 'ICP'],
              }));
            }}>
            <View style={payOption.icp ? styles.payItemActive : styles.payItem}>
              <Text style={styles.payItemText}>ICP</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPayOption({...payOption, creditCard: !payOption.creditCard});
              setFinalData(prevState => ({
                ...prevState,
                paymentMethods: [...prevState.paymentMethods, 'creditCard'],
              }));
            }}>
            <View
              style={
                payOption.creditCard ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="credit-card" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
        </View>

        {/* sec6 */}
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discounts</Text>
        </View>
        <View style={styles.payContainer}>
          <TouchableOpacity
            onPress={() =>
              setDiscounts({...discounts, '10%': !discounts['10%']})
            }>
            <View
              style={discounts['10%'] ? styles.payItemActive : styles.payItem}>
              <Text
                style={
                  discounts['10%']
                    ? styles.payItemTextActive
                    : styles.payItemText
                }>
                10%
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setDiscounts({...discounts, '20%': !discounts['20%']})
            }>
            <View
              style={discounts['20%'] ? styles.payItemActive : styles.payItem}>
              <Text
                style={
                  discounts['20%']
                    ? styles.payItemTextActive
                    : styles.payItemText
                }>
                20%
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setDiscounts({...discounts, '30%': !discounts['30%']})
            }>
            <View
              style={discounts['30%'] ? styles.payItemActive : styles.payItem}>
              <Text
                style={
                  discounts['30%']
                    ? styles.payItemTextActive
                    : styles.payItemText
                }>
                30%
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}

        {/* sec7 */}
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Place Have</Text>
        </View>
        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            setCheckOption({...checkOption, camera: !checkOption.camera})
          }>
          <Text
            style={
              checkOption.camera ? styles.optionText : styles.optionTextActive
            }>
            Security Camera
          </Text>
          <Icon2
            name="checkcircle"
            size={20}
            style={
              checkOption.camera ? styles.optionIcon : styles.optionIconActive
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            setCheckOption({...checkOption, weapon: !checkOption.weapon})
          }>
          <Text
            style={
              checkOption.weapon ? styles.optionText : styles.optionTextActive
            }>
            Weapons
          </Text>
          <Icon2
            name="checkcircle"
            size={20}
            style={
              checkOption.weapon ? styles.optionIcon : styles.optionIconActive
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            setCheckOption({...checkOption, animal: !checkOption.animal})
          }>
          <Text
            style={
              checkOption.animal ? styles.optionText : styles.optionTextActive
            }>
            Dangerous Animals
          </Text>
          <Icon2
            name="checkcircle"
            size={20}
            style={
              checkOption.animal ? styles.optionIcon : styles.optionIconActive
            }
          />
        </TouchableOpacity> */}

        {/* sec8 */}
        <TouchableOpacity style={styles.saveBtn} onPress={saveAndExit}>
          <Text style={styles.saveBtnText}>Update And Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Upload Modal */}

      <Modal visible={upload} transparent>
        <UploadModal transferred={transferred} />
      </Modal>

      {/* Submit Modal */}
      {/* <Modal visible={submit} transparent>
        <SubmitUpdates />
      </Modal> */}
      <ActivityIndicator animating={submit} style={styles.loader} size={40}/>
    </View>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  loader:{
    position:'absolute',
    top:'40%',
    marginHorizontal:'50%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.mainGrey,
    paddingTop: 10,
    width: '100%',
    height: '100%',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  headerTitle: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '500',
  },

  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginVertical: 10,
  },

  sectionTitle: {
    color: COLORS.black,
    fontWeight: '400',
  },

  textInput: {
    width: '100%',
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
  },

  imageContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: '100%',
    height: 200,
  },

  imgStyle: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  btn: {
    width: 150,
    height: 50,
    color: COLORS.mainPurple,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    borderRadius: 10,
    textAlign: 'center',
    paddingTop: 15,
    fontWeight: '800',
  },

  backgroundVideo: {
    position: 'absolute',
    borderRadius: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
  },

  videoControlBtnContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  videoControlBtnContainerInvisible: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'transparent',
  },

  videoControlBtn: {
    color: COLORS.white,
    position: 'relative',
    zIndex: 1,
  },

  payContainer: {
    width: '100%',
    height: 'fit-content',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  payItem: {
    width: 100,
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },

  payItemActive: {
    width: 100,
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.mainPurple,
    backgroundColor: COLORS.mainPurple,
  },

  payItemText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 20,
  },

  payItemTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
  },

  option: {
    width: '100%',
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    marginVertical: 5,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },

  optionTextActive: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.mainPurple,
  },

  optionIcon: {
    display: 'none',
  },

  optionIconActive: {
    display: 'flex',
    color: COLORS.mainPurple,
  },

  saveBtn: {
    width: '100%',
    height: 60,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    backgroundColor: COLORS.mainPurple,
    marginVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveBtnText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
  },
});
