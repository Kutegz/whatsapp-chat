import '../styles/SideChat.css';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { avatarUrls } from '../../common/constants';
import { firestoreDb } from '../../../configs/firebase';
import { addDoc, collection } from 'firebase/firestore/lite';
import { SideChatRequest } from '../../sidebar/models/requests/sideChatRequest';

const SideChat = ({ addNewChat, id, name }: SideChatRequest) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    setAvatarUrl(avatarUrls[Math.floor(Math.random() * avatarUrls.length)]);
  }, []);

  const createChat = async () => {
    const roomName = prompt('Please enter name for chat');
    if (roomName) {
      const roomsCollection = collection(firestoreDb, 'rooms');
      const newRoom = await addDoc(roomsCollection, { name: roomName });

      console.log('Room added with Id:', newRoom.id);
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={avatarUrl} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last seen</p>
        </div>
      </div>
    </Link>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SideChat;
