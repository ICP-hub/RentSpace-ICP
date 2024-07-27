import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../../constants/themes';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import {launchImageLibrary} from 'react-native-image-picker';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from '../../../../../firebaseConfig';
import {downloadFile} from 'react-native-fs';
import UploadModal from '../../../NavScreens/HostScreens/UpdatePage/Popups/UploadModal';
import {ALERT_TYPE, Dialog} from 'react-native-alert-notification';

const RoomFinal = ({
  // imgList,
  // setImgList,
  newRoom,
  setNewRoom,
  rooms,
  setRooms,
  setOpenNext,
  closeModal,
}) => {
  // const [imgList, setImgList] = useState([
  //   'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
  // ]);
  const [imgList, setImgList] = useState([]);

  const [transferred, setTransferred] = useState(0);
  const [upload, setUpload] = useState(false);

  // useEffect(() => {
  //   setNewRoom({...newRoom, photos: imgList});
  // }, [imgList]);

  const selectImage = async () => {
    console.log('Select Image');
    await launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      response => {
        if (response && !response.didCancel) {
          console.log('Response', response.assets[0].uri);

          const fileSize = response.assets[0].fileSize;
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
          // ----------------------
          const newPhotos = [response.assets[0].uri, ...imgList];
          console.log('New Photos', newPhotos);
          setImgList(newPhotos);
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
            const newPhotos = [downloadURL];
            console.log('New Photos', newPhotos);
            resolve(newPhotos);
          });
        },
      );
    });
  };

  const deleteImg = index => {
    console.log('Delete Index', index);
    const newPhotos = imgList.filter((photo, i) => i !== index);
    console.log('New Photos', newPhotos);
    setImgList(newPhotos);
  };

  const createRoom = async () => {
    if (newRoom.roomPrice === 0 || imgList.length === 0) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Please Fill All the Fields',
        textBody: 'No Field Should be Empty',
        button: 'OK',
      });
    } else {
      console.log(newRoom);
      // ----------------------
      setUpload(true);
      // can be used to upload multiple images in the future using loop
      // uploadImage(imgList[0]);
      const uploadURL = await Promise.resolve(uploadImage(imgList[0]));

      setNewRoom({...newRoom, photos: uploadURL});
      setUpload(false);
      // closeModal(false);
      // // ----------------------
      const finalRoomList = [...rooms, {...newRoom, photos: uploadURL}];
      console.log('Final Room => ', finalRoomList);
      setRooms(finalRoomList);
      closeModal(false);
    }

    // console.log(newRoom);
    // const finalRoomList = [...rooms, newRoom]

    // console.log("Final Room => ", finalRoomList)

    // setRooms(finalRoomList);
    // closeModal(false);
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Rooms</Text>
      </View>
      <View>
        <Text
          style={{
            color: COLORS.textLightGrey,
            marginHorizontal: 26,
            fontWeight: '500',
            fontSize: 18,
          }}>
          Please enter room details below
        </Text>
        <View
          style={{
            width: '85%',
            marginHorizontal: 26,
            height: 1,
            marginTop: 5,
            backgroundColor: COLORS.textLightGrey,
          }}
        />
      </View>

      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View style={styles.formContainer}>
          {imgList.length > 0 ? (
            <>
              <View style={styles.imgUphead}>
                <Text style={styles.fleidTitle}>Upload Photos</Text>
                <TouchableOpacity onPress={() => selectImage()}>
                  <Text style={{color: COLORS.black}}>+ Add More</Text>
                </TouchableOpacity>
              </View>
              {imgList.map((img, index) => {
                return (
                  <View key={index} style={{marginBottom: 5, height: 150}}>
                    <Image
                      key={index}
                      source={{uri: img}}
                      style={styles.roomImg}
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteImg(index)}>
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
            </>
          ) : (
            <>
              <View style={styles.imgUphead}>
                <Text style={styles.fleidTitle}>Upload Photos</Text>
              </View>
              <View style={styles.fleid2}>
                <Text style={{color: COLORS.textLightGrey, fontSize: 12}}>
                  No File Choosen
                </Text>
                <TouchableOpacity
                  style={styles.uploadBtn}
                  onPress={() => selectImage()}>
                  <Icon
                    name="upload"
                    size={20}
                    color={COLORS.white}
                    style={{marginRight: 10}}
                  />
                  <Text style={{color: COLORS.white, fontSize: 12}}>
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <Text style={styles.fleidTitle}>Room Price</Text>
          <TextInput
            value={newRoom.roomPrice.toString()}
            keyboardType="numeric"
            placeholder={newRoom.roomPrice.toString()}
            placeholderTextColor={COLORS.textLightGrey}
            style={styles.fleid}
            onChangeText={text =>
              setNewRoom({...newRoom, roomPrice: Number(text)})
            }
          />

          <TouchableOpacity onPress={() => createRoom()}>
            <Text style={styles.createBTN}>Create Room</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.progressBar} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 26,
            }}>
            <TouchableOpacity
              onPress={() => {
                setOpenNext(false);
              }}>
              <Text style={styles.link}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={upload} transparent>
        <UploadModal transferred={transferred} />
      </Modal>
    </View>
  );
};

export default RoomFinal;

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.mainGrey,
  },
  header: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  formContainer: {
    width: '100%',
    padding: 25,
    // backgroundColor:'red'
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
    padding: 5,
    borderRadius: 5,
  },

  fleidTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: COLORS.textLightGrey,
    marginVertical: 5,
  },

  imgUphead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
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

  fleid2: {
    width: '100%',
    height: 40,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  uploadBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: -5,
  },

  createBTN: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
  },

  progressBar: {
    width: '85%',
    marginLeft: 25,
    height: 3,
    backgroundColor: COLORS.black,
    // marginTop: 90,
  },

  link: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
    marginVertical: 20,
  },
});
