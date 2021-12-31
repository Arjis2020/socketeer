import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PowerIcon from '@mui/icons-material/Power';
import WifiIcon from '@mui/icons-material/Wifi';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { AppBar, Container, Toolbar, Typography, Button, Avatar } from '@mui/material';

export default function Header({ onTabChanged, activeTab }) {

    const handleChange = (event, newValue) => {
        onTabChanged(newValue)
    };

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters className='justify-content-between'>
                    <img src='/socketeer.png' style = {{
                        height: 24,
                    }}/>
                    <Tabs value={activeTab} onChange={handleChange} aria-label="tabs" centered>
                        <Tab icon={<PowerIcon />} aria-label="connect" label='Connect'/>
                        <Tab icon={<WifiIcon />} aria-label="emit" label='Emit'/>
                        <Tab icon={<FavoriteIcon />} aria-label="favorite" label='Favorites'/>
                    </Tabs>
                    <Button variant='contained' sx={{ fontWeight: '600' }} endIcon={<PhoneIphoneIcon />}>
                        Get the app
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
