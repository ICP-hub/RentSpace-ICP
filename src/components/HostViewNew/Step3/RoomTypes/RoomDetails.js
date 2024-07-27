import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../../constants/themes';
import Icon from 'react-native-vector-icons/Entypo';
import RoomFinal from './RoomFinal';
import uuid from 'react-native-uuid';
import { Dialog,ALERT_TYPE } from 'react-native-alert-notification';

const RoomDetails = ({rooms, setRooms, closeModal}) => {
  const [openNext, setOpenNext] = useState(false);

  const [imgList, setImgList] = useState([]);

  // console.log('Rooms', rooms);

  const [newRoom, setNewRoom] = useState({
    roomID: uuid.v4(),
    roomType: '',
    roomName: '',
    roomDec: '',
    roomPrice: 0,
    totalRooms: 1,
    totalAvailableRooms: 1,
    maxOccupancy: 1,
    photos: [],
  });

  // console.log(newRoom);

  const increment = () => {
    setNewRoom({
      ...newRoom,
      totalRooms: newRoom.totalRooms + 1,
      totalAvailableRooms: newRoom.totalAvailableRooms + 1,
    });
  };

  const decrement = () => {
    if (newRoom.totalRooms > 0) {
      setNewRoom({
        ...newRoom,
        totalRooms: newRoom.totalRooms - 1,
        totalAvailableRooms: newRoom.totalAvailableRooms - 1,
      });
    }
  };

  // useEffect(() => {
  //   console.log('New Room', newRoom);
  // }, [newRoom]);

  const goNext = () => {
    if (
      newRoom.roomName === '' ||
      newRoom.roomDec === '' ||
      newRoom.roomType === '' ||
      newRoom.totalRooms === 0 ||
      newRoom.maxOccupancy === 0
    ) {
      // alert('Please fill all the fields');
      Dialog.show({
        type:ALERT_TYPE.WARNING,
        title:'Please Fill All the Fields',
        textBody:'No Field Should be Empty',
        button:'OK',
      })
      return;
    } else {
      setOpenNext(true);
    }
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
      <View style={styles.formContainer}>
        <Text style={styles.fleidTitle}>Room Name</Text>
        <TextInput
          placeholder="Enter Room Name"
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          onChangeText={text => setNewRoom({...newRoom, roomName: text})}
        />
        <Text style={styles.fleidTitle}>Room Dec</Text>
        <TextInput
          multiline={true}
          value={newRoom.roomDec}
          placeholder="Enter Room Description"
          placeholderTextColor={COLORS.textLightGrey}
          style={[styles.fleid, {height: 100, textAlignVertical: 'top'}]}
          onChangeText={text => setNewRoom({...newRoom, roomDec: text})}
        />
        <Text style={styles.fleidTitle}>Room Type</Text>
        <TextInput
          placeholder="Enter Room Type"
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          onChangeText={text => setNewRoom({...newRoom, roomType: text})}
        />
        <Text style={styles.fleidTitle}>Total No.Of Similar Rooms</Text>
        <View style={styles.fleid2}>
          {/* <Text style={{color: COLORS.black}}>{newRoom.totalRooms}</Text> */}
          <TextInput
            style={{color: COLORS.black, width: '70%'}}
            value={newRoom.totalRooms.toString()}
            keyboardType="numeric"
            onChangeText={text =>
              setNewRoom({
                ...newRoom,
                totalRooms: Number(text),
                totalAvailableRooms: Number(text),
              })
            }
          />
          <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <TouchableOpacity onPress={() => decrement()}>
              <Icon
                name="minus"
                size={20}
                color={COLORS.white}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => increment()}>
              <Icon
                name="plus"
                size={20}
                color={COLORS.white}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.fleidTitle}>Max. Occupancy</Text>
        <TextInput
          value={newRoom.maxOccupancy.toString()}
          keyboardType="numeric"
          placeholder={newRoom.maxOccupancy.toString()}
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          onChangeText={text => setNewRoom({...newRoom, maxOccupancy: text})}
        />
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
          <TouchableOpacity onPress={() => closeModal(false)}>
            <Text style={styles.link}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goNext()}>
            <Text style={styles.saveBtn}>Save & Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={openNext}
        animationType="slide"
        onRequestClose={() => setOpenNext(false)}>
        <RoomFinal
          // imgList={imgList}
          // setImgList={setImgList}
          newRoom={newRoom}
          setNewRoom={setNewRoom}
          rooms={rooms}
          setRooms={setRooms}
          setOpenNext={setOpenNext}
          closeModal={closeModal}
        />
      </Modal>
    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.newBG,
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
  },

  fleidTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: COLORS.textLightGrey,
    marginVertical: 5,
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

  iconStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 5,
    color: COLORS.black,
  },

  progressBar: {
    width: '50%',
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
  },

  saveBtn: {
    width: 140,
    marginLeft: 'auto',
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
});
