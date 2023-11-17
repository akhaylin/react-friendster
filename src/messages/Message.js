import React, { useContext } from 'react';
import userContext from '../context/userContext';
import { Link } from "react-router-dom";
import {formatDistanceToNow} from 'date-fns';

function Message ({username, fromUsername, toUsername, firstName, lastName, body, sentAt }){

  const currusername = useContext(userContext)?.username;

  const messageStyle = fromUsername === currusername
  ? {position:'relative',left:0, backgroundColor:'PaleTurquoise', }
  : {position:'relative',left:500, backgroundColor:'Gainsboro', }

  const timeAgo = formatDistanceToNow(new Date(sentAt), {addSuffix: true})

  return(
    <div className="card mt-3 m-3" style={{width: '25rem', ...messageStyle}}>
      <div className="card-header">
        From: {fromUsername}
      </div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{body}</p>
          <footer className="blockquote-footer"><cite title="Source Title">{timeAgo}</cite></footer>
        </blockquote>
      </div>
    </div>
  )
}

export default Message;
