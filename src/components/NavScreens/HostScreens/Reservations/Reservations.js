import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../../../constants/themes';
import Header from './Header';
import BottomNavHost from '../../../Navigation/BottomNavHost';
import Sorting from './Sorting/Sorting';
import {useSelector} from 'react-redux';
import ReservationCard from './ReservationCard';

// const reservationTypes=[
//   {
//     title:"Checking out",
//     count:0
//   },
//   {
//     title:"Currently hosting",
//     count:0
//   },
//   {
//     title:"Arriving soon",
//     count:0
//   }
// ]

const Reservations = ({
  setShowReservations,
  reservationList,
  reservationTypes,
  getAllReservations,
  getFilteredArray,
}) => {
  const [reservationType, setReservationType] = useState(
    reservationTypes[0].title,
  );
  const [sorting, setSorting] = useState(false);
  const [reservations, setReservations] = useState([...reservationList]);
  const {actors} = useSelector(state => state.actorReducer);
  const [refreshing, setRefreshing] = useState(false);

  const sortCreatedAt = asc => {
    const tempArr = [...reservations];
    if (asc) {
      tempArr.sort((a, b) => {
        const date1 = new Date(a?.bookingData?.date);
        const date2 = new Date(b?.bookingData?.date);
        return date1.getTime() - date2.getTime();
      });
    } else {
      tempArr.sort((a, b) => {
        const date1 = new Date(a?.bookingData?.date);
        const date2 = new Date(b?.bookingData?.date);
        return date2.getTime() - date1.getTime();
      });
    }
    return tempArr;
  };
  const sortCheckIn = asc => {
    const tempArr = [...reservations];
    if (asc) {
      tempArr.sort((a, b) => {
        const date1 = new Date(a?.bookingData?.date);
        const date2 = new Date(b?.bookingData?.date);
        return date1.getTime() - date2.getTime();
      });
    } else {
      tempArr.sort((a, b) => {
        const date1 = new Date(a?.bookingData?.date);
        const date2 = new Date(b?.bookingData?.date);
        return date2.getTime() - date1.getTime();
      });
    }
    return tempArr;
  };

  return (
    <View style={styles.view}>
      <Header
        setShowReservations={setShowReservations}
        setSorting={setSorting}
      />
      <Text style={styles.title}>Reservations</Text>
      <FlatList
        style={styles.reservationTitleList}
        data={reservationTypes}
        renderItem={item => {
          return (
            <TouchableOpacity
              onPress={() => setReservationType(item.item.title)}
              style={
                item.item.title == reservationType
                  ? styles.selectedReservationType
                  : styles.reservationType
              }>
              <Text
                style={
                  item.item.title == reservationType
                    ? styles.selectedReservationTypeText
                    : styles.reservationTypeText
                }>
                {item.item.title} ({item.item.count})
              </Text>
            </TouchableOpacity>
          );
        }}
        horizontal={true}
      />
      {reservationList.length == 0 ||
      !(
        (reservationType == 'Checked out' && reservationTypes[0].count > 0) ||
        (reservationType == 'Currently hosting' && 
          reservationTypes[1].count > 0) ||
        (reservationType == 'Arriving soon' && reservationTypes[2].count > 0)
      ) ? (
        <View style={styles.reservationsCont}>
          <Text style={styles.simpleText1}>Sorry!</Text>
          <Text style={styles.simpleText}>
            You don’t have any guest checking out today or tomorrow
          </Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          style={styles.reservationCardList}
          data={getFilteredArray(reservationType, reservationList)}
          refreshing={refreshing}
          onRefresh={getAllReservations}
          renderItem={item => {
            if (item.item?.status == reservationType) {
              return <ReservationCard item={item.item} />;
            }
          }}
          keyExtractor={(item, index) => index}
        />
      )}

      <BottomNavHost />
      <Modal animationType="slide" visible={sorting}>
        <Sorting
          setSorting={setSorting}
          setReservations={setReservations}
          sortCheckIn={sortCheckIn}
          sortCreatedAt={sortCreatedAt}
        />
      </Modal>
    </View>
  );
};

export default Reservations;

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    backgroundColor: COLORS.newBG,
  },
  title: {
    width: '55%',
    color: COLORS.black,
    fontSize: SIZES.xxLarge,
    fontWeight: '500',
    marginBottom: 16,
    marginLeft: '5%',
    marginTop: 25,
  },
  reservationTitleList: {
    height: 52,
    marginLeft: '4%',
  },
  reservationType: {
    display: 'row',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    borderRadius: 30,
  },
  reservationTypeText: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: '600',
  },
  selectedReservationType: {
    display: 'row',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    borderRadius: 30,
    backgroundColor: COLORS.black,
  },
  selectedReservationTypeText: {
    fontSize: SIZES.small,
    color: 'white',
    fontWeight: '400',
  },
  reservationsCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mainGrey,
    borderStyle: 'dashed',
    width: '90%',
    marginLeft: '5%',
    borderRadius: 20,
    minHeight: 220,
    height: '55%',
    // paddingTop: 50,
    position: 'absolute',
    top: '30%',
  },
  simpleText1: {
    fontSize: SIZES.medxLarge,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '400',
  },
  simpleText: {
    fontSize: SIZES.preMedium,
    color: COLORS.black,
    textAlign: 'center',
    maxWidth: '70%',
    marginBottom: 10,
    fontWeight: '400',
  },
  reservationCardList: {
    paddingTop: 20,
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
  },
});
