import {ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import {SIZES, COLORS} from '../../constants/themes';
import {images} from '../../constants';
import {
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';
import {User} from '../../declarations/User/index.js';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../../redux/users/actions';
import DatePicker from 'react-native-date-picker';
import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';

const BottomSheetFinishSignUp = ({openComm,closeModal}) => {



  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('Birthday(dd/mm/yyyy)');
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading,setLoading]=useState(false)
  const [date,setDate]=useState(new Date())

  const {user} =useSelector(state=>state.userReducer)
  const {actors}=useSelector(state=>state.actorReducer)
  const dispatch=useDispatch()

  async function signUp(){
    setLoading(true)
    const userObj={
      firstName:fname,
      lastName:lname,
      dob:DOB,
      userEmail:email,
    }
    console.log(userObj)
    console.log(date)

    let whoami=await actors?.userActor?.whoami().catch((err)=>{console.log(err)})
    console.log("principal signup page : ",whoami)
    console.log(actors?.userActor)
    await actors.userActor?.registerUser(userObj).then(async(res)=>{
      if(res?.ok=="User registered successfully"){

      
      console.log(res)
      setLoading(false)
      // Alert.alert('Registration successful',`Welcome ${fname}! You are successfully registered `)
      Dialog.show({
        type:ALERT_TYPE.SUCCESS,
        title:'Registration successful',
        textBody:`Welcome ${fname}! You are successfully registered `,
        button:'OK',
      })
      
      await actors.userActor?.getuserDetails().then((res)=>{
        console.log(res?.ok),
        dispatch(setUser(res?.ok))
        openComm()
        closeModal()
        console.log(user)
        
      }).catch((err)=>{console.log("get user info catch : ",err)})
    }else{
      console.log(res?.err)
      Dialog.show({
        type:ALERT_TYPE.WARNING,
        // title:res?.err,
        title:'Trying to register failed',
        textBody:res?.err,
        button:'OK',
      })
      await actors.userActor?.getuserDetails().then((res)=>{
        console.log(res?.ok),
        dispatch(setUser(res?.ok))
        openComm()
        closeModal()
        console.log(user)
        
      }).catch((err)=>{console.log("get user info catch : ",err)})
    }
    }).catch((err)=>{
     
      console.log("err create user : ",err)
      setLoading(false)
    })
  }
 

  return (
    <View style={styles.bottomSheet}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if(user?.fname!=null){
              closeModal();
            }else{
              // Alert.alert('Cannot skip','Please Register first to continue further')
              Dialog.show({
                type:ALERT_TYPE.WARNING,
                title:'CANNOT SKIP',
                textBody:'Please Register first to continue further',
                button:'OK',
              })
              
            }
            
          }}>
          <Image source={images.cross} style={styles.crossImg} />
        </TouchableOpacity>

        <Text style={styles.heading}>FINISHING SIGN UP</Text>
      </View>
      <TextInput
        placeholder="First name"
        placeholderTextColor={COLORS.mainPurple}
        style={styles.firstName}
        value={fname}
        onChangeText={value => {
          setFname(value);
        }}
      />
      <TextInput
        placeholder="Last name"
        placeholderTextColor={COLORS.mainPurple}
        style={styles.lastName}
        value={lname}
        onChangeText={value => {
          setLname(value);
        }}
      />
      <Text style={styles.simpleText}>
        Make sure it matches the name on your ID
      </Text>
      <TouchableOpacity
        style={styles.dateDiv}
        onPress={() => {
          setShowCalendar(true);
        }}>
        <Text style={styles.dateDivText}>{DOB}</Text>
        <Image source={images.next} />
      </TouchableOpacity>
      <Text style={styles.simpleText}>
        To sign up, you need to be at level 18. Your birthday won’t be shared
        with other people who use Rent space.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.mainPurple}
        style={styles.simpleInput}
        value={email}
        onChangeText={value => {
          setEmail(value);
        }}
      />
      <Text style={styles.simpleText}>
        We’ll email you trip confirmations and receipts.
      </Text>
      <Text style={styles.simpleText}>
        By selecting Agree and continue, I agree to Rent space's{' '}
        <Text style={styles.linkText}>
          Terms of Service, Payments Terms of Service and Nondiscrimination
          Policy
        </Text>{' '}
        and acknowledge the <Text style={styles.linkText}>Privacy Policy.</Text>
      </Text>
      <ActivityIndicator size={40} animating={loading}/>
      <TouchableOpacity style={styles.submitBtn} onPress={()=>{signUp()}}>
        <Text style={styles.submitText}>Accept and continue</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode='date'
        open={showCalendar}
        date={date}
        onConfirm={(date) => {
          setShowCalendar(false)
          setDate(date)
          setDOB(`${(date.getDate()<10)?"0"+date.getDate():date.getDate()}/${(date.getMonth()+1<10)?"0"+(date.getMonth()+1):date.getMonth()+1}/${date.getFullYear()}`);
        }}
        onCancel={() => {
          setShowCalendar(false)
        }}
        maximumDate={new Date()}
      />


    </View>
  );
};

export default BottomSheetFinishSignUp;

const styles = StyleSheet.create({
  bottomSheet: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  crossImg: {
    width: 17,
    height: 17,
    marginRight: '20%',
  },
  heading: {
    fontSize: SIZES.preMedium,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  simpleText: {
    color: COLORS.black,
    fontSize: SIZES.small,
    width: '80%',
    opacity:0.4,
    marginBottom: 20,
  },
  simpleInput: {
    borderColor: COLORS.mainPurple,
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.black,
    fontSize: SIZES.preMedium,
    // opacity: 0.5,
  },
  dateDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.mainPurple,
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.black,
    fontSize: SIZES.preMedium,
    minWidth: '80%',
  },
  dateDivText: {
    color: COLORS.black,
    fontSize: SIZES.preMedium,
    marginRight: 'auto',
  },
  firstName: {
    borderColor: COLORS.mainPurple,
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '80%',
    marginBottom: 0,
    height: 50,
    padding: 15,
    color: COLORS.black,
    fontSize: SIZES.preMedium,
  },
  lastName: {
    borderColor: COLORS.mainPurple,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '80%',
    marginBottom: 20,
    height: 50,
    padding: 15,
    color: COLORS.black,
    fontSize: SIZES.preMedium,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  submitBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.mainPurple,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 80,
    marginTop: 10,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  },
  calendar: {
    marginHorizontal: 35,
    borderRadius: 10,
    elevation: 2,
    marginTop: '60%',
    borderWidth: 1,
    borderBlockColor: COLORS.mainPurple,
  },
});
