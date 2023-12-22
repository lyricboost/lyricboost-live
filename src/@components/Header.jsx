import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, Container } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LyricBoostLogo from '/LyricBoostLogo.svg'


const Header = () => {

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "#2c3e50" }}>
                <Container maxWidth="xl">
                    <Toolbar style={{ display: "flex", alignItems: "center", padding: "10px 0px" }}> 
                            <img src={LyricBoostLogo} height="40px"/>
                    </Toolbar>
                </Container>
            </AppBar>
        </div> 
    );
};

export default Header;
