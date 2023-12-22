import React from 'react';
import { supabase } from './../../supabase';
import { Typography, Button, Container, Box, Grid, Paper } from '@mui/material';

const UserSignedIn = ({ user }) => {
    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 2, textAlign: 'center' }}>
                            {/* Adjusted font size for better readability */}
                            <Typography variant="h4">Hello, {user?.email}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSignOut} variant="contained" color="secondary" size="large">
                            Sign Out
                        </Button>
                    </Grid>
                    {/* Additional Grid items for dashboard content */}
                </Grid>
            </Box>
        </Container>
    );
};

export default UserSignedIn;
