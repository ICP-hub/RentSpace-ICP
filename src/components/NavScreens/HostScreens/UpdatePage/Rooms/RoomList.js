import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../../constants/themes';
import EditRoom from './EditRoom';
// import RoomDetails from '../../../../HostViewNew/Step1/RoomTypes/RoomDetails';
import RoomDetails from '../../../../HostViewNew/Step3/RoomTypes/RoomDetails';

export default function RoomList({item, updateRooms, setRoomPopup}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [rooms, setRooms] = useState(item);

  const [passIndex, setPassIndex] = useState(0);

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    updateRooms(rooms);
  }, [rooms]);
  

  const deleteRoom = index => {
    console.log('delete room', rooms[index].roomID);
    console.log('Original Rooms', rooms);

    rooms.splice(index, 1);

    setRefresh(refresh + 1);

    console.log('After Delete', rooms);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Rooms</Text>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
        {rooms.map((room, index) => {
          return (
            <View style={styles.roomCard} key={index}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.roomTypeTxt}>{room.roomType}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setOpenEditModal(true);
                    setPassIndex(index);
                  }}>
                  <Icon name="pencil" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
              <Image
                source={{
                  uri: room.photos[0],
                }}
                style={styles.roomImg}
              />
              <View style={styles.lowerInfos}>
                <Text style={styles.lowerInfoTitle}>Total Rooms</Text>
                <Text style={styles.lowerInfoVal}>{room.totalRooms}</Text>
              </View>
              <View style={styles.lowerInfos}>
                <Text style={styles.lowerInfoTitle}>Max Occupancy</Text>
                <Text style={styles.lowerInfoVal}>{room.maxOccupancy}</Text>
              </View>
              <View style={styles.lowerInfos}>
                <Text style={styles.lowerInfoTitle}>Price</Text>
                <Text style={styles.price}>€{room.roomPrice}/Night</Text>
              </View>
              <TouchableOpacity onPress={() => deleteRoom(index)}>
                <Text style={styles.deleteBtn}>Delete Room</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity style={styles.addBtnCont} onPress={() => setOpenCreateModal(true)}>
          <Text style={styles.addBtn}>+ Create New Room</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Room Update Modal */}
      <Modal
        animationType="slide"
        visible={openEditModal}
        onRequestClose={() => {
          setOpenEditModal(false);
        }}>
        <EditRoom
          closeModal={setOpenEditModal}
          passIndex={passIndex}
          room={item}
          updateRooms={updateRooms}
          setRoomPopup={setRoomPopup}
        />
      </Modal>

      {/* Room Create Modal */}
      <Modal animationType="slide" visible={openCreateModal} onRequestClose={()=>setOpenCreateModal(false)}>
        <RoomDetails rooms={rooms} setRooms={setRooms} closeModal={setOpenCreateModal} />
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.newBG,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 15,
  },
  roomCard: {
    width: '90%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  roomTypeTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  roomImg: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  lowerInfos: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  lowerInfoTitle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  lowerInfoVal: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textLightGrey,
  },
  price: {
    fontSize: 16,
    backgroundColor: COLORS.black,
    color: COLORS.white,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  deleteBtn: {
    fontSize: 16,
    color: COLORS.white,
    backgroundColor: COLORS.black,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    marginVertical: 10,
  },

  addBtnCont: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addBtn: {
    fontSize: 20,
    color: COLORS.white,
    backgroundColor: COLORS.black,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
  },
});
