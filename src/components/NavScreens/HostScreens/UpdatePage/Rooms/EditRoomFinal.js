import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import {COLORS} from '../../../../../constants/themes';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from '../../../../../../firebaseConfig';
import UploadModal from '../Popups/UploadModal';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

const EditRoomFinal = ({
  passIndex,
  room,
  setRoom,
  item,
  updateRooms,
  closeModal,
  setRoomPopup,
}) => {
  // console.log("Prev : ", room.roomID);

  console.log('Origina Length', item.length);
  console.log('Origina List', item);

  console.log('Room', room);

  const [transferred, setTransferred] = useState(0);
  const [upload, setUpload] = useState(false);

  const [lastItem, setLastItem] = useState({
    roomPrice: item[passIndex].roomPrice,
    photos: item[passIndex].photos,

  });


  const [roomPrice, setRoomPrice] = useState(item[passIndex].roomPrice);
  const [photos, setPhotos] = useState(item[passIndex].photos);

  const selectImage = async () => {
    console.log('Select Image');
    await launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      response => {
        if (response && !response.didCancel) {
          const fileSize = response.assets[0].fileSize;
          console.log('Response Size : ', fileSize);
          console.log('Response', response.assets[0].uri);

          const fileSizeInMB = fileSize / (1024 * 1024);
          console.log('File Size : ', fileSizeInMB);

          if (fileSizeInMB > 10) {
            // Alert.alert('Error', 'The selected image is larger than 10 MB. Please select a smaller image.');
            Dialog.show({
              type: ALERT_TYPE.WARNING,
              title: 'Size Exceeded',
              textBody:
                'The selected image is larger than 10 MB. Please select a smaller image.',
              button: 'OK',
            });
            return;
          }

          // setUpload(true);
          // uploadImage(response.assets[0].uri);
          const newPhotos = [response.assets[0].uri, ...lastItem.photos];
          console.log('New Photos', newPhotos);
          setLastItem({...lastItem, photos: newPhotos});
          // setPhotos(newPhotos);
        } else {
          console.log('No Image Selected');
        }
      },
    );
  };

  const uploadImage = async uri => {
    return new Promise(async (resolve, reject) => {
      console.log('Upload Image');
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
          console.log('Error Uploading Image', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log('File available at', downloadURL);
            const newPhotos = [...photos, downloadURL];
            console.log('New Photos', newPhotos);
            // setLastItem({...lastItem, photos: newPhotos});
            // setPhotos(newPhotos);
            resolve(newPhotos);

            setUpload(false);
          });
        },
      );
    });
  };

  useEffect(() => {
    console.log('Upload State : ', upload);
  }, [upload]);

  const deleteImage = index => {
    console.log('Delete Index', index);
    const newPhotos = lastItem.photos.filter((photo, i) => i !== index);
    console.log('New Photos', newPhotos);
    setLastItem({...lastItem, photos: newPhotos});
    
  };

  const updateFinalList = async() => {
    if (lastItem.photos.length === 0) {
      // alert('Please add atleast one photo');
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'No Photo',
        textBody: 'Please add atleast one photo',
        button: 'OK',
      });
      return;
    }
    if (roomPrice === '' || roomPrice === '0' || roomPrice === 0) {
      // alert('Please enter the price');
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'No Price',
        textBody: 'Please enter the price',
        button: 'OK',
      });
      return;
    } else {
      console.log('Before set upload : ', upload);

      setUpload(true);
      // uploadImage(lastItem.photos[0]);
      const resp = await Promise.resolve(uploadImage(lastItem.photos[0]));

      console.log('Upload Response : ', resp);

      const finalPhotos = [resp[0], ...lastItem.photos.slice(1)];


      const finalList = Object.assign({}, room, {
        roomPrice: roomPrice,
        photos: finalPhotos,
      });
      console.log('Final List', finalList);
      // item = [finalList, rest of the items];

      item[passIndex] = finalList;

      console.log('Updated List', item);

      // updateRooms(item);

      // setTimeout(() => {
        setRoomPopup(false);
      // }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => closeModal(false)}>
          <Icon name="chevron-left" size={16} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Room</Text>
      </View>
      <ScrollView style={styles.formContainer}>
        <View style={styles.imgUphead}>
          <Text style={styles.fleidTitle}>Upload Photos</Text>
          <TouchableOpacity onPress={() => selectImage()}>
            <Text style={{color: COLORS.black}}>+ Add More</Text>
          </TouchableOpacity>
        </View>

        {lastItem.photos.map((item, index) => {
          console.log('Item : ', item, index);
          return (
            <View key={index} style={{marginBottom: 5, height: 150}}>
              <Image key={index} source={{uri: item}} style={styles.roomImg} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteImage(index)}>
                <Icon2
                  name="delete"
                  size={20}
                  color={COLORS.black}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          );
        })}

        <Text style={styles.fleidTitle}>Price</Text>
        <TextInput
          keyboardType="numeric"
          placeholder={roomPrice ? `€${roomPrice}` : '€0'}
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          value={roomPrice}
          // onChangeText={text => setLastItem({...lastItem, roomPrice: text})}
          onChangeText={text => setRoomPrice(text)}
        />
        <TouchableOpacity onPress={() => updateFinalList()}>
          <Text style={styles.saveBtn}>Update & Save</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.progressBar} />
      </View> */}

      <Modal visible={upload} transparent>
        <UploadModal transferred={transferred} />
      </Modal>
    </View>
  );
};

export default EditRoomFinal;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: COLORS.mainGrey,
  },

  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 75,
    marginVertical: 15,
  },
  backBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 15,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 25,
  },

  imgUphead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomImg: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.black,
  },

  deleteButton: {
    padding: 5,
    borderRadius: 5,
    zIndex: 1,
    width: 50,
    left: '86%',
    top: -50,
  },

  deleteIcon: {
    backgroundColor: COLORS.white,
    width: 30,
    position: 'relative',
    // top: -50,
    // left: '88%',
    padding: 5,
    borderRadius: 5,
  },

  fleidTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: COLORS.textLightGrey,
    marginBottom: 5,
  },

  fleid: {
    width: '100%',
    height: 40,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  saveBtn: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 25,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: COLORS.black,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBar: {
    marginLeft: 25,
    marginRight: 25,
    height: 3,
    backgroundColor: COLORS.black,
    marginBottom: 25,
  },
});
