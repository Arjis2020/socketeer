import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PowerIcon from '@mui/icons-material/Power';
import WifiIcon from '@mui/icons-material/Wifi';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { AppBar, Container, Toolbar, Typography, Box, Button } from '@mui/material';

export default function Header() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters className='justify-content-between'>
                    <Typography
                        variant='h6'
                        noWrap
                    >
                        Socketeer
                    </Typography>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
                        <Tab icon={<PowerIcon />} aria-label="connect" />
                        <Tab icon={<WifiIcon />} aria-label="emit" />
                        <Tab icon={<FavoriteIcon />} aria-label="favorite" />
                    </Tabs>
                    <Button variant='contained' sx={{ fontWeight: '600' }} endIcon={<PhoneIphoneIcon />}>
                        Get the app
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
