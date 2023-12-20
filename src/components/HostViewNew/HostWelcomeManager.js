import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HostFirstScreen from './HostFirstScreen/HostFirstScreen'
import HostWelcomeBack from './HostWelcomeBack/HostWelcomeBack'
import HostGettingStarted from './HostGettingStarted/HostGettingStarted'

const HostWelcomeManager = ({hostModal,setHostModal}) => {

    let component='<></>'
    switch(hostModal){
        case(1):
        component=<HostFirstScreen setHostModal={setHostModal} />
        break

        case(2):
        component=<HostWelcomeBack setHostModal={setHostModal}/>
        break

        case(3):
        component=<HostGettingStarted setHostModal={setHostModal}/>
        break
    }
  return (
    <>
      {
        component
      }
    </>
  )
}

export default HostWelcomeManager

const styles = StyleSheet.create({})