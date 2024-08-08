import React, { Suspense, useCallback, useEffect, useState, useTransition, lazy } from 'react';
import { FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useAuth } from '../../../utils/useAuthClient';
import './chat.css';

const AdminMessage = lazy(() => import('./AdminMessage'));
const Message = lazy(() => import('./Message'));

const Chat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { actors } = useAuth();
  const [isPending, startTransition] = useTransition();

  const getUserChats = useCallback(() => {
    actors?.supportActor.getAllUserMessages(user.userID)
      .then((getUserChatsResponse) => {
        startTransition(() => {
          if (getUserChatsResponse.ok) {
            setMessages(getUserChatsResponse.ok);
          } else {
            setMessages([]);
          }
        });
      })
      .catch((err) => {
        console.error("Failed to fetch user chats:", err);
        startTransition(() => {
          setMessages([]);
        });
      });
  }, [actors, user.userID]);

  useEffect(() => {
    getUserChats();
  }, [user, getUserChats]);

  const handleSendMessage = useCallback(() => {
    setMessages((prev) => [...prev, { byAdmin: true, message: currentMessage }]);

    actors?.supportActor.sendMessage(currentMessage, [user.userID])
      .then((sendMessageRequest) => {
        console.log(sendMessageRequest);
        if (!sendMessageRequest.ok) {
          throw new Error("An error occurred while sending the message! Try Again!");
        }
      })
      .catch((err) => {
        alert(err);
        setMessages((prev) => prev.filter((x) => x.message !== currentMessage));
      }).finally(()=>{
        setCurrentMessage("")
      });
  }, [actors, currentMessage, user.userID]);

  console.log("Messages: ", messages);

  return (
    <div className='chat'>
      <div className="chat-header">
        <div className="chat-user-icon-cont">
          <FaUser className='chat-user-icon' />
        </div>
        <div className="chat-user-status">
          <h3 className="chat-header-name">{user?.firstName}</h3>
          <p className="chat-header-status">Active Now</p>
        </div>
        <div></div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="chat-message-cont">
          {!isPending && messages.map((message, index) => {
            if (message?.byAdmin) {
              return (
                <AdminMessage text={message?.message} key={index} />
              );
            }
            return (
              <Message text={message?.message} key={index} />
            );
          })}
        </div>
      </Suspense>
      <div className="chat-type-field-cont">
        <input
          type='text'
          className='chat-type-field'
          placeholder='Type a message'
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <div className='chat-type-field-btn' onClick={handleSendMessage}>
          <FiSend className='chat-type-field-btn-icon' />
        </div>
      </div>
    </div>
  );
};

export default Chat;
