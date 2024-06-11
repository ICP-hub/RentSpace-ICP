import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../../constants/themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';

const PropertyPopup = ({propertyType, setPropertyType, passData, setPassData}) => {

  const propertiesList = [
    {name: 'House', icon: 'house'},
    {name: 'Villa', icon: 'villa'},
    {name: 'Apartment', icon: 'apartment'},
    {name: 'Hotel', icon: 'hotel'},
    {name: 'Resort', icon: 'fort'},
    {name: 'Glamping', icon: 'tent'}
  ];

  const updateProperty = (item) => {
    // setPropertyType({...propertyType,  status:false, name: item.name, icon: item.icon, class: item.class});
    setPropertyType({...propertyType,  status:false, name: item.name, icon: item.icon});
    setPassData({...passData, propertyName: item.name});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.popupTitle}>Select Property Type</Text>
      <View style={styles.popupItemContainer}>
        {propertiesList.map((item, index) => {
          if (['House', 'Villa', 'Apartment', 'Hotel', 'Resort'].includes(item?.name)) {
            return (
              <TouchableOpacity
                onPress={() => updateProperty(item)}
                style={styles.popupItem}>
                <Icon
                  name={item.icon}
                  style={
                    propertyType.name === item.name
                      ? styles.popupItemIconActive
                      : styles.popupItemIcon
                  }
                />
                <Text
                  style={
                    propertyType.name === item.name
                      ? styles.popupItemTextActive
                      : styles.popupItemText
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
          else {
            return (
              <TouchableOpacity
                onPress={() => updateProperty(item)}
                style={styles.popupItem}>
                <Icon2
                  name={item.icon}
                  style={
                    propertyType.name === item.name
                      ? styles.popupItemIconActive
                      : styles.popupItemIcon
                  }
                />
                <Text
                  style={
                    propertyType.name === item.name
                      ? styles.popupItemTextActive
                      : styles.popupItemText
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </View>
  );
};

export default PropertyPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: '35%',
    borderRadius: 10,
    marginTop: '20%',
    marginHorizontal: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: '3%',
    color: COLORS.black,
    margin: 0,
  },

  popupItemContainer: {
    // backgroundColor: 'grey',
    width: '80%',
    height: 'fit-content',
    marginVertical: '7%',
    marginHorizontal: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 20,
  },

  popupItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  popupItemIcon: {
    color: COLORS.textLightGrey,
    fontSize: 50,
  },

  popupItemText: {
    color: COLORS.textLightGrey,
    fontSize: 14,
    fontWeight: '500',
  },
  popupItemIconActive: {
    color: COLORS.mainPurple,
    fontSize: 50,
  },

  popupItemTextActive: {
    color: COLORS.mainPurple,
    fontSize: 14,
    fontWeight: '500',
  },
});
