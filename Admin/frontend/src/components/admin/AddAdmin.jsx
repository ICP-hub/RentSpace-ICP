import React, { useState } from 'react'
import { useAuth } from '../../utils/useAuthClient';

const AddAdmin = () => {

    const { actors } = useAuth();
    const [principle,setPrinciple]=useState("")
    const [loading,setLoading]=useState(false)

    const addNewOwner=async()=>{
        setLoading(true)
        let p1=new Promise(async(resolve,reject)=>{
            await actors?.userActor?.addOwner(principle).then((res)=>{
                resolve(res)
                console.log(res)
            }).catch((err)=>{
                reject(err)
                console.log(err)
            })
        })
        let p2=new Promise(async(resolve,reject)=>{
            await actors?.bookingActor?.addOwner(principle).then((res)=>{
                resolve(res)
                console.log(res)
            }).catch((err)=>{
                reject(err)
                console.log(err)
            })
        })
        let p3=new Promise(async(resolve,reject)=>{
            await actors?.supportActor?.addOwner(principle).then((res)=>{
                resolve(res)
                console.log(res)
            }).catch((err)=>{
                reject(err)
                console.log(err)
            })
        })
        let p4=new Promise(async(resolve,reject)=>{
            await actors?.hotelActor?.addOwner(principle).then((res)=>{
                resolve(res)
                console.log(res)
            }).catch((err)=>{
                reject(err)
                console.log(err)
            })
        })
        await Promise.all([p1,p2,p3,p4])
            .then((value)=>{
                console.log(value)
                alert("New admin is successfully added!")
                setLoading(false)
                setPrinciple("")
            })
            .catch((err)=>{
                console.log(err)
                alert("Some error occured while adding new admin, Please try again!")
                setLoading(false)
            })
    }

  return (
    <div className='add-admin'>
        <input placeholder='Enter the principle' type='text' value={principle} onChange={(e)=>{setPrinciple(e.target.value)}} className="admin-inp"/>
        <button className='add-admin-btn' onClick={addNewOwner}>Add admin</button>
        {
            loading?
            <div className='dots'/>
            :
            <></>
        }
        
    </div>
  )
}

export default AddAdmin