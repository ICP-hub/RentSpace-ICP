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
} from 'react-native';
import {useState} from 'react';
import {COLORS} from '../../../../../constants/themes';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {storage} from '../../../../../../firebaseConfig';
import UploadModal from '../Popups/UploadModal';

const EditRoomFinal = ({passIndex, room, item, updateRooms, closeModal, setRoomPopup}) => {

  // console.log("Prev : ", room.roomID);

  console.log('Origina Length', item.length);
  console.log('Origina List', item);

  console.log('Room', room);

  const [transferred, setTransferred] = useState(0);
  const [upload, setUpload] = useState(false);

  const [lastItem, setLastItem] = useState({
    roomPrice: item[0].roomPrice,
    photos: item[0].photos,
    // photos: [],
  });

  const selectImage = async() => {
    console.log('Select Image');
    await launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      response=>{
        if(response && !response.didCancel){
          console.log('Response', response.assets[0].uri);
          setUpload(true);
          uploadImage(response.assets[0].uri);
        } else{
          console.log('No Image Selected');
        }
      }
    );

  };

  const uploadImage = async(uri) => {
    console.log('Upload Image');
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, 'hotelImage/' + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setTransferred(progress.toFixed());
      },
      error=>{
        console.log('Error Uploading Image', error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
          console.log('File available at', downloadURL);
          const newPhotos = [...lastItem.photos, downloadURL];
          console.log('New Photos', newPhotos);
          setLastItem({...lastItem, photos: newPhotos});
          setUpload(false);
        });
      }
    );
  };

  const deleteImage = index => {
    console.log('Delete Index', index);
    const newPhotos = lastItem.photos.filter((photo, i) => i !== index);
    console.log('New Photos', newPhotos);
    setLastItem({...lastItem, photos: newPhotos});
  };

  const updateFinalList = () => {
    const finalList = Object.assign({}, room, lastItem);
    // console.log('Final List', finalList);

    // item = [finalList, rest of the items];

    item[passIndex] = finalList;

    console.log('Updated List', item);

    // updateRooms(item);
    setRoomPopup(false);
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
          return (
            <View key={index} style={{marginBottom: 5, height: 150}}>
              <Image key={index} source={{uri: item}} style={styles.roomImg} />
              <TouchableOpacity onPress={() => deleteImage(index)}>
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
          placeholder={`$${lastItem.roomPrice}`}
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          value={lastItem.roomPrice}
          onChangeText={text => setLastItem({...lastItem, roomPrice: text})}
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

  deleteIcon: {
    backgroundColor: COLORS.white,
    width: 30,
    position: 'relative',
    top: -50,
    left: '88%',
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
