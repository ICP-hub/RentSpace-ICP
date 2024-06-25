import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, COLORS} from '../../../../../../constants/themes';
import {images} from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import HotelDetailPage from '../HotelDetailPage';

const HotelCard = ({item, navigation}) => {
  console.log(item.propertyName);

  const [open, setOpen] = useState(false);

  const defaultImg = 'https://firebasestorage.googleapis.com/v0/b/rentspace-e58b7.appspot.com/o/hotelImage%2F1715757730736?alt=media&token=76fd4072-38ae-437c-b3fe-4b1f857ec4d8';

  return (
    <View style={styles.cardCont}>
      <TouchableOpacity
        style={styles.detailLink}
        onPress={() => {
          setOpen(true);
        }}>
        <Icon2 name="page-next" size={30} color={COLORS.black}/>
      </TouchableOpacity>

      <Image
        source={{uri: item.imageList[0] ? item.imageList[0] : defaultImg}}
        style={styles.img}
      />
      <View style={styles.dataCont}>
        <Text style={styles.title}>{item.propertyName}</Text>
        <Text style={styles.simpleText}>{item.propertyDescription}</Text>
        <View style={styles.ratingCont}>
          <Icon name="star" size={15} color={COLORS.black} />
          <Icon name="star" size={15} color={COLORS.black} />
          <Icon name="star" size={15} color={COLORS.black} />
          <Icon name="star" size={15} color={COLORS.black} />
        </View>
      </View>

      <Modal animationType="slide" visible={open} onRequestClose={()=>setOpen(false)}>
        <HotelDetailPage
          item={item}
          setOpen={setOpen}
          navigation={navigation}
        />
      </Modal>
    </View>

// --------------------------

    // <TouchableOpacity style={styles.cardCont} onPress={() => setOpen(true)}>
    //   <Image
    //     source={{uri: item.imageList[0] ? item.imageList[0] : defaultImg}}
    //     style={styles.img}
    //   />
    //   <View style={styles.dataCont}>
    //     <View style={styles.infoCont}>
    //       <Text style={styles.title}>{item.propertyName}</Text>
    //       <View style={styles.locationCont}>
    //         <Icon name="location-pin" size={20} color="black" />
    //         <Text style={styles.address}>{item.location}</Text>
    //       </View>
    //     </View>
    //     <View style={styles.priceCont}>
    //       <Text style={styles.origianlPrice}>${Number(item.price) + 15}</Text>
    //       <Text style={styles.Price}>${item.price}</Text>
    //     </View>
    //   </View>
    //   <Modal
    //     animationType="slide"
    //     visible={open}
    //     onRequestClose={() => setOpen(false)}>
    //     <HotelDetailPage
    //       item={item}
    //       setOpen={setOpen}
    //       navigation={navigation}
    //     />
    //   </Modal>
    // </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  cardCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    marginLeft: 10,
    borderRadius: 20,
    marginVertical: 10,
    elevation: 5,
  },
  img: {
    width: 110,
    height: 110,
    borderRadius: 15,
    marginRight: 10,
  },
  dataCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '50%',
    height: 100,
  },
  title: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  simpleText: {
    opacity: 0.6,
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  ratingCont: {
    display: 'flex',
    flexDirection: 'row',
  },
  detailLink: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  // ----------------

  // cardCont: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '95%',
  //   backgroundColor: COLORS.white,
  //   marginLeft: 10,
  //   borderRadius: 5,
  //   marginVertical: 10,
  //   elevation: 5,
  // },

  // img: {
  //   width: '100%',
  //   height: 150,
  //   borderTopLeftRadius: 5,
  //   borderTopRightRadius: 5,
  // },

  // dataCont: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: '100%',
  //   minHeight: 80,
  //   height: 'auto',
  //   paddingHorizontal: 15,
  //   paddingVertical: 10,
  // },

  // infoCont: {
  //   flex: 2,
  //   flexDirection: 'column',
  //   height: '100%',
  //   gap: 15,
  // },

  // title: {
  //   fontSize: SIZES.medium,
  //   color: COLORS.black,
  //   fontWeight: 'bold',
  // },

  // locationCont: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   gap: 5,
  //   alignItems: 'baseline',
  // },

  // address: {
  //   fontSize: SIZES.medium - 2,
  //   color: COLORS.black,
  //   fontWeight: '400',
  // },

  // priceCont: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'flex-end',
  //   height: '100%',
  // },

  // origianlPrice: {
  //   fontSize: SIZES.medium - 2,
  //   color: COLORS.black,
  //   textDecorationLine: 'line-through',
  // },

  // Price: {
  //   fontSize: SIZES.medium,
  //   color: COLORS.black,
  //   fontWeight: 'bold',
  // },
});
