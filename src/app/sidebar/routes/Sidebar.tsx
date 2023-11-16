import '../styles/Sidebar.css';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { Avatar, IconButton } from '@mui/material';
import { initState } from '../../auth/utils/helper';
import SideChat from '../../sidechat/routes/SideChat';
import { UserData } from '../../auth/context/UserContext';
import { RoomRequest } from '../models/requests/roomRequest';
import { collection, getDocs } from 'firebase/firestore/lite';
import { auth, firestoreDb } from '../../../configs/firebase';
import { Chat, DonutLarge, SearchOutlined, Logout } from '@mui/icons-material';

const Sidebar = () => {
  const { user, setUser } = UserData();
  const [rooms, setRooms] = useState<RoomRequest[]>([]);

  useEffect(() => {
    const getRooms = async () => {
      const roomsCollection = collection(firestoreDb, 'rooms');
      const snapshot = await getDocs(roomsCollection);
      const roomList = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            data: doc.data(),
          } as RoomRequest)
      );
      setRooms(roomList);
    };

    getRooms();
  }, []);

  const logOutUser = async () => {
    try {
      await signOut(auth);
      setUser({ ...initState });
    } catch (error: FirebaseError | unknown) {
      if (error instanceof FirebaseError) {
        console.log(`Error - code: ${error.code}, message: ${error.message}`);
      } else {
        console.error('Error Occured:', error);
      }
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} alt={user.displayName} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge className="sidebar__headerRightIcon" />
          </IconButton>
          <IconButton>
            <Chat className="sidebar__headerRightIcon" />
          </IconButton>
          <IconButton onClick={logOutUser}>
            <Logout className="sidebar__headerRightIcon" />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search or start new chat"
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SideChat addNewChat={true} id="" name="" />
        {rooms.map((room) => (
          <SideChat
            key={room.id}
            addNewChat={false}
            id={room.id}
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
