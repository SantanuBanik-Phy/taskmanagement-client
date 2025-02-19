
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config'; 
import axios from 'axios'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                try {
                    const res = await axios.post('/users', { 
                        uid: authUser.uid,
                        email: authUser.email,
                        displayName: authUser.displayName,
                    });
                    setUser(authUser);
                } catch (error) {
                    console.error('Error storing user data:', error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

       const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Google Sign-in Error:', error);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Sign-out error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // Custom hook


