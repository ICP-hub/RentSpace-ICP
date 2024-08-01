import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../../../constants/themes';
import {useState} from 'react';

const Faq = ({setFAQPage}) => {
  const [dropDown, setDropDown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      heading: 'How do I search for hotels on the app?',
      text: 'To search for hotels, simply enter your destination, check-in and check-out dates, and the number of guests. You can further refine your search by specifying preferences such as price range, amenities, and accommodation type.',
    },
    {
      id: 2,
      heading: 'Can I book a hotel for the same day?',
      text: 'Yes, you can book a hotel for the same day through our app, subject to availability. Simply select your desired check-in date and browse the available options.',
    },
    {
      id: 3,
      heading: 'What payment methods are accepted for hotel bookings?',
      text: 'We accept various payment methods including Crypto , credit/debit cards, PayPal, and in some cases, cash upon arrival. The available payment methods may vary depending on the hotel and location.',
    },
    {
      id: 4,
      heading: 'Are taxes and fees included in the displayed price?',
      text: 'Taxes and fees may vary depending on the hotel and location. The total price displayed during the booking process will include all applicable taxes and fees unless otherwise stated.',
    },
    {
      id: 5,
      heading: 'Is breakfast included in the hotel booking?',
      text: 'Whether breakfast is included or not depends on the hotel and the type of rate you book. You can check the inclusions and amenities listed for each hotel on our app.',
    },
    {
      id: 6,
      heading: 'Is there a customer support service available?',
      text: 'Yes, we provide 24/7 customer support to assist you with any issues or inquiries before, during, or after your stay. You can contact us via phone, email, or live chat through the app.',
    },
  ];

  return (
    <View style={{backgroundColor: COLORS.mainGrey}}>
      <TouchableOpacity
        style={styles.exiticon}
        onPress={() => setFAQPage(false)}>
        <Icon2
          color={COLORS.black}
          name="chevron-left"
          size={25}
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.mainHeading}>FAQs</Text>
        <View style={styles.hr}></View>

        {faqData.map((data, index) => (
          <>
            <TouchableOpacity
              style={
                activeIndex === index ? styles.faqCardActive : styles.faqCard
              }
              onPress={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }>
              <Text style={styles.subHeading}>{data.heading}</Text>
              <Icon
                name={
                  activeIndex === index
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                size={25}
                color={COLORS.mainPurple}
              />
            </TouchableOpacity>
            {activeIndex === index && (
              <View style={styles.dropBox}>
                <Text style={styles.subText}>{data.text}</Text>
              </View>
            )}
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default Faq;

const styles = StyleSheet.create({
  exiticon: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  mainHeading: {
    fontSize: 25,
    fontWeight: '400',
    color: 'black',
    marginTop: 20,
    marginBottom: 10,
  },

  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 10,
  },

  faqCard: {
    width: '98%',
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },

  faqCardActive: {
    width: '98%',
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  subHeading: {
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
    // marginTop: 10,
    // marginBottom: 10,
    width: '93%',
    height: '100%',
    left: -10,
    paddingLeft: 10,
    // borderWidth: 2,
    borderRadius: -5,
    // borderLeftColor: COLORS.mainPurple,
    borderRightColor: COLORS.white,
    borderTopColor: COLORS.white,
    borderBottomColor: COLORS.white,
  },

  dropBox: {
    backgroundColor: COLORS.mainPurple,
    width: '98%',
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
  },

  subText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'justify',
  },
});
