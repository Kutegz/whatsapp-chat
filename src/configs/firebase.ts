// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4MTc5Q6JUdnJC5p6qHIuJCnEnunJv7kk',
  authDomain: 'whatsapp-chat-6d4f5.firebaseapp.com',
  projectId: 'whatsapp-chat-6d4f5',
  storageBucket: 'whatsapp-chat-6d4f5.appspot.com',
  messagingSenderId: '1038435423865',
  appId: '1:1038435423865:web:0a9168a7c1f2f66bcba6a8',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();

/// Below will be migrated

// export const signIn = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential?.accessToken;
//       console.log(token);
//       // The signed-in user info.
//       const user = result.user;
//       console.log(user);
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       console.log(errorCode);
//       const errorMessage = error.message;
//       console.log(errorMessage);
//       // The email of the user's account used.
//       const email = error.customData.email;
//       console.log(email);
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       console.log(credential);
//       // ...
//     });
// };
