import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../../constants/themes';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';

const UpdateModal = ({exitModal}) => {
  const [checkOption, setCheckOption] = useState({
    camera: true,
    weapon: true,
    animal: true,
  });

  const [payOption, setPayOption] = useState({
    ethereum: false,
    applePay: false,
    googlePay: false,
    btc: false,
    icp: false,
    creditCard: false,
  });

  const [discounts, setDiscounts] = useState({
    '10%': false,
    '20%': false,
    '30%': false,
  });

  const [pauseReel, setPauseReel] = useState(true);

  const [videoControlOpacity, setVideoControlOpacity] = useState(true);

  const videoControl = () => {
    setVideoControlOpacity(!videoControlOpacity);
  };
  const videoControl2 = () => {
    setTimeout(() => {
      setVideoControlOpacity(!videoControlOpacity);
    }, 1500);
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
        contentContainerStyle={{
          width: Dimensions.get('window').width,
          paddingHorizontal: 10,
        }}>
        {/* sec1 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Place Description</Text>
        </View>
        <TextInput
          style={[styles.textInput, {height: 100, textAlignVertical: 'top'}]}
          multiline={true}
          placeholder="Place Description"
        />

        {/* sec2 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cover Photo</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../../assets/images/hostView/hotelImg1.png')}
            style={styles.imgStyle}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity>
            <Text style={styles.btn}>Upload New Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btn}>Add Photo</Text>
          </TouchableOpacity>
        </View>

        {/* sec3 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Video</Text>
        </View>
        <View style={styles.imageContainer}>
          <Video
            source={require('./sample_video.mp4')}
            resizeMode="cover"
            paused={pauseReel}
            onEnd={() => setPauseReel(true)}
            playbackRate={1.0}
            volume={1.0}
            muted={false}
            ignoreSilentSwitch="ignore"
            controls={true}
            posterResizeMode="cover"
            poster="https://picsum.photos/seed/picsum/200/300"
            style={styles.backgroundVideo}
          />
          <TouchableOpacity
            onPress={videoControl}
            style={
              videoControlOpacity
                ? styles.videoControlBtnContainer
                : styles.videoControlBtnContainerInvisible
            }>
            <Icon
              name={pauseReel ? 'play-circle-outline' : 'pause-circle-outline'}
              size={50}
              style={
                videoControlOpacity ? styles.videoControlBtn : {display: 'none'}
              }
              onPress={() => {
                setPauseReel(!pauseReel);
                videoControl2();
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity>
            <Text style={styles.btn}>Upload New Video</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btn}>Add Video</Text>
          </TouchableOpacity>
        </View>

        {/* sec4 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Price</Text>
        </View>
        <TextInput
          style={styles.textInput}
          inputMode="numeric"
          placeholder="$745/Night"
        />

        {/* sec5 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
        </View>
        <View style={styles.payContainer}>
          <TouchableOpacity
            onPress={() =>
              setPayOption({...payOption, ethereum: !payOption.ethereum})
            }>
            <View
              style={
                payOption.ethereum ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="ethereum" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setPayOption({...payOption, applePay: !payOption.applePay})
            }>
            <View
              style={
                payOption.applePay ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="apple-pay" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setPayOption({...payOption, googlePay: !payOption.googlePay})
            }>
            <View
              style={
                payOption.googlePay ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="google-pay" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPayOption({...payOption, btc: !payOption.btc})}>
            <View style={payOption.btc ? styles.payItemActive : styles.payItem}>
              <Icon4 name="btc" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPayOption({...payOption, icp: !payOption.icp})}>
            <View style={payOption.icp ? styles.payItemActive : styles.payItem}>
              <Text style={styles.payItemText}>ICP</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setPayOption({...payOption, creditCard: !payOption.creditCard})
            }>
            <View
              style={
                payOption.creditCard ? styles.payItemActive : styles.payItem
              }>
              <Icon4 name="credit-card" color={COLORS.black} size={30} />
            </View>
          </TouchableOpacity>
        </View>

        {/* sec6 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Discounts</Text>
        </View>
        <View style={styles.payContainer}>
          <TouchableOpacity
            onPress={() =>
              setDiscounts({...discounts, '10%': !discounts['10%']})
            }>
            <View
              style={discounts['10%'] ? styles.payItemActive : styles.payItem}>
              <Text
                style={
                  discounts['10%']
                    ? styles.payItemTextActive
                    : styles.payItemText
                }>
                10%
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setDiscounts({...discounts, '20%': !discounts['20%']})
            }>
            <View
              style={discounts['20%'] ? styles.payItemActive : styles.payItem}>
              <Text
                style={
                  discounts['20%']
                    ? styles.payItemTextActive
                    : styles.payItemText
                }>
                20%
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setDiscounts({...discounts, '30%': !discounts['30%']})
            }>
            <View
              style={discounts['30%'] ? styles.payItemActive : styles.payItem}>
              <Text
                style={
                  discounts['30%']
                    ? styles.payItemTextActive
                    : styles.payItemText
                }>
                30%
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* sec7 */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Place Have</Text>
        </View>
        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            setCheckOption({...checkOption, camera: !checkOption.camera})
          }>
          <Text
            style={
              checkOption.camera ? styles.optionText : styles.optionTextActive
            }>
            Security Camera
          </Text>
          <Icon2
            name="checkcircle"
            size={20}
            style={
              checkOption.camera ? styles.optionIcon : styles.optionIconActive
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            setCheckOption({...checkOption, weapon: !checkOption.weapon})
          }>
          <Text
            style={
              checkOption.weapon ? styles.optionText : styles.optionTextActive
            }>
            Weapons
          </Text>
          <Icon2
            name="checkcircle"
            size={20}
            style={
              checkOption.weapon ? styles.optionIcon : styles.optionIconActive
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() =>
            setCheckOption({...checkOption, animal: !checkOption.animal})
          }>
          <Text
            style={
              checkOption.animal ? styles.optionText : styles.optionTextActive
            }>
            Dangerous Animals
          </Text>
          <Icon2
            name="checkcircle"
            size={20}
            style={
              checkOption.animal ? styles.optionIcon : styles.optionIconActive
            }
          />
        </TouchableOpacity>

        {/* sec8 */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => exitModal(false)}>
          <Text style={styles.saveBtnText}>Update And Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
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
    marginVertical: 10,
  },

  sectionTitle: {
    color: COLORS.black,
    fontWeight: '400',
  },

  textInput: {
    width: '100%',
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
  },

  imageContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: '100%',
    height: 200,
  },

  imgStyle: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  btn: {
    width: 150,
    height: 50,
    color: COLORS.mainPurple,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    borderRadius: 10,
    textAlign: 'center',
    paddingTop: 15,
    fontWeight: '800',
  },

  backgroundVideo: {
    position: 'absolute',
    borderRadius: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
  },

  videoControlBtnContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  videoControlBtnContainerInvisible: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'transparent',
  },

  videoControlBtn: {
    color: COLORS.white,
    position: 'relative',
    zIndex: 1,
  },

  payContainer: {
    width: '100%',
    height: 'fit-content',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  payItem: {
    width: 100,
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    justifyContent: 'center',
    alignItems: 'center',
  },

  payItemActive: {
    width: 100,
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.mainPurple,
    backgroundColor: COLORS.mainPurple,
  },

  payItemText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 20,
  },

  payItemTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
  },

  option: {
    width: '100%',
    height: 70,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    marginVertical: 5,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },

  optionTextActive: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.mainPurple,
  },

  optionIcon: {
    display: 'none',
  },

  optionIconActive: {
    display: 'flex',
    color: COLORS.mainPurple,
  },

  saveBtn: {
    width: '100%',
    height: 60,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.mainPurple,
    backgroundColor: COLORS.mainPurple,
    marginVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveBtnText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
  },
});
