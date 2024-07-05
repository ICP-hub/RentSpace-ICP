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
    let hotelData=[]
    let allRes=await actors?.hotelActor?.getAllHotels(10,1)
    if(allRes?.err!=undefined){
      console.log("err getting all hotel : ",allRes?.err)
      return
    }
    console.log(allRes)

    for(let i=0;i<allRes?.ok?.length;i++){
      let userId=allRes?.ok[i][0].split("#")[0]
      console.log(userId)
      let userRes=await actors?.userActor?.getUserByPrincipal(Principal.fromText(userId))
      if(userRes?.err!=undefined){
        console.log("err fetching user data : ",userRes?.err)
        return
      }
      console.log(userRes)
      let hotelObj={
        userId:userId,
        hotelId:allRes?.ok[i][0],
        hotelData:allRes?.ok[i][1],
        userData:userRes?.ok
      }
      hotelData.push(hotelObj)
    }
    console.log(hotelData)
    const set=new Set(hotelData)
    setHotelList(Array.from(set))

    // await actors?.hotelActor?.getNoOfPages(10).then(async(num)=>{
    //   // alert(num)
    //   await actors?.hotelActor?.scanHotel(0,15).then((res)=>{
    //     console.log(res)
  
    //     res.map(async(r)=>{
    //       let userId=r[0].split("#")[0]
    //       await actors?.userActor?.getUserInfoByPrincipal(Principal.fromText(userId)).then((userRes)=>{
    //         let hotelObj={
    //           userId:userId,
    //           hotelId:r[0],
    //           userData:userRes[0],
    //           hotelData:r[1]
    //         }
    //         console.log("hotelObj : ",hotelObj)
    //         let newSet =new Set([...hotelList,{...hotelObj}])
    //         setHotelList(Array.from(newSet))
    //       }).catch((err)=>{
    //         console.log("user detail err : ",err)
    //       })
    //     })
    //   }).catch((err)=>{
    //     console.log("hotel detail err : ",err)
    //   })
    // }).catch((err)=>{
    //   console.log("err fetching number of hotel pages : ",err)
    // })
    
  }

  const getHotelStats=async(year)=>{
    let hotelRes=await actors?.hotelActor?.getHotelRegisterFrequencyData(year.toString())
    if(hotelRes?.err!=undefined){
      console.log("err fetching hotel stats : ",hotelRes?.err)
      return
    }
    console.log("hotel stats res : ",hotelRes)
    setHotelCount(sumArray(createArray(hotelRes?.ok)))
    setHotelStats(createArray(hotelRes?.ok))
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