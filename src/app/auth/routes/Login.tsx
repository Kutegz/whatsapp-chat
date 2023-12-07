import '../styles/Login.css';
import { Button } from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../configs/firebase';
import LoginLogo from '../../../assets/CILFullLogo.png';
import { UserData } from '../context/UserContext';

const Login = () => {
  const { setUser } = UserData();
  const signIn = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;

      setUser({
        uid: user.uid,
        displayName: user.displayName ?? '',
        email: user.email ?? '',
        emailVerified: user.emailVerified,
        photoURL: user.photoURL ?? '',
      });
    } catch (error: FirebaseError | unknown) {
      if (error instanceof FirebaseError) {
        console.log(`Error - code: ${error.code}, message: ${error.message}`);
      } else {
        console.error('Error Occured:', error);
      }
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={LoginLogo} alt="ClinicMaster Logo" />
        <div className="login__text">
          <p>ClinicMaster Chat</p>
        </div>
        <Button type="button" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
