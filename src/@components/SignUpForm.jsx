import React, { useState } from 'react';
import { supabase } from './../../supabase';
import { Typography, FormControl, TextField, Button } from '@mui/material';

const SignUpForm = ({ setMessage, setIsSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const handleSignUp = async (e) => {
        e.preventDefault();  // Prevents the default form submission behavior

        if (!email || !password) {
            setMessage({ type: 'error', content: 'Please enter both email and password.' });
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            setMessage({ type: 'success', content: 'Signed up successfully! Please check your email to confirm.' });
        } catch (error) {
            setMessage({ type: 'error', content: error.message });
        }
    };

    return (
        <>
            <Typography variant="h3">Sign up</Typography>
            {/* Wrap inputs and buttons in a form element */}
            <form onSubmit={handleSignUp}>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Sign Up
                    </Button>
                    <Button onClick={() => setIsSignUp(false)} color="secondary">
                        Have an account? Sign In
                    </Button>
                </FormControl>
            </form>
        </>
    );
};

export default SignUpForm;