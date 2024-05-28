import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {COLORS, SIZES} from '../../../../../constants/themes';
import Header from '../HotelDetails/BookingForm/Header/Header';
import GuestDetails from './bookingParts/GuestDetails';
import CardDetails from './bookingParts/CardDetails';
import AdditionalGuests from './bookingParts/AdditionalGuests';
import { useSelector } from 'react-redux';
import axios from 'axios';

const RateHawkBookingPage = ({showSelf, hotelName, hotelAddress}) => {

  const {user} = useSelector(state => state.userReducer);


  const customHotelData = {
    hotelname: hotelName,
    hotelAddress: hotelAddress,
  };

  const [IP, setIP] = useState('');

  const [finalData, setFinalData] = useState({
    first_name: user.firstName || '',
    last_name: user.lastName || '',
    email: user.userEmail || '',
    phone: user.userPhone || '',
    card_holder: '',
    card_number: '',
    cvc: '',
    month: '',
    year: '',
    guests:[]
  });
 
  async function getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  }
  getIPAddress().then(ip => setIP(ip));

  // ------------------- Integration Testing -------------------

  // testing function for orderBookingForm
  async function testorderBookingForm() {
    postData = {
      book_hash: 'h-44586dda-b272-5973-a2a4-54b7d52429c3', // change everytime
      language: 'en',
      user_ip: IP,
    };

    console.log('POST DATA : ', postData);

    await axios
      .post(
        'http://localhost:5000/api/v1/hotel/RateHawk/orderBookingForm',
        postData,
      )
      .then(response => {
        console.log('Item_ID : ', response.data.data.item_id);
        console.log('Partner_ID : ', response.data.data.partner_order_id);
        console.log('Payment_Types : ', response.data.data.payment_type);
        const item_id = response.data.data.item_id;
        const partner_order_id = response.data.data.partner_order_id;
        const payment_types = response.data.data.payment_type;
        testCreditCardTokenization(item_id, partner_order_id, payment_types);
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  // testing function for Credit Card Tokenization
  async function testCreditCardTokenization(
    item_id,
    partner_order_id,
    payment_types,
  ) {
    const postData = {
      object_id: String(item_id),
      user_first_name: finalData.first_name,
      user_last_name: finalData.last_name,
      card_holder: finalData.card_holder,
      card_number: finalData.card_number,
      cvc: finalData.cvc,
      is_cvc_required: true,
      month: finalData.month,
      year: finalData.year,
    };

    await axios
      .post(
        'http://localhost:5000/api/v1/hotel/RateHawk/crediCardTokenization',
        postData,
      )
      .then(response => {
        const pay_uuid = response.data.pay_uuid;
        const init_uuid = response.data.init_uuid;
        console.log("PAY_UUID : ",pay_uuid);
        console.log("INIT_UUID : ",init_uuid);
        testOrderBookingFinish(
          partner_order_id,
          payment_types,
          pay_uuid,
          init_uuid,
        );
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  // testing function for orderBookingFinish

  async function testOrderBookingFinish(
    partner_order_id,
    payment_types,
    pay_uuid,
    init_uuid,
  ) {
    const postData = {
      email: finalData.email,
      phone: finalData.phone,
      partner_order_id: String(partner_order_id),
      language: 'en',
      guests: finalData.guests,
      payment_type: {
        type: payment_types[0].type,
        amount: payment_types[0].amount,
        currency_code: payment_types[0].currency_code,
        pay_uuid: pay_uuid,
        init_uuid: init_uuid,
      },
      return_path: 'google.com', // change it to the actual return path after payment
    };

    console.log("postData : ", postData);

    await axios
      .post(
        'http://localhost:5000/api/v1/hotel/RateHawk/orderBookFinish',
        postData,
      )
      .then(response => {
        console.log(response.data);
        testOrderBookingFinishStatus(partner_order_id);
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  // testing function for orderBookingFinishStatus

  async function testOrderBookingFinishStatus(partner_order_id) {
    console.log(partner_order_id);
    const postData = {
      partner_order_id: partner_order_id,
    };

    await axios
      .post(
        'http://localhost:5000/api/v1/hotel/RateHawk/orderBookFinishStatus',
        postData,
      )
      .then(response => {
        console.log('Final CLG');
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  return (
    <View style={styles.page}>
      <View style={styles.backIconCont}>
        <TouchableOpacity
          onPress={() => {
            showSelf(false);
          }}>
          <Icon color={COLORS.black} name="chevron-left" size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollPart}>
        <Header
          hotelname={customHotelData.hotelname}
          hotelAddress={customHotelData.hotelAddress}
        />
        <View style={styles.line} />
        <View style={styles.sec}>
          <Text style={styles.priceTitle}>PriceDetails</Text>
          <View style={styles.textCont}>
            <Text style={styles.priceHeading}>Total(USD)</Text>
            <Text style={styles.priceHeading}>${30}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <GuestDetails finalData={finalData} setFinalData={setFinalData} />
        <View style={styles.line} />
        <AdditionalGuests finalData={finalData} setFinalData={setFinalData} />
        <View style={styles.line} />
        <CardDetails finalData={finalData} setFinalData={setFinalData} />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            console.log("testorderBookingForm called");
            testorderBookingForm();
          }}
          >
          <Text style={styles.btnText}>Confirm and Pay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RateHawkBookingPage;

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.mainGrey,
    height: Dimensions.get('window').height,
  },
  backIconCont: {
    position: 'absolute',
    width: '100%',
    backgroundColor: COLORS.mainGrey,
    zIndex: 10,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  line: {
    width: '100%',
    backgroundColor: COLORS.black,
    height: 0.5,
    opacity: 0.23,
    marginVertical: 15,
  },
  btn: {
    width: '82%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.mainPurple,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  scrollView: {
    width: '100%',
    backgroundColor: COLORS.mainGrey,
  },
  scrollPart: {
    width: '100%',
    paddingVertical: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  sec: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '85%',
  },
  priceTitle: {
    color: COLORS.black,
    fontWeight: '800',
    fontSize: SIZES.preMedium,
    marginBottom: 15,
  },
  priceHeading: {
    color: COLORS.black,
    fontWeight: '800',
    fontSize: SIZES.preMedium,
  },
  textCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
