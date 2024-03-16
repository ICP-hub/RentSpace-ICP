import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../components/Reusables/header/Header'
import '../components/hotels/hotels.css'
import HotelList from '../components/hotels/HotelList'
import HotelChart from '../components/hotels/hotelChart/HotelChart'
import HotelDetails from '../components/hotelDetails/HotelDetails'
import Navbar from '../components/Reusables/menuNavBar/Navbar'
import { useAuth } from '../utils/useAuthClient'
import { Principal } from '@dfinity/principal'

// const hotelsList=new Array(10).fill({
//   name:"Aashiyana",
//   host:"Lucy",
//   country:"India" 
// })
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

const Hotels = () => {
  const nav=useNavigate()
  const [showDetail,setShowDetail]=useState(-1)
  const [hotelYear,setHotelYear]=useState(2024)
  const {actors}=useAuth()
  const [hotelStats,setHotelStats]=useState([])
  const [hotelCount,setHotelCount]=useState(0)
  const [hotelList,setHotelList]=useState([])

  const getHotelList=async()=>{
    await actors?.hotelActor?.getNoOfPages(10).then(async(num)=>{
      // alert(num)
      await actors?.hotelActor?.scanHotel(0,15).then((res)=>{
        console.log(res)
  
        res.map(async(r)=>{
          let userId=r[0].split("#")[0]
          await actors?.userActor?.getUserInfoByPrincipal(Principal.fromText(userId)).then((userRes)=>{
            let hotelObj={
              userId:userId,
              hotelId:r[0],
              userData:userRes[0],
              hotelData:r[1]
            }
            console.log("hotelObj : ",hotelObj)
            let newSet =new Set([...hotelList,{...hotelObj}])
            setHotelList(Array.from(newSet))
          }).catch((err)=>{
            console.log("user detail err : ",err)
          })
        })
      }).catch((err)=>{
        console.log("hotel detail err : ",err)
      })
    }).catch((err)=>{
      console.log("err fetching number of hotel pages : ",err)
    })
    
  }

  const getHotelStats=async(year)=>{
    await actors?.hotelActor?.getHotelFrequencyByYear(year.toString()).then((res)=>{
      console.log("hotel stats res : ",res[0])
      setHotelCount(sumArray(createArray(res[0])))
      setHotelStats(createArray(res[0]))
    }).catch((err)=>{
      console.log("hotel stats err : ",err)
    })
  }

  useEffect(()=>{
    getHotelStats(hotelYear)
  },[hotelYear])

  useEffect(()=>{
    getHotelList()
  },[])

  return (
    <>
      {
        showDetail!=-1?
        <>
          <div className='page-full-width'>
            <Navbar nav={nav}/>
            <Header title={'Registered hotels'} onClick={()=>setShowDetail(-1)}/>
            <HotelDetails hotel={hotelList[showDetail]}/>
          </div>
        </>
        :
        <>
        <div className='page'>
        <Navbar nav={nav}/>
          <Header title={'Hotels Registered'} onClick={()=>alert('hotels page')}/>
          <div className='hotel-main-cont'>
            <HotelChart data={hotelStats} count={hotelCount} year={hotelYear} setYear={setHotelYear}/>
            <HotelList hotelsList={hotelList} setShowDetail={setShowDetail}/>
          </div>
        </div>
        </>
        
      }
      </>
    
  )
}

export default Hotels