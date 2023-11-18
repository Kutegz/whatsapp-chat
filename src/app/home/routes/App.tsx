import '../styles/App.css';
import Chat from '../../chat/routes/Chat';
import Login from '../../auth/routes/Login';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../sidebar/routes/Sidebar';
import NotFound from '../../notfound/routes/NotFound';
import { UserData } from '../../auth/context/UserContext';

const App = () => {
  const { user } = UserData();
  return (
    <div className="app">
      {user.uid === '' ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/rooms/:roomId" element={<Chat />} />
            {/* <Route path="/messages" element={<Message />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
