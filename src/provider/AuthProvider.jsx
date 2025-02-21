import { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import  app  from '../firebase/firebase.config';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      setUser(loggedInUser);

      // Store user data in MongoDB on first login
      const userData = {
        uid: loggedInUser.uid,
        email: loggedInUser.email,
        displayName: loggedInUser.displayName,
      };
      await axios.put('https://taskmanagement-server-nine.vercel.app/users', userData);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const logOut = () => {
    signOut(auth)
    .then(() => {
        setUser(null)
      })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  },);

  const authInfo = { user, loading, signInWithGoogle, logOut };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);