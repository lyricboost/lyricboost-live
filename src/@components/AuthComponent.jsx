import React, { useState, useEffect } from 'react';
import { supabase } from './../../supabase';
import { Box, Alert } from '@mui/material';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import UserSignedIn from './UserSignedIn';

const AuthComponent = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: session }) => {
            setUser(session?.user || null);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener.data?.unsubscribe();
        };
    }, []);

    return (
        <Box textAlign="center">
            {!user ? (
                <>
                    {message.content && (
                        <Alert severity={message.type} sx={{ mb: 2 }}>
                            {message.content}
                        </Alert>
                    )}
                    {isSignUp ? (
                        <SignUpForm setMessage={setMessage} setIsSignUp={setIsSignUp} />
                    ) : (
                        <SignInForm setMessage={setMessage} setIsSignUp={setIsSignUp} />
                    )}
                </>
            ) : (
                <UserSignedIn user={user} />
            )}
        </Box>
    );
};

export default AuthComponent;
