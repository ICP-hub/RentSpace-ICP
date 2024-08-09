import React, { useCallback, useEffect, useState } from 'react'
import ChatCard from './ChatCard'
import './chatWindow.css'
import { FaQuestion } from "react-icons/fa6";
import { useAuth } from '../../../utils/useAuthClient';

const userChats=[
    {
        name:"Vikas",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque beatae possimus quae laborum, at dolorem."
    },
    {
        name:"Raghav",
        text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolorem totam cupiditate. Illo quos iure quo reprehenderit consequuntur."
    }
]

const ChatWindow = ({nav}) => {
    const [userChats, setUserChats] = useState([])
    const {actors} = useAuth()

    const getUserChats = useCallback(async()=>{
        const getChatsResponse = await actors?.supportActor.getAllChats(50,1)
        if (getChatsResponse.ok) {
            const chatPromises = getChatsResponse.ok.map(async ([principal, chats]) => {
              const userResponse = await actors?.userActor?.getUserByPrincipal(principal);
              if (userResponse.ok) {
                return { user: userResponse.ok, chats };
              } else {
                return { user: null, chats }; // Handle the case where user fetching fails
              }
            });
        
            const ChatList = await Promise.all(chatPromises);
      
            // console.log(ChatList)
            
            setUserChats(ChatList)
          } else {
            return setUserChats([])
          }
    },[actors])

    useEffect(()=>{
        getUserChats()
    },[])


  return (
    <div className='chatWindow'>
        {
            (userChats.length>0)?
            <>
                <h3 className='chat-headline'><p style={{opacity:0.5}}>You have </p>&nbsp;{userChats.length} New Queries Today</h3>
                <h1 className='chat-day'>Today</h1>
                {
                    userChats.map((chat,index)=>(
                        <ChatCard chat={chat} key={index} nav={nav}/>
                    ))
                }
            </>    
                :

            <div className='no-chats'>
                <div className='no-chats-icon'>
                    <FaQuestion className='question-icon'/>
                </div>
                <p className='no-chats-text'>
                    All user’s queries will be shown here
                </p>
            </div>
        }
        
    </div>
  )
}

export default ChatWindow