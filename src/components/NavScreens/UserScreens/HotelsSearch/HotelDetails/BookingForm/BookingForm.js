import { StyleSheet, Text, View,TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { Calendar } from 'react-native-calendars'

const BookingForm = ({setOpen,setShowBookHotel}) => {
  const {user}=useSelector(state=>state.userReducer)
  const [selected, setSelected] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [booking,setBooking]=useState({
    userId:user?.userId,
    date:"Check-in date",
    bookingDuration:'',
    cancelStatus:false,
    refundStatus:false,
    paymentStatus:false,
    paymentId:""
  })

  const [guests,setGuests]=useState(0)

  const proceedPayment=()=>{
    console.log(booking)
    alert("Your booking is confirmed!")
    setOpen(false)
    setShowBookHotel(false)
  }
  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.backIcon} onPress={()=>setShowReviews(false)}>
        <Icon name="angle-left" size={25} color={COLORS.textLightGrey}/> 
    </TouchableOpacity>
      <Text style={styles.title}>Book your room</Text>
      <View style={styles.inputCont}>
      <TextInput 
        style={styles.inputs}
        value={guests}
        placeholder="Number of Guests"
        placeholderTextColor={COLORS.textLightGrey}
        onChangeText={value=>setGuests(value)}/>
      <TouchableOpacity style={styles.inputs} onPress={()=>setShowCalendar(true)}>
          <Text style={styles.dateText}>{booking?.date}</Text> 
        </TouchableOpacity>  
        <TextInput 
        style={styles.inputs}
        value={booking?.bookingDuration}
        placeholder="Booking duration(Days)"
        placeholderTextColor={COLORS.textLightGrey}
        onChangeText={value=>setBooking({...booking,bookingDuration:value})}/>
        </View>
        <TouchableOpacity style={styles.btn} onPress={proceedPayment}>
          <Text style={styles.btnText}>Proceed to pay</Text>
        </TouchableOpacity>
        <Modal visible={showCalendar} animationType="slide" transparent>
        <View>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
              setBooking({...booking,date:`${day.day}/${day.month}/${day.year}`});
              setShowCalendar(false);
            }}
            style={styles.calendar}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: COLORS.inputBorder,
              },
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

export default BookingForm

const styles = StyleSheet.create({
  view:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:'100%',
    height:'100%'
  },
  title:{
    color:COLORS.black,
    position:'absolute',
    top:'2%',
    fontWeight:'bold',
    fontSize:SIZES.medium
  },
  backIcon:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    marginVertical:10,
    justifyContent:'flex-start',
    paddingLeft:30,
  },
  inputs:{
    borderColor: COLORS.hostTitle,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginBottom: 40,
    height: 50,
    padding: 15,
    color: COLORS.textLightGrey,
    fontSize: SIZES.preMedium
  },
  dateText:{
    color: COLORS.textLightGrey,
    fontSize: SIZES.preMedium,
    opacity: 0.5,
  },
  calendar: {
    marginHorizontal: 35,
    borderRadius: 10,
    elevation: 2,
    marginTop: '60%',
    borderWidth: 1,
    borderBlockColor: COLORS.inputBorder,
  },
  inputCont:{
    marginTop:60,
    width:'100%',
    flexDirection:'column',
    alignItems:'center',
    display:'flex'
  },
  btn:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:12,
    backgroundColor:COLORS.hostTitle,
    width:'80%',
    paddingVertical:15
  },
  btnText:{
    fontSize:SIZES.medium,
    color:'white',
    fontWeight:'bold'
  }
})