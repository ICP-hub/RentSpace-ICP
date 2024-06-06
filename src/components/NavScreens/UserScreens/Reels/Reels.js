import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomNav from '../../../Navigation/BottomNav';
import HeaderSearch from '../Reusables/Header/HeaderSearch';
import {COLORS, SIZES} from '../../../../constants/themes';
import ReelObject from './ReelObject';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';
import Comments from './Comments/Comments';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {nodeBackend} from '../../../../../DevelopmentConfig';

const Reels = ({navigation}) => {
  const btmSheetComments = useRef(null);
  // const baseURL='https://rentspace.kaifoundry.com'
  // const baseURL="http://localhost:5000"
  const baseURL = nodeBackend;

  const [reels, setReels] = useState([]);
  const [coord1, setCoord1] = useState({latitude: 0, longitude: 0});

  const openComments = () => {
    btmSheetComments.current.present();
  };
  const closeComments = () => {
    btmSheetComments.current.dismiss();
  };

  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        loc => {
          const position = {
            long: loc.coords.longitude,
            lat: loc.coords.latitude,
          };
          resolve(position);
        },
        err => reject(err),
      );
    });
  }

  const fetchReels = async () => {
    var long;
    var lat;
    await getCurrentPosition()
      .then(position => {
        long = position.long;
        lat = position.lat;
        console.log('Long : ', long, ' Lat : ', lat);
        setCoord1({latitude: lat, longitude: long});
      })
      .catch(err => console.log(err));

    // console.log(`${baseURL}/api/v1/property/reelData`)
    // console.log(lat,long);

    // const passData = {userLatitude: lat, userLongitude: long, radius: 5};
    // console.log(passData)

    await axios
      .get(`${baseURL}/api/v1/property/reelData?userLatitude=${30.892048}&userLongitude=${75.916133}&radius=5`, {
        headers: {
          latitude: `${lat}`,
          longitude: `${long}`,
          radius: 5,
        },
      })
      .then(res => {
        console.log(res.data.properties[0].propertyName);
        setReels(res.data.properties)
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchReels();
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{height: '100%', width: '100%'}}>
      <BottomSheetModalProvider>
        <View style={styles.view}>
          {/* <HeaderSearch/> */}
          <ReelObject
            fetchReels={fetchReels}
            openComments={openComments}
            reels={reels}
            coord1={coord1}
          />
          <BottomNav navigation={navigation} />
          <BottomSheetModal
            ref={btmSheetComments}
            index={0}
            snapPoints={['95%']}>
            <Comments />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Reels;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.mainGrey,
  },
  simpleText: {
    color: 'black',
    fontSize: SIZES.medium,
  },
});
