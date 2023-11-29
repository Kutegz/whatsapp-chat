import '../styles/Chat.css';
import { useParams } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import { avatarUrls } from '../../common/constants';
import { useEffect, useState, FormEvent } from 'react';
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from '@mui/icons-material';
import { firestoreDb } from '../../../configs/firebase';
import { UserData } from '../../auth/context/UserContext';
import { MessageResponse } from '../models/responses/messageResponse';
import { RoomResponse } from '../../sidebar/models/responses/roomResponse';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore/lite';

const Chat = () => {
  const { user } = UserData();
  const { roomId } = useParams();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [roomData, setRoomData] = useState<RoomResponse>({ name: '' });

  useEffect(() => {
    setAvatarUrl(avatarUrls[Math.floor(Math.random() * avatarUrls.length)]);
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      const getRoom = async () => {
        const roomRef = doc(firestoreDb, 'rooms', roomId);
        const roomSnapshot = await getDoc(roomRef);
        const roomName = roomSnapshot.data() as RoomResponse;
        setRoomData(roomName);

        const messagesCollection = collection(
          firestoreDb,
          'rooms',
          roomId,
          'messages'
        );

        const messagesQuery = query(
          messagesCollection,
          orderBy('timestamp', 'asc')
        );
        const messagesSnapshot = await getDocs(messagesQuery);
        const messageList = messagesSnapshot.docs.map(
          (doc) => doc.data() as MessageResponse
        );
        setMessages(messageList);
      };

      getRoom();
    }
  }, [roomId]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messagesCollection = collection(
      firestoreDb,
      `rooms/${roomId}/messages`
    );

    await addDoc(messagesCollection, {
      message: newMessage,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={avatarUrl} />
        <div className="chat__headerInfo">
          <h3>{roomData.name}</h3>
          <p>
            Last seen:{' '}
            {messages.length > 0 &&
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${
              message.name === user.displayName && 'chat__reciever'
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
