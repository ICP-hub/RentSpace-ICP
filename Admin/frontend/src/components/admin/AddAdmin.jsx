import React, { useState } from 'react'
import { useAuth } from '../../utils/useAuthClient';

const AddAdmin = () => {

    const { actors } = useAuth();
    const [principle,setPrinciple]=useState("")
    const [loading,setLoading]=useState(false)

    const addNewOwner=async()=>{
        if(principle==""){
            alert('Do not leave principle empty!')
            return
        } 

        setLoading(true)
        // let p1=new Promise(async(resolve,reject)=>{
        //     await actors?.userActor?.addOwner(principle).then((res)=>{
        //         resolve(res)
        //         console.log(res)
        //     }).catch((err)=>{
        //         reject(err)
        //         console.log(err)
        //     })
        // })
        // let p2=new Promise(async(resolve,reject)=>{
        //     await actors?.bookingActor?.addOwner(principle).then((res)=>{
        //         resolve(res)
        //         console.log(res)
        //     }).catch((err)=>{
        //         reject(err)
        //         console.log(err)
        //     })
        // })
        let p3=new Promise(async(resolve,reject)=>{
            await actors?.supportActor?.addAdmin(principle).then((res)=>{
                resolve(res)
                console.log(res)
            }).catch((err)=>{
                reject(err)
                console.log(err)
            })
        })
        // let p4=new Promise(async(resolve,reject)=>{
        //     await actors?.hotelActor?.addOwner(principle).then((res)=>{
        //         resolve(res)
        //         console.log(res)
        //     }).catch((err)=>{
        //         reject(err)
        //         console.log(err)
        //     })
        // })
        await Promise.all([p3])
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
    <div className='add-admin-cont'>
        <div className="add-instruction-cont">
            <h1 className="ins-title">How do i get the principle?</h1>
            <ul className="ins-list">
                <li className="ins-list-item">Create a internet identity using the login page</li>
                <li className="ins-list-item">It will redirect you back to the admin panel</li>
                <li className="ins-list-item">An alert will show up saying 'You are not admin'</li>
                <li className="ins-list-item">Copy the hexadecimal string shown in the alert, it is your priciple</li>
                <li className="ins-list-item">Login with existing admin account add that principle as a new admin</li>
                <li className="ins-list-item">Next time you will be able to login using that identity!</li>
            </ul>
        </div>
        <div className="add-admin">
            <input placeholder='Enter the principle' type='text' value={principle} onChange={(e)=>{setPrinciple(e.target.value)}} className="admin-inp"/>
            <button className='add-admin-btn' onClick={addNewOwner}>Add admin</button>

        </div>   
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