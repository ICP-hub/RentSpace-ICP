import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../../../../../constants/themes'
import { Dropdown } from 'react-native-element-dropdown';


const data = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'UK', value: 'UK' },
    {label:'China',value:'China'},
    {label:'South Africa',value:'South Africa'}
  ];

const AddressFileds = ({setAddress,address}) => {
  return (
    <View style={styles.cont}>
        <Dropdown
            data={data}
            value={address.region}
            placeholder='Country/region'
            onChange={value=>setAddress({...address,region:address.region})}
            labelField="label"
            valueField='value'
            style={styles.firstInp}
            placeholderStyle={styles.textDropdownPlaceHolder}
            selectedTextStyle={styles.textDropdown}
            itemTextStyle={styles.textDropdownPlaceHolder}
            iconColor={COLORS.hostTitle}
        />
      {/* <TextInput
        style={styles.firstInp}
        value={address.region}
        onChangeText={value=>setAddress({...address,region:address.region})}
        placeholder='Country/region'
        placeholderTextColor={COLORS.hostTitle}
      /> */}
      <TextInput
        style={styles.middleInputs}
        value={address.streetAdd}
        onChangeText={value=>setAddress({...address,streetAdd:address.streetAdd})}
        placeholder='Street address'
        placeholderTextColor={COLORS.hostTitle}
      />
      <TextInput
        style={styles.middleInputs}
        value={address.suiteBuilding}
        onChangeText={value=>setAddress({...address,suiteBuilding:address.suiteBuilding})}
        placeholder='Apt, suite, bldg (optinal)'
        placeholderTextColor={COLORS.hostTitle}
      />
      <TextInput
        style={styles.middleInputs}
        value={address.city}
        onChangeText={value=>setAddress({...address,city:address.city})}
        placeholder='City'
        placeholderTextColor={COLORS.hostTitle}
      />
      <TextInput
        style={styles.middleInputs}
        value={address.country}
        onChangeText={value=>setAddress({...address,country:address.country})}
        placeholder='Country'
        placeholderTextColor={COLORS.hostTitle}
      />
      <TextInput
        style={styles.lastInp}
        value={address.postcode}
        onChangeText={value=>setAddress({...address,postcode:address.postcode})}
        placeholder='Postcode'
        placeholderTextColor={COLORS.hostTitle}
      />
    </View>
  )
}

export default AddressFileds

const styles = StyleSheet.create({
    cont:{
        display:'flex',
        flexDirection:'column',
        width:'85%',
        marginLeft:'7.5%',
        marginTop:20,
        marginBottom:10
    },
    middleInputs:{
        width:'100%',
        borderWidth:0.8,
        borderColor:COLORS.hostTitle,
        opacity:0.8,
        color:COLORS.black,
        paddingLeft:15,
        borderTopWidth:0
    },
    lastInp:{
        width:'100%',
        borderWidth:0.8,
        borderColor:COLORS.hostTitle,
        opacity:0.8,
        color:COLORS.black,
        paddingLeft:15,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopWidth:0
    },
    firstInp:{
        width:'100%',
        borderWidth:0.8,
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        borderColor:COLORS.hostTitle,
        opacity:0.8,
        color:COLORS.black,
        paddingLeft:15,
        paddingVertical:10
    },
    textDropdown:{
        color:COLORS.black,
        fontSize:SIZES.preMedium
    },
    textDropdownPlaceHolder:{
        color:COLORS.hostTitle,
        fontSize:SIZES.preMedium,
        opacity:0.8
    }
})