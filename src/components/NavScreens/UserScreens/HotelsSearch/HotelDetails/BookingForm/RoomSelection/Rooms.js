import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {COLORS} from '../../../../../../../constants/themes';
import {Color} from 'react-native-alert-notification/lib/typescript/service';

const Rooms = ({item, setRoomData, setRoomModal,booking}) => {
  const [rooms, setRooms] = useState(item.rooms);

  const [selectedRooms, setSelectedRooms] = useState([]);

  // const handleAddRoom = (roomID, roomPrice, totalAvailableRooms) => {

  //   console.log('Total Available Rooms: ', totalAvailableRooms);

  //   setSelectedRooms(prevSelectedRooms => {
  //     const existingRoom = prevSelectedRooms.find(
  //       room => room.roomID === roomID,
  //     );

  //     if (existingRoom) {
  //       if(existingRoom.totalRooms < totalAvailableRooms){
  //         return prevSelectedRooms.map(room =>
  //           room.roomID === roomID
  //             ? {
  //                 ...room,
  //                 totalRooms: room.totalRooms + 1,
  //                 bill: (room.totalRooms + 1) * roomPrice,
  //               }
  //             : room,
  //         );
  //       }else{
  //         Alert.alert('Error', 'No more rooms available');
  //         return prevSelectedRooms;
  //       }
  //     } else {
  //       return [
  //         ...prevSelectedRooms,
  //         {roomID, totalRooms: 1, roomPrice, bill: roomPrice},
  //       ];
  //     }
  //   });
  // };

  const handleAddRoom = (roomID, roomPrice, totalAvailableRooms, roomName) => {
    console.log('Total Available Rooms: ', totalAvailableRooms);

    setSelectedRooms(prevSelectedRooms => {
      const existingRoom = prevSelectedRooms.find(
        room => room.roomID === roomID,
      );

      if (existingRoom) {
        if (existingRoom.totalRooms < totalAvailableRooms) {
          return prevSelectedRooms.map(room =>
            room.roomID === roomID
              ? {
                  ...room,
                  totalRooms: room.totalRooms + 1,
                  bill: (room.totalRooms + 1) * roomPrice,
                }
              : room,
          );
        } else {
          Alert.alert('Error', 'No more rooms available');
          return prevSelectedRooms;
        }
      } else {
        if (totalAvailableRooms > 0) {
          return [
            ...prevSelectedRooms,
            {roomID, totalRooms: 1, roomPrice, bill: roomPrice,roomName},
          ];
        } else {
          Alert.alert('Error', 'No rooms available to add');
          return prevSelectedRooms;
        }
      }
    });
  };

  const handleRemoveRoom = (roomID, price) => {
    setSelectedRooms(prevSelectedRooms => {
      const existingRoom = prevSelectedRooms.find(
        room => room.roomID === roomID,
      );

      if (existingRoom && existingRoom.totalRooms > 1) {
        return prevSelectedRooms.map(room =>
          room.roomID === roomID
            ? {
                ...room,
                totalRooms: room.totalRooms - 1,
                bill: (room.totalRooms - 1) * price,
              }
            : room,
        );
      } else {
        return prevSelectedRooms.filter(room => room.roomID !== roomID);
      }
    });
  };

  //   useEffect(() => {
  //     console.log('Selected Rooms: ', selectedRooms);
  //   }, [selectedRooms]);

  const submitRooms = () => {
    console.log('Selected Rooms: ', selectedRooms);
    setRoomData(selectedRooms);
    setRoomModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}>Select Rooms</Text>
      <ScrollView>
        {rooms.map((room, index) => {
          const selectedRoom = selectedRooms.find(
            r => r.roomID === room.roomID,
          );
          const totalRooms = selectedRoom ? selectedRoom.totalRooms : 0;

          return (
            <View key={index} style={styles.card}>
              <Image source={{uri: room.photos[0]}} style={styles.image} />
              <Text style={styles.roomTitle}>{room.roomName}</Text>
              <View style={styles.roomDetails}>
                <View style={styles.roomDetailsContainer}>
                  <Text style={styles.roomDetailsText}>Max Occupancy</Text>
                  <Text style={styles.roomDetailsText}>
                    {room.maxOccupancy}
                  </Text>
                </View>
                <View style={styles.roomDetailsContainer}>
                  <Text style={styles.roomDetailsText}>Available Rooms</Text>
                  <Text style={styles.roomDetailsText}>
                    {room.totalAvailableRooms}
                  </Text>
                </View>
                <View style={styles.roomDetailsContainer}>
                  <Text style={styles.roomDetailsText}>Room Price</Text>
                  <Text style={styles.roomDetailsText}>€{room.roomPrice}</Text>
                </View>
              </View>

              {selectedRoom ? (
                <View style={styles.roomBtnContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      handleRemoveRoom(room.roomID, room.roomPrice)
                    }>
                    <Text
                      style={[
                        styles.roomBtnText,
                        {marginRight: 10, marginLeft: 10},
                      ]}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: '500',
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    {totalRooms}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleAddRoom(
                        room.roomID,
                        room.roomPrice,
                        room.totalAvailableRooms,
                        room.roomName
                      )
                    }>
                    <Text
                      style={[
                        styles.roomBtnText,
                        {marginRight: 10, marginLeft: 10},
                      ]}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.roomBtn}
                  onPress={() =>
                    handleAddRoom(
                      room.roomID,
                      room.roomPrice,
                      room.totalAvailableRooms,
                      room.roomName
                    )
                  }>
                  <Text style={styles.roomBtnText}>+ Add</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={() => submitRooms()}>
        {/* <Text style={styles.btnText}>Total Rooms : {totalBill}</Text> */}
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mainLightGrey,
    padding: 20,
  },
  pageHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
    width: '100%',
    // height: 200,
  },

  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },

  roomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
  },

  roomDetailsText: {
    fontSize: 15,
    color: COLORS.textLightGrey,
    marginTop: 10,
  },

  roomDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  roomBtn: {
    backgroundColor: COLORS.black,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '30%',
    marginRight: 0,
    marginLeft: 'auto',
  },

  roomBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },

  roomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '35%',
    marginRight: 0,
    marginLeft: 'auto',
    backgroundColor: COLORS.black,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  btn: {
    backgroundColor: COLORS.black,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
