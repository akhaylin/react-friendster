import React, { useEffect, useState, useContext }from 'react';
import { Link, useParams } from "react-router-dom";
import ProspectCard from '../prospects/ProspectCard'
import userContext from '../context/userContext';
import FriendsterApi from '../api';
import Alert from '../Alert';
import Message from './Message';

/**
 * Renders list of messages
 *
 * Props:
 * - prospects: array like [ {prospect1}, {prospect2}, ... ]
 *
 * ProspectPage => ProspectList => ProspectCard
 */
function MessageList() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [errors, setErrors] = useState(null)
  const [formData, setFormData] = useState({body:""})

  const username = useContext(userContext)?.username;

  const {tousername} = useParams();

  useEffect(function getProspects() {
    fetchMessages();
    setIsloading(false)
  },[]);

  /**Fetch list of Prospects from API and set the result as state */
  async function fetchMessages() {
    try{
      const messages = await FriendsterApi.getMessages(tousername);
      setMessages(messages);
      setErrors(null)
    }catch (err) {
      setErrors(err)
    }
  }

  async function getToUserInfo(tousername){
    const toUserInfo =  await FriendsterApi.getUserInfo(tousername)
    return toUserInfo;
  }
  const toUserInfo = getToUserInfo(tousername);
  console.log("TOUSERINFO", toUserInfo)

  function handleChange(evt) {
    const { name, value } = evt.target;
      setFormData(oldData => ({ ...oldData, [name]: value }));
    }

  async function handleSendMessage(evt){
    evt.preventDefault();
    const messageData = {...formData, username, targetUsername:tousername}
    const res = await FriendsterApi.sendMessage(messageData)

    setMessages(oldMessages => [...oldMessages, res])
    setFormData({body:""})
    setErrors(null)
  }


  if(isLoading) return <p>Loading...</p>

  return(
    <div className='MessageList' style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

      {/* Scrollable container for messages */}
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        {messages.map(message => (
          <Message
            key={message.id}
            fromUsername={message.fromUsername}
            toUsername={message.toUsername}
            firstName={toUserInfo.firstName}
            lastName={toUserInfo.lastName}
            body={message.body}
            sentAt={message.sentAt}
          />
        ))}
        {errors && (<Alert alerts={errors} color={"danger"}/>)}
      </div>

      {/* Fixed position message input box */}
      <form onSubmit={handleSendMessage} style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', padding: '10px' }}>
        <div className="form-group">
          <label htmlFor="body">Message:</label>
          <textarea
            className="form-control"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
          <button className='btn btn-primary'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default MessageList;