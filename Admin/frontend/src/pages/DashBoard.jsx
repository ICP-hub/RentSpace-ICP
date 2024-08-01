import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/dashboard/dashboard.css'
import InfoCards from '../components/dashboard/InfoCards'
import ChatWindow from '../components/dashboard/chatWindow/ChatWindow'
import BookingChart from '../components/dashboard/bookingChart/BookingChart'
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import { useAuth } from '../utils/useAuthClient';

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

const DashBoard = () => {
  const nav = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [bookingCount,setBookingCount]=useState(0)
  const [hotelCount, setHotelCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [chat, showChat] = useState(true);
  const { actors } = useAuth();
  const [year,setYear]=useState(2024)

  const getBookingData=async(year)=>{
      let bookingRes=await actors?.bookingActor?.getBookingFrequency(year.toString())
      if(bookingRes?.err!=undefined){
        console.log("err in fetchin booking data : ",bookingRes?.err)
        return
      }
      console.log("booking res : ",bookingRes)
      setBookingData(createArray(bookingRes?.ok))
      setBookingCount(sumArray(createArray(bookingRes?.ok)))
  }
  const getUserCount=async()=>{
    const date=new Date()
    let userRes=await actors?.userActor?.getAnnualRegisterByYear(date.getFullYear().toString())
    if(userRes?.err!=undefined){
      console.log("err in fetching user's data : ",userRes?.err)
      return
    }
    console.log("user count res : ",userRes)
    setUserCount(sumArray(createArray(userRes?.ok)))
    console.log(sumArray(createArray(userRes?.ok)))
  }
  const getHotelCount=async()=>{
      const date=new Date()
      let hotelRes=await actors?.hotelActor?.getHotelRegisterFrequencyData(date.getFullYear().toString())
      if(hotelRes?.err!=undefined){
        console.log("errr in fetching hotel data : ",hotelRes?.err)
        return 
      }
      console.log("hotel count res : ",hotelRes?.ok)
      setHotelCount(sumArray(createArray(hotelRes?.ok)))

  }
  console.log(actors);
  useEffect(() => {
    getUserCount()
    getHotelCount()

  }, []);
  useEffect(()=>{
      getBookingData(year)
  },[year])
  return (
    <div className='page'>
      <Navbar nav={nav} />
      <Header title={'Dashboard Overview'} onClick={() => showChat(!chat)} />
      <div className='dashboard-main'>
        <div className='dashboard-main-info'>
          <div className='dashboard-infoCards-cont'>
            <InfoCards label={"Users"} count={userCount} />
            <InfoCards label={"Hotels"} count={hotelCount} />
          </div>
          <BookingChart bookingData={bookingData} bookingCount={bookingCount} year={year} setYear={setYear} />
        </div>
        {
          chat ?
            <ChatWindow nav={nav} />
            :
            <></>
        }
      </div>
    </div>
  )
}

export default DashBoard