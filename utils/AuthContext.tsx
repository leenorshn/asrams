import React, { createContext, useContext, useEffect, useState } from 'react';
import { signOut, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, getRedirectResult, } from 'firebase/auth';
import { auth } from './firebase';

export const AuthContext = createContext<UserContextType | null>(null);

type User = {
    uid: string,
    email: string,
    photoURL: string
    displayName: string

}



type UserContextType = {
    currentUser: User | null
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>

    loading: boolean
    login: Function
    logout: Function

}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {

                setCurrentUser(user as User);
            }
            setLoading(false);
        });

        return unsubscribe();
    }, []);

    async function login() {
        setLoading(true);
        const provider = new GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        await signInWithRedirect(auth, provider)
        await getRedirectResult(auth).then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            setCurrentUser(user)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });



    }

    async function logout() {
        setCurrentUser(null);
        await signOut(auth);
        console.log('logout');
        return;
    }


    const value = {
        currentUser,
        setCurrentUser,
        loading,
        login,
        logout,

    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}