import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/themes'
import { images } from '../../constants'

const HostBand = () => {
  return (
    <View style={styles.band}>
      <View style={styles.subCont}>
        <Image source={images.profile} style={styles.img}/>
        <View style={styles.TextCont}>
            <Text style={styles.Title}></Text>
        </View>
      </View>
    </View>
  )
}

export default HostBand

const styles = StyleSheet.create({
    band:{
        width:'100%',
        backgroundColor:COLORS.royalPurple
    },
    subCont:{

    },
    img:{

    },
    TextCont:{

    },
    Title:{

    },
    simpleText:{

    }
})