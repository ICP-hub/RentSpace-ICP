import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState, useEffect} from 'react';
import {COLORS} from '../../../../../constants/themes';
import Icon from 'react-native-vector-icons/Entypo';
import EditRoomFinal from './EditRoomFinal';
import Room from '../../../../HostViewNew/Step1/RoomTypes/Room';

const EditRoom = ({closeModal, passIndex, room, updateRooms, setRoomPopup}) => {
  /*

  closeModal = callback function to close this modal
  passIndex = index of the selected room to be edited
  room =  origianl array of rooms
  updateRooms = callback function to update the rooms array in the parent component
  setRoomPopup = callback function to set the room popup in the parent component  
  
  */

  useEffect(() => {
    console.log("opera : ", room[passIndex]);
  }, []);

  const [openEditFinalModal, setOpenEditFinalModal] = useState(false);

  console.log('Selected Room Index : ', passIndex);

  const [rooms, setRooms] = useState({
    roomID: room[passIndex].roomID,
    roomName: room[passIndex].roomName,
    roomDes: room[passIndex].roomDec,
    roomType: room[passIndex].roomType,
    totalRooms: room[passIndex].totalRooms,
    maxOccupancy: room[passIndex].maxOccupancy,
    totalAvailableRooms: room[passIndex].totalAvailableRooms,
    // photos: room[passIndex].photos,
    // roomPrice: room[passIndex].roomPrice,
  });

  // console.log('1 : ',rooms.roomID);
  // console.log('2 : ',room[passIndex].roomID);
  // console.log('3 : ', rooms.photos, rooms.roomPrice);

  const booked = rooms.totalRooms - rooms.totalAvailableRooms;

  const increment = () => {
    setRooms({
      ...rooms,
      totalRooms: rooms.totalRooms + 1,
      totalAvailableRooms: rooms.totalAvailableRooms + 1,
    });
  };

  const decrement = () => {
    if (rooms.totalRooms > booked) {
      setRooms({
        ...rooms,
        totalRooms: rooms.totalRooms - 1,
        totalAvailableRooms: rooms.totalAvailableRooms - 1,
      });
    } else {
      alert('Total Available Rooms can not be less than Booked Rooms');
    }
  };

  const saveAndNext = () => {
    console.log('Save and Next');
    console.log(rooms);
    setOpenEditFinalModal(true);
  };

  // useEffect(() => {
  //   console.log('RoomID => ', rooms.roomID);
  //   console.log('RoomName => ', rooms.roomName);
  //   console.log('RoomDes => ', rooms.roomDes);
  //   console.log('RoomType => ', rooms.roomType);
  // console.log('TotalRooms => ', rooms.totalRooms);
  //   console.log('MaxOccupancy => ', rooms.maxOccupancy);
  //  console.log('TotalAvailableRooms => ', rooms.totalAvailableRooms);
  // console.log(rooms.totalRooms, booked, rooms.totalAvailableRooms);
  // }, [rooms]);

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
      <View style={styles.formContainer}>
        <Text style={styles.fleidTitle}>Room Name</Text>
        <TextInput
          value={String(rooms.roomName)}
          // placeholder={rooms.roomName}
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          onChangeText={text => setRooms({...rooms, roomName: text})}
        />
        <Text style={styles.fleidTitle}>Room Description </Text>
        <TextInput
          value={rooms.roomDes}
          multiline={true}
          placeholder={rooms.roomDes}
          placeholderTextColor={COLORS.textLightGrey}
          style={[styles.fleid, {height: 100, textAlignVertical: 'top'}]}
          onChangeText={text => setRooms({...rooms, roomDes: text})}
        />
        <Text style={styles.fleidTitle}>Room Type</Text>
        <TextInput
          value={rooms.roomType}
          placeholder={rooms.roomType}
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          onChangeText={text => setRooms({...rooms, roomType: text})}
        />
        <Text style={styles.fleidTitle}>Total No.Of Similar Rooms</Text>
        <View style={styles.fleid2}>
          <Text style={{color: COLORS.black}}>{rooms.totalRooms}</Text>
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
          value={rooms.maxOccupancy}
          keyboardType="numeric"
          placeholder={`${rooms.maxOccupancy}`}
          placeholderTextColor={COLORS.textLightGrey}
          style={styles.fleid}
          onChangeText={text => setRooms({...rooms, maxOccupancy: text})}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={styles.progressBar} />
        <TouchableOpacity onPress={() => saveAndNext()}>
          <Text style={styles.saveBtn}>Save & Next</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={openEditFinalModal}
        onRequestClose={() => {
          setOpenEditFinalModal(false);
        }}>
        <EditRoomFinal
          passIndex={passIndex}
          room={rooms}
          setRoom={setRooms}
          item={room}
          updateRooms={updateRooms}
          closeModal={setOpenEditFinalModal}
          setRoomPopup={setRoomPopup}
        />
      </Modal>
    </View>
  );
};

export default EditRoom;

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

  saveBtn: {
    width: 140,
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
});
