import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from '../../constants/themes';
import {images} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const BottomNav = ({navigation}) => {

  const message = 'You need to login first, go to profile page!';

  const {principle} = useSelector(state => state.principleReducer);

  const [bottom, setBottom] = useState(0);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setBottom(-100);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setBottom(0);
    });
  });

  if (principle == '') {
    return (
      <View style={[styles.viewNav, {bottom: 0}]}>
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            // alert(message);
            Dialog.show({
              type:ALERT_TYPE.WARNING,
              title:'WARNING',
              textBody:message,
              button:'OK',
            })
          }}>
          <Icon name="filter" size={25} color={COLORS.mainPurple} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconNav} onPress={()=>{alert(message)}}>
                    <Icon name="search1" size={25} color={COLORS.mainPurple}/>
                </TouchableOpacity > */}
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            navigation.navigate('reels');
          }}>
          <Icon name="hearto" size={25} color={COLORS.mainPurple} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            // alert(message);
            Dialog.show({
              type:ALERT_TYPE.WARNING,
              title:'WARNING',
              textBody:message,
              button:'OK',
            })
          }}>
          <Icon2 name="comment" size={20} color={COLORS.mainPurple} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            navigation.navigate('Launch');
          }}>
          <Icon name="user" size={25} color={COLORS.mainPurple} />
        </TouchableOpacity>
      </View> 
    );
  } else {
    return (
      <View style={[styles.viewNav, {bottom: bottom}]}>
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            navigation.navigate('Launch');
          }}>
          <Icon name="filter" size={25} color={COLORS.mainPurple} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconNav} onPress={()=>{navigation.navigate('mapSearch')}}>
                    <Icon name="search1" size={25} color={COLORS.mainPurple}/>
                </TouchableOpacity > */}
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            navigation.navigate('reels');
          }}>
          <Icon name="hearto" size={25} color={COLORS.mainPurple} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            navigation.navigate('UserChat');
          }}>
          <Icon2 name="comment" size={20} color={COLORS.mainPurple} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconNav}
          onPress={() => {
            navigation.navigate('profile');
          }}>
          <Icon name="user" size={25} color={COLORS.mainPurple} />
        </TouchableOpacity>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  profileCont: {
    display: 'flex',
    flexDirection: 'column',
    width: 25,
    height: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  iconNav: {
    display: 'inline',
    width: 25,
    height: 25,
  },
  viewNav: {
    backgroundColor: COLORS.white,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    position: 'absolute',
    paddingVertical: 20,
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 15,
    shadowColor: COLORS.black,
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
  },
});

export default BottomNav;
