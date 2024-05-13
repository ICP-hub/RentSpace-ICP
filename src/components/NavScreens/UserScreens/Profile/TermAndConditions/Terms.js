import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import Icon2 from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../../../constants/themes';

const Terms = ({setTermsPage}) => {
  const [checkBox, setCheckBox] = useState(false);

  const termsData = [
    {
      id: 1,
      heading: 'User Agreement',
      text: 'By using our App, you agree to abide by these terms and conditions and any future updates. If you do not agree with any part of these terms, you may not use our App.',
      points: [],
    },
    {
      id: 2,
      heading: 'User Eligibility',
      text: 'You must be at least 18 years old to use our App. By using our App, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into this agreement.',
      points: [],
    },
    {
      id: 3,
      heading: 'Privacy Policy',
      text: 'Our Privacy Policy explains how we collect, use, and disclose your personal information. By using our App, you consent to the collection, use, and disclosure of your personal information as described in our Privacy Policy.',
      points: [],
    },
    {
      id: 4,
      heading: 'Intellectual Property',
      text: 'All content and materials available on our App, including but not limited to text, graphics, logos, images, and software, are the property of RentSpace or its licensors and are protected by copyright, trademark, and other intellectual property laws.',
      points: [],
    },
    {
      id: 5,
      heading: 'Prohibited Conduct',
      text: 'You agree not to engage in any of the following prohibited activities:',
      points: [
        'Violating any applicable laws or regulations.',
        'Impersonating any person or entity.',
        'Interfering with or disrupting the operation of our App.',
        'Collecting or harvesting any information from our App.',
      ],
    },
    {
      id: 6,
      heading: 'Termination',
      text: 'We reserve the right to terminate or suspend your access to our App at any time and for any reason without prior notice.',
      points: [],
    },
    {
      id: 7,
      heading: 'Disclaimer of Warranties',
      text: 'Our App is provided on an "as is" and "as available" basis without any warranties of any kind. We do not warrant that our App will be error-free or uninterrupted.',
      points: [],
    },
    {
      id: 8,
      heading: 'Limitation of Liability',
      text: 'In no event shall RentSpace or its affiliates be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our App.',
      points: [],
    },
    {
      id: 9,
      heading: 'Governing Law',
      text: 'These terms and conditions shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles.',
      points: [],
    },
    {
      id: 10,
      heading: 'Changes To Terms',
      text: 'We reserve the right to modify these terms and conditions at any time without prior notice. By continuing to use our App after such modifications, you agree to be bound by the updated terms and conditions.',
      points: [],
    },
    {
      id: 11,
      heading: 'Contact Us',
      text: 'If you have any questions or concerns about our terms & conditions, please contact us at [Contact Email Address]',
      points: [],
    },
  ];

  return (
    <View style={{backgroundColor: COLORS.mainGrey}}>
      <TouchableOpacity
        style={styles.exiticon}
        onPress={() => setTermsPage(false)}>
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
        <View>
          <Text style={styles.mainHeading}>Terms & Conditions</Text>
          <Text style={styles.mainText}>
            Welcome to RentSpace! These terms and conditions govern your use of
            our mobile application, website, and services. By accessing or using
            our App, you agree to comply with these terms and conditions. Please
            read them carefully before using the App.
          </Text>
          <View style={styles.hr}></View>
        </View>

        <View>
          {termsData.map((data, index) => (
            <View key={index}>
              <Text style={styles.subHeading}>{data.heading}</Text>
              <Text style={styles.subText}>{data.text}</Text>

              {data.points.map((item, index) => (
                <View style={styles.listings}>
                  <Icon2 name="dot-single" size={20} />
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.checkBoxContainer}>
          <TouchableOpacity
            style={checkBox ? styles.checkBoxActive : styles.checkBox}
            onPress={() => setCheckBox(!checkBox)}>
            {checkBox ? (
              <Icon2
                name="check"
                size={15}
                style={{color: COLORS.mainPurple}}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.checkBoxText}>
            By using our App, you acknowledge that you have read, understood,
            and agree to be bound by this Privacy Policy.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTermsPage(false)}>
          <Text style={styles.btnText}>I agree</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Terms;

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

  mainText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
    marginLeft: 10,
    textAlign: 'justify',
  },

  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },

  subText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
    textAlign: 'justify',
    marginVertical: 5,
  },

  listings: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 2,
  },

  itemText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
    textAlign: 'justify',
    width: '93.5%',
  },

  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.mainPurple,
    borderRadius: 3,
    top: 5,
  },

  checkBoxActive: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.mainPurple,
    // backgroundColor: COLORS.mainPurple,
    borderRadius: 3,
    top: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginVertical: 10,
  },

  checkBoxText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    textAlign: 'justify',
    width: '92%',
  },

  button: {
    backgroundColor: COLORS.mainPurple,
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
  },

  btnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
