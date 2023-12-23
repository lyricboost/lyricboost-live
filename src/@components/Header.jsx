import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import LyricBoostLogo from './../assets/LyricBoostLogo.svg';

 
const Header = () => {
    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: "#2c3e50" }}>
                <Container maxWidth="xl">
                    <Toolbar style={{ display: "flex", alignItems: "center", padding: "10px 0px" }}> 
                        {/* Update the src to point to the public directory */}
                        <img src={LyricBoostLogo} height="40px" alt="LyricBoost Logo"/>
                    </Toolbar>
                </Container>
            </AppBar>
        </div> 
    );
}; 

export default Header;
