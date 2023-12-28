import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.mapCont}>
      <MapView style={styles.mapCont}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
            
      />
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
    mapCont:{
      width:'100%',
      height:540
    }
})