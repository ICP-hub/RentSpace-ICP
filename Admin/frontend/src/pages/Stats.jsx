import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/statistics/stats.css'
import PiechartStats from '../components/statistics/PiechartStats'
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import { useAuth } from '../utils/useAuthClient'

const dataComplete=require('../charts/data.json')

const sumArray=(n)=>{
  let sum=0;
  for(let i=0;i<n.length;i++){
      sum+=n[i];
  }
  return sum;
}
function createArray(arr) {
  console.log(arr)
  if(arr!=undefined){
      let data = [];
      data.push(Number(arr.dec));
      data.push(Number(arr.nov));
      data.push(Number(arr.oct));
      data.push(Number(arr.sep));
      data.push(Number(arr.aug));
      data.push(Number(arr.july));
      data.push(Number(arr.june));
      data.push(Number(arr.may));
      data.push(Number(arr.april));
      data.push(Number(arr.march));
      data.push(Number(arr.feb));
      data.push(Number(arr.jan));
      return data.reverse()
  }else{
      return [];
  }
}

const Stats = () => {

  const [userYear,setUserYear]=useState(2024)
  const [hotelYear,setHotelYear]=useState(2024)
  const [userData,setUserData]=useState([])
  const [hotelData,setHotelData]=useState([])
  const [userCount,setUserCount]=useState(0)
  const [hotelCount,setHotelCount]=useState(0)
  const {actors}=useAuth()

  const getUserData=async(year)=>{
    let userRes=await actors?.userActor?.getAnnualRegisterByYear(year.toString())
    if(userRes?.err!=undefined){
      console.log("err fetching user data  : ",userRes?.err)
      return
    }
    console.log("user count res : ",userRes)
    setUserCount(sumArray(createArray(userRes?.ok)))
    setUserData(createArray(userRes?.ok))
  }
  const getHotelData=async(year)=>{
      const hotelRes=await actors?.hotelActor?.getHotelRegisterFrequencyData(year.toString())
      if(hotelRes?.err!=undefined){
        console.log("err in fetching hotel data : ",hotelRes?.err)
        return
      }
      console.log("hotel count res : ",hotelRes)
      setHotelCount(sumArray(createArray(hotelRes?.ok)))
      setHotelData(createArray(hotelRes?.ok))

  }
  useEffect(()=>{
    getUserData(userYear)
  },[userYear])

  useEffect(()=>{
    getHotelData(hotelYear)
  },[hotelYear])

  const nav=useNavigate()
  return (
    <div className='page'>
      <Navbar nav={nav}/>
      <Header title={'Statistics'}/>
      <div className="stats-main-cont">
        <div className="pie-chart-cont">
          <PiechartStats year={userYear} setYear={setUserYear} label={"Users"} data={userData} count={userCount}/>
          <PiechartStats year={hotelYear} setYear={setHotelYear} label={"Hotels"} data={hotelData} count={hotelCount}/>
        </div>
      </div>
    </div>
  )
}

export default Stats