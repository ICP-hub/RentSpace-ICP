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

const AddressFileds = ({setAddress,address,setReport,report}) => {
  return (
    <View style={styles.cont}>
        <Dropdown
            data={data}
            value={report?.address?.region}
            placeholder='Country/region'
            onChange={value=>setReport({...report,address:{...report.address,region:value.value}})}
            labelField="label"
            valueField='value'
            style={styles.firstInp}
            placeholderStyle={styles.textDropdownPlaceHolder}
            selectedTextStyle={styles.textDropdown}
            itemTextStyle={styles.textDropdownPlaceHolder}
            iconColor={COLORS.black}
        />
      {/* <TextInput
        style={styles.firstInp}
        value={address.region}
        onChangeText={value=>setAddress({...address,region:address.region})}
        placeholder='Country/region'
        placeholderTextColor={COLORS.black}
      /> */}
      <TextInput
        style={styles.middleInputs}
        value={report?.address?.streetAddress}
        onChangeText={value=>setReport({...report,address:{...report.address,streetAddress:value}})}
        placeholder='Street address'
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.middleInputs}
        value={report?.address?.building}
        onChangeText={value=>setReport({...report,address:{...report.address,building:value}})}
        placeholder='Apt, suite, bldg (optinal)'
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.middleInputs}
        value={report?.address?.city}
        onChangeText={value=>setReport({...report,address:{...report.address,city:value}})}
        placeholder='City'
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.middleInputs}
        value={report?.address?.country}
        onChangeText={value=>setReport({...report,address:{...report.address,country:value}})}
        placeholder='Country'
        placeholderTextColor={COLORS.black}
      />
      <TextInput
        style={styles.lastInp}
        value={report?.address?.postalCode}
        onChangeText={value=>setReport({...report,address:{...report.address,postalCode:value}})}
        placeholder='Postcode'
        placeholderTextColor={COLORS.black}
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
        borderColor:COLORS.mainPurple,
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
        borderColor:COLORS.mainPurple,
        color:COLORS.black,
        paddingLeft:15,
        paddingVertical:10
    },
    textDropdown:{
        color:COLORS.black,
        fontSize:SIZES.preMedium
    },
    textDropdownPlaceHolder:{
        color:COLORS.black,
        fontSize:SIZES.preMedium,
    }
})