import React from 'react';
import './App.css';
import AuthComponent from './@components/AuthComponent';
import Header from './@components/Header';

import { Grid, Container, Box } from '@mui/material'

import lyricBoostLogo from '/lyricBoostLogo.svg'


 
 
function App() {
    return (
        <div className="App">
            {/* <div><img src={lyricBoostLogo} width="60px"/></div> */}
            <Header /> 
            <Grid container>
                <Box style={{ display: "flex", margin: "auto", paddingTop: "100px", paddingBottom: "100px" }} >
                    <AuthComponent />
                </Box>
            </Grid>
        </div>
    );
}

export default App;