import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../../constants/themes';
import Icon from 'react-native-vector-icons/MaterialIcons'; //0
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; //1
import Icon3 from 'react-native-vector-icons/Foundation'; //2

const AmenitiesPopup = ({amenities, setAmenities}) => {

  const {data} = amenities;
  // console.log(data)

  const amenitiesList = [
    {name: 'Pool', icon: 'pool', class: 0},
    {name: 'Outdoor shower', icon: 'shower', class: 0},
    {name: 'Hot tub', icon: 'hot-tub', class: 0},
    {name: 'Kitchen', icon: 'kitchen', class: 0},
    {name: 'TV', icon: 'tv', class: 0},
    {name: 'Outdoor dining area', icon: 'dining', class: 0},
    {name: 'Lake access', icon: 'houseboat', class: 0},
    {name: 'Workspace', icon: 'computer', class: 0},
    {name: 'Wifi', icon: 'wifi', class: 0},
    {name: 'Beach access', icon: 'beach-access', class: 0},
    {name: 'Skii in/out', icon: 'downhill-skiing', class: 0},
    {name: 'Smoke Alarm', icon: 'smoke-detector-variant', class: 1},
    {name: 'Patios', icon: 'balcony', class: 1},
    {name: 'Washing Machine', icon: 'washing-machine', class: 1},
    {name: 'BBQ grill', icon: 'grill', class: 1},
    {name: 'Parking', icon: 'car', class: 1},
    {name: 'Fire extinguisher', icon: 'fire-extinguisher', class: 1},
    {name: 'indoor fireplace', icon: 'fireplace', class: 1},
    {name: 'AC', icon: 'air-conditioner', class: 1},
    {name: 'Gym', icon: 'dumbbell', class: 1},
    {name: 'Pool table', icon: 'billiards', class: 1},
    {name: 'Piano', icon: 'piano', class: 1},
    {name: 'Safe', icon: 'safe', class: 1},
    {name: 'First Aid Kit', icon: 'first-aid', class: 2},
  ];

  const updateAmenities = (amenity) => {
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
          const IconComponent = item.class === 0 ? Icon : item.class === 1 ? Icon2 : Icon3;
          return (
            <TouchableOpacity style={styles.popupItem} key={index} onPress={()=>updateAmenities(item)}>
              <IconComponent
                name={item.icon}
                style={isSelected ? styles.popupItemIconActive : styles.popupItemIcon} 
              />
              <Text style={isSelected ? styles.popupItemTextActive : styles.popupItemText}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity>
        <Text style={styles.saveBtn} onPress={() => setAmenities({...amenities, status:false})}>Save</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default AmenitiesPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    maxHeight: '92%',
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
    height:70,
    // marginBottom: 10,
    // backgroundColor: COLORS.black,
  },

  popupItemIcon: {
    color: COLORS.textLightGrey,
    fontSize: 30,
    alignItems: 'baseline',
    justifyContent: 'center',

  },

  popupItemText: {
    color: COLORS.textLightGrey,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
    
  },
  popupItemIconActive: {
    color: COLORS.mainPurple, // Change color to indicate active
    fontSize: 30,
    
  },

  popupItemTextActive: {
    color: COLORS.mainPurple, // Change color to indicate active
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5,
  },

  saveBtn:{
    color: COLORS.white, 
    fontSize: 16, 
    fontWeight: '500', 
    marginBottom: 20,
    backgroundColor:COLORS.mainPurple,
    padding: 10,
    width: 100,
    textAlign: 'center',
    borderRadius: 10,
  }
});
