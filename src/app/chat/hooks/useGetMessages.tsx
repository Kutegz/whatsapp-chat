import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestoreDb } from '../../../configs/firebase';
import { MessageResponse } from '../models/responses/messageResponse';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore/lite';
import { RoomResponse } from '../../sidebar/models/responses/roomResponse';

const useGetMessages = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [roomData, setRoomData] = useState<RoomResponse>({ name: '' });

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

  return { roomData, messages };
};

export default useGetMessages;
