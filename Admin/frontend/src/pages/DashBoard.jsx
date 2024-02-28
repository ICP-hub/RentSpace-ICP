import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/dashboard/dashboard.css'
import InfoCards from '../components/dashboard/InfoCards'
import ChatWindow from '../components/dashboard/chatWindow/ChatWindow'
import BookingChart from '../components/dashboard/bookingChart/BookingChart'
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import { useAuth } from '../utils/useAuthClient';


const DashBoard = () => {
  const nav = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [hotelOnBoard, setHotelOnBoardData] = useState(null);
  const [userOnBoardData, setUserOnBoardData] = useState(null);
  const [chat, showChat] = useState(true);
  const { actors } = useAuth();

  async function updateAnnualData() {
    let { bookingActor, hotelActor, userActor } = actors;
    let year = new Date().getFullYear();
    console.log(year + " type of year: " + typeof (year));
    await bookingActor.getBookingFrequencyInYear(year.toString()).then((res) => { setBookingData(res[0]) });
    await hotelActor.getHotelFrequencyByYear(year.toString()).then((res) => { setHotelOnBoardData(res[0]) });
    await userActor.getAnnualRegisterByYear(year.toString()).then((res) => { setUserOnBoardData(res[0]) });

  };
  console.log(actors);
  useEffect(() => {
    updateAnnualData();
  }, []);
  return (
    <div className='page'>
      <Navbar nav={nav} />
      <Header title={'Dashboard Overview'} onClick={() => showChat(!chat)} />
      <div className='dashboard-main'>
        <div className='dashboard-main-info'>
          <div className='dashboard-infoCards-cont'>
            <InfoCards label={"Users"} count={45} />
            <InfoCards label={"Hotels"} count={345} />
          </div>
          <BookingChart bookingData={bookingData} />
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