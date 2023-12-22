import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { makeStyles } from '@mui/styles';
 
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        height: '70px', // Slim height
    },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Lyric Boost
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
