import React, { useState, useEffect } from 'react';
import { supabase } from './../../supabase';
import { Typography, Button, Container, Box, Grid, Paper, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';


const UserSignedIn = ({ user }) => {
    const [songTitle, setSongTitle] = useState('');
    const [songs, setSongs] = useState([]);
    const [editingSongId, setEditingSongId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        fetchSongs();
    }, []);

    

    const fetchSongs = async () => {
        try {
            let { data: songs, error } = await supabase
                .from('Songs')
                .select('*')
                .eq('writer_id', user.id); // Filter songs by the logged-in user's ID
            if (error) throw error;
            setSongs(songs); 
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }; 

    const handleCreateSong = async () => {
        if (!songTitle) {
            console.error('Please enter a song title.');
            return;
        }
     
        try {
            const { data, error } = await supabase
            .from('Songs')
            .insert([
                { 
                    title: songTitle,
                    writer_id: user.id, 
                    writer_email: null 
                }
            ]); 
    
            if (error) throw error;
    
            // Add new song to the songs state
            setSongs([...songs, ...data]);
            setSongTitle(''); // Reset input field after submission
        } catch (error) {
            console.error('Error creating song:', error);
        }
    };

    const handleEditSong = (song) => {
        setEditingSongId(song.id);
        setEditedTitle(song.title);
    };

    const handleSaveEdit = async () => {
        try {
            const { error } = await supabase
                .from('Songs')
                .update({ title: editedTitle })
                .match({ id: editingSongId });

            if (error) throw error;

            setEditingSongId(null);
            fetchSongs();
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    const handleDeleteSong = async (songId) => {
        try {
            const { error } = await supabase
                .from('Songs')
                .delete()
                .match({ id: songId });
            
            if (error) throw error;

            // Refetch songs after deletion
            fetchSongs();
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 2, textAlign: 'center' }}>
                            <Typography variant="h4">Hello, {user?.email}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Song Title"
                            value={songTitle}
                            onChange={(e) => setSongTitle(e.target.value)}
                            fullWidth
                        />
                        <Button onClick={handleCreateSong} variant="contained" color="secondary" size="large">
                            Create Song
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {songs.map((song) => (
                                <ListItem key={song.id}>
                                    {editingSongId === song.id ? (
                                        <TextField
                                            fullWidth
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            onBlur={handleSaveEdit}
                                        />
                                    ) : (
                                        <ListItemText primary={song.title} />
                                    )}
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditSong(song)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSong(song.id)}>
                                        <CloseIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSignOut} variant="contained" color="secondary" size="large">
                            Sign Out
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UserSignedIn;
