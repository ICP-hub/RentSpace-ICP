import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../../../constants/themes';
import Icon from 'react-native-vector-icons/MaterialIcons'; //0
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; //1

const AmenitiesPopup = ({amenities, setAmenities}) => {
  const {data} = amenities;
  // console.log(data)

  const amenitiesList = [
    {name: 'tv', icon: 'tv'},
    {name: 'wifi', icon: 'wifi'},
    {name: 'ac', icon: 'air-conditioner'},
    {name: 'gym', icon: 'dumbbell'},
    {name: 'dining', icon: 'dining'},
    {name: 'laundry', icon: 'washing-machine'},
    {name: 'parking', icon: 'car'},
    {name: 'medication', icon: 'medication'},
    {name: 'gaming', icon: 'gamepad-variant'},
  ];

  const updateAmenities = amenity => {
    // check if amenity is already in the list then remove it
    const isExist = data.some(item => item.name === amenity.name);
    if (isExist) {
      const updatedAmenities = data.filter(item => item.name !== amenity.name);
      setAmenities({data: updatedAmenities});
    } else {
      setAmenities({data: [...data, amenity]});
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.popupTitle}>Select Amenities</Text>

      <View style={styles.popupItemContainer}>
        {amenitiesList.map((item, index) => {
          const isSelected = data.some(dataItem => dataItem.name === item.name);
          // const IconComponent = item.class === 0 ? Icon : Icon2;
          const IconComponent = ['tv', 'wifi', 'dining', 'medication'].includes(item.name) ? Icon : Icon2;
          const word = item.name;
          const firstLetter = word.charAt(0);
          const firstLetterCap = firstLetter.toUpperCase();
          const remainingLetters = word.slice(1);
          const capitalizedName = firstLetterCap + remainingLetters;
          return (
            <TouchableOpacity
              style={styles.popupItem}
              key={index}
              onPress={() => updateAmenities(item)}>
              <IconComponent
                name={item.icon}
                style={
                  isSelected ? styles.popupItemIconActive : styles.popupItemIcon
                }
              />
              <Text
                style={
                  isSelected ? styles.popupItemTextActive : styles.popupItemText
                }>
                {capitalizedName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity>
        <Text
          style={styles.saveBtn}
          onPress={() => setAmenities({...amenities, status: false})}>
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AmenitiesPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    maxHeight: '55%',
    borderRadius: 10,
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: '3%',
    color: COLORS.black,
  },

  popupItemContainer: {
    width: '80%',
    height: 'fit-content',
    marginVertical: '7%',
    marginHorizontal: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },

  popupItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 75,
    // height: 85,
    height: 70,
    // marginBottom: 10,
    // backgroundColor: COLORS.black,
  },

  popupItemIcon: {
    color: COLORS.newGray,
    fontSize: 30,
    alignItems: 'baseline',
    justifyContent: 'center',
  },

  popupItemText: {
    color: COLORS.newGray,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },
  popupItemIconActive: {
    color: COLORS.black, // Change color to indicate active
    fontSize: 30,
  },

  popupItemTextActive: {
    color: COLORS.black, // Change color to indicate active
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },

  saveBtn: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    backgroundColor: COLORS.black,
    padding: 10,
    width: 100,
    textAlign: 'center',
    borderRadius: 10,
  },
});
