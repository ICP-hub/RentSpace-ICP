import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {COLORS} from '../../../../constants/themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/Fontisto';
import UpdateModal from './UpdateModal';
import PropertyPopup from './Popups/PropertyPopup';
import AmenitiesPopup from './Popups/AmenitiesPopup';

import Icon11 from 'react-native-vector-icons/MaterialIcons'; //0
import Icon12 from 'react-native-vector-icons/MaterialCommunityIcons'; //1

const Update = ({item, setOpenUpdate, getHotelDetails}) => {
  function nameToIcon(name) {
    const lowerCase = name.charAt(0).toLowerCase() + name.slice(1);
    return lowerCase;
  }

  const exitModal = value => {
    setSecondPage(value);
    setOpenUpdate(false);
  };

  const [secondPage, setSecondPage] = useState(false);

  const [propertyType, setPropertyType] = useState({
    status: false,
    icon: nameToIcon(item.propertyType),
    name: item.propertyType,
  });

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

  const [amenities, setAmenities] = useState({
    status: false,
    data: item.amenities.map(amenity => {
      return amenitiesList.find(item => item.name === amenity);
    }),
  });

  const [guest, setGuest] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const [spaceOptions, setSpaceOptions] = useState({
    peaceful: true,
    unique: false,
    stylish: true,
    familyFriendly: false,
    spacious: false,
    central: false,
  });

  const handleSpaceOptions = option => {
    if (option === 'peaceful') {
      setSpaceOptions({...spaceOptions, peaceful: !spaceOptions.peaceful});
    } else if (option === 'unique') {
      setSpaceOptions({...spaceOptions, unique: !spaceOptions.unique});
    } else if (option === 'stylish') {
      setSpaceOptions({...spaceOptions, stylish: !spaceOptions.stylish});
    } else if (option === 'familyFriendly') {
      setSpaceOptions({
        ...spaceOptions,
        familyFriendly: !spaceOptions.familyFriendly,
      });
    } else if (option === 'spacious') {
      setSpaceOptions({...spaceOptions, spacious: !spaceOptions.spacious});
    } else if (option === 'central') {
      setSpaceOptions({...spaceOptions, central: !spaceOptions.central});
    }
  };

  const increment = name => {
    if (name === 'guest') {
      setGuest(guest + 1);
    } else if (name === 'bedrooms') {
      setBedrooms(bedrooms + 1);
    } else if (name === 'beds') {
      setBeds(beds + 1);
    } else if (name === 'bathrooms') {
      setBathrooms(bathrooms + 1);
    }
  };

  const decrement = name => {
    if (name === 'guest') {
      if (guest === 1) {
        return;
      } else {
        setGuest(guest - 1);
      }
    } else if (name === 'bedrooms') {
      if (bedrooms === 1) {
        return;
      } else {
        setBedrooms(bedrooms - 1);
      }
    } else if (name === 'beds') {
      if (beds === 1) {
        return;
      } else {
        setBeds(beds - 1);
      }
    } else if (name === 'bathrooms') {
      if (bathrooms === 1) {
        return;
      } else {
        setBathrooms(bathrooms - 1);
      }
    }
  };

  const [passData, setPassData] = useState({
    hotelId: item.hotelId,
    location: '',
    title: '',
    propertyName: '',
    propertyAmenities: [],
  });

  const goToNextPage = () => {
    const newPropertyAmenities = amenities.data.map(amenity => amenity.name);

    setPassData({
      ...passData,
      propertyName: propertyType.name,
      propertyAmenities: [
        ...passData.propertyAmenities,
        ...newPropertyAmenities,
      ],
    });

    setSecondPage(true);
    
  
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Update Page</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon name="collage" size={25} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon2 name="plus" size={25} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{width: Dimensions.get('window').width}}>
        {/* first-section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          <TouchableOpacity
            onPress={() => setPropertyType({...propertyType, status: true})}>
            <Icon name="pencil" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.sectionItem}>
            {propertyType.class === 1 ? (
              <Icon4 name={propertyType.icon} size={30} color={COLORS.black} />
            ) : (
              <Icon3 name={propertyType.icon} size={30} color={COLORS.black} />
            )}

            <Text style={styles.sectionItemText}>{propertyType.name}</Text>
          </View>
        </View>
        {/* second-section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <TouchableOpacity
            onPress={() => setAmenities({...amenities, status: true})}>
            <Icon name="pencil" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContent}>
          {amenities.data.map((item, index) => {
            // const IconComponent = item.class === 0 ? Icon11 : Icon12;
            const IconComponent = ['tv', 'wifi', 'dining', 'medication'].includes(item.name) ? Icon11 : Icon12;
            const word = item.name;
            const firstLetter = word.charAt(0);
            const firstLetterCap = firstLetter.toUpperCase();
            const remainingLetters = word.slice(1);
            const capitalizedName = firstLetterCap + remainingLetters;
            return (
              <View style={styles.sectionItem} key={index}>
                <IconComponent
                  name={item.icon}
                  size={30}
                  color={COLORS.black}
                />
                <Text style={styles.sectionItemText}>{capitalizedName}</Text>
              </View>
            );
          })}
        </View>
        {/* third-section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Location</Text>
        </View>
        <View style={styles.sectionContent}>
          <TextInput
            style={styles.textInput}
            placeholder={item?.location}
            placeholderTextColor={COLORS.textLightGrey}
            onChangeText={text => {
              setPassData({...passData, location: text});
            }}
          />
        </View>
        {/* fourth-section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic details of your space</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.spaceOptionsContainer}>
            <View style={styles.spaceOptions}>
              <Text style={styles.spaceOptionsText}>Guest</Text>
              <View style={styles.spaceOptionsBtns}>
                <TouchableOpacity onPress={() => decrement('guest')}>
                  <Icon2 name="minuscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.spaceOptionsText}>{guest}</Text>
                <TouchableOpacity onPress={() => increment('guest')}>
                  <Icon2 name="pluscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.spaceOptions}>
              <Text style={styles.spaceOptionsText}>Bedrooms</Text>
              <View style={styles.spaceOptionsBtns}>
                <TouchableOpacity onPress={() => decrement('bedrooms')}>
                  <Icon2 name="minuscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.spaceOptionsText}>{bedrooms}</Text>
                <TouchableOpacity onPress={() => increment('bedrooms')}>
                  <Icon2 name="pluscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.spaceOptions}>
              <Text style={styles.spaceOptionsText}>Beds</Text>
              <View style={styles.spaceOptionsBtns}>
                <TouchableOpacity onPress={() => decrement('beds')}>
                  <Icon2 name="minuscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.spaceOptionsText}>{beds}</Text>
                <TouchableOpacity onPress={() => increment('beds')}>
                  <Icon2 name="pluscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.spaceOptions}>
              <Text style={styles.spaceOptionsText}>Bathrooms</Text>
              <View style={styles.spaceOptionsBtns}>
                <TouchableOpacity onPress={() => decrement('bathrooms')}>
                  <Icon2 name="minuscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.spaceOptionsText}>{bathrooms}</Text>
                <TouchableOpacity onPress={() => increment('bathrooms')}>
                  <Icon2 name="pluscircleo" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* fifth-section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Title of your place</Text>
        </View>
        <View style={styles.sectionContent}>
          <TextInput
            style={styles.textInput}
            placeholder={item?.hotelName}
            placeholderTextColor={COLORS.textLightGrey}
            onChangeText={text => setPassData({...passData, title: text})}
          />
        </View>
        {/* sixth-section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>It Describes your place </Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={() => handleSpaceOptions('peaceful')}>
              <Text
                style={[
                  styles.optionsContainerItem,
                  spaceOptions.peaceful
                    ? styles.optionsContainerItemActive
                    : null,
                ]}>
                Peaceful
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSpaceOptions('unique')}>
              <Text
                style={[
                  styles.optionsContainerItem,
                  spaceOptions.unique
                    ? styles.optionsContainerItemActive
                    : null,
                ]}>
                Unique
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSpaceOptions('stylish')}>
              <Text
                style={[
                  styles.optionsContainerItem,
                  spaceOptions.stylish
                    ? styles.optionsContainerItemActive
                    : null,
                ]}>
                Stylish
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSpaceOptions('familyFriendly')}>
              <Text
                style={[
                  styles.optionsContainerItem,
                  spaceOptions.familyFriendly
                    ? styles.optionsContainerItemActive
                    : null,
                ]}>
                Family-Friendly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSpaceOptions('spacious')}>
              <Text
                style={[
                  styles.optionsContainerItem,
                  spaceOptions.spacious
                    ? styles.optionsContainerItemActive
                    : null,
                ]}>
                Spacious
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSpaceOptions('central')}>
              <Text
                style={[
                  styles.optionsContainerItem,
                  spaceOptions.central
                    ? styles.optionsContainerItemActive
                    : null,
                ]}>
                Central
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* seventh-section */}
        <View style={styles.buttonSection}>
          <TouchableOpacity onPress={goToNextPage}>
            <Text style={styles.buttonSectionBtn}>Save And Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 2nd page modal */}

      <Modal visible={secondPage} onRequestClose={() => setSecondPage(false)}>
        <UpdateModal item={item} passData={passData} exitModal={exitModal} getHotelDetails={getHotelDetails}/>
      </Modal>

      {/* property popup modal */}

      <Modal
        visible={propertyType.status}
        onRequestClose={() => setPropertyType({...propertyType, status: false})}
        transparent>
        <PropertyPopup
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
      </Modal>

      {/* amenities popup modal */}

      <Modal
        visible={amenities.status}
        onRequestClose={() => setAmenities({...amenities, status: false})}
        transparent>
        <AmenitiesPopup amenities={amenities} setAmenities={setAmenities} />
      </Modal>
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  popupModal: {
    backgroundColor: 'transparent',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.mainGrey,
    paddingTop: 10,
    width: '100%',
    height: '100%',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  headerTitle: {
    fontSize: 25,
    color: COLORS.black,
    fontWeight: '500',
  },

  headerIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  sectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: 18,
  },

  sectionContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginTop: 5,
    paddingHorizontal: 15,
  },

  sectionItem: {
    width: 85,
    height: 70,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderColor: COLORS.mainPurple,
    borderWidth: 2,
    color: COLORS.black,
  },

  sectionItemText: {
    fontWeight: '400',
    fontSize: 12,
    color: COLORS.textLightGrey,
    textAlign: 'center',
  },

  textInput: {
    width: '100%',
    height: 50,
    color: COLORS.black,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
  },

  spaceOptionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    width: '100%',
    minHeight: 200,
    height: 'fit-content',
    borderRadius: 10,
  },

  spaceOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 60,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    overflow: 'hidden',
  },

  spaceOptionsText: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: '400',
  },

  spaceOptionsBtns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    width: '100%',
    height: 'fit-content',
    borderRadius: 10,
    padding: 10,
  },

  optionsContainerItem: {
    color: COLORS.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    fontWeight: '500',
    width: 'fit-content',
    height: 40,
  },

  optionsContainerItemActive: {
    backgroundColor: COLORS.mainPurple,
    color: COLORS.white,
    borderColor: COLORS.mainPurple,
  },

  buttonSection: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  buttonSectionBtn: {
    backgroundColor: COLORS.mainPurple,
    color: COLORS.white,
    borderRadius: 10,
    width: 135,
    height: 50,
    fontWeight: '500',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginVertical: 10,
    textAlign: 'center',
    marginRight: 10,
  },
});
