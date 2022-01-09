import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PowerIcon from '@mui/icons-material/Power';
import WifiIcon from '@mui/icons-material/Wifi';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HistoryIcon from '@mui/icons-material/History';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Container, Toolbar, Typography, Button, Avatar, Box, Tooltip, IconButton, Menu, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

export default function Header({ onTabChanged, activeTab, onDonateClicked }) {
    const [openDrawer, setOpenDrawer] = useState(false)

    const handleChange = (event, newValue) => {
        onTabChanged(newValue)
    };

    const handleOpenNavMenu = () => {
        setOpenDrawer(true)
    }

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        /* setState({ ...state, [anchor]: open }); */
        setOpenDrawer(open)
    };

    const XS = () => {
        return (
            <Box sx={{
                flexGrow: 1,
                display: {
                    xs: 'flex',
                    md: 'none'
                },
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <img src='/socketeer-small.png' style={{
                    height: 28,
                }} />
                {/* <Tabs value={activeTab} onChange={handleChange} aria-label="tabs" centered>
                    <Tab icon={<PowerIcon fontSize='small' />} aria-label="connect" />
                    <Tab icon={<WifiIcon fontSize='small' />} aria-label="emit" />
                    <Tab icon={<HistoryIcon fontSize='small' />} aria-label="history" />
                </Tabs> */}
                <SwipeableDrawer
                    anchor='bottom'
                    open={openDrawer}
                    PaperProps={{
                        sx: {
                            background: '#0C0013'
                        }
                    }}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <Box
                        //sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {['Connect', 'Emit', 'History'].map((text, index) => (
                                <ListItem
                                    button
                                    key={text}
                                    onClick={() => handleChange(null, index)}
                                >
                                    <ListItemIcon>
                                        {index === 0 ?
                                            <PowerIcon />
                                            :
                                            index === 1 ?
                                                <WifiIcon />
                                                :
                                                <HistoryIcon />
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </SwipeableDrawer >
                <Tooltip
                    title='Donate'
                >
                    <IconButton
                        onClick={onDonateClicked}
                        color='primary'
                    >
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
            </Box >
        )
    }

    const MD = () => {
        return (
            <Box sx={{
                flexGrow: 1,
                display: {
                    xs: 'none',
                    md: 'flex'
                },
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <img src='/socketeer.png' style={{
                    height: 24,
                }} />
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="tabs"
                    centered
                >
                    <Tab icon={<PowerIcon />} aria-label="connect" />
                    <Tab icon={<WifiIcon />} aria-label="emit" />
                    <Tab icon={<HistoryIcon />} aria-label="history" />
                </Tabs>
                <Button
                    variant='contained'
                    endIcon={<FavoriteIcon />}
                    onClick={onDonateClicked}
                >
                    Donate
                </Button>
            </Box>
        )
    }

    return (
        <AppBar position='fixed'>
            <Container maxWidth='xl'>
                <Toolbar
                    disableGutters
                >
                    {/* <img src='/socketeer.png' style={{
                        height: 24,
                    }} />
                    <Tabs value={activeTab} onChange={handleChange} aria-label="tabs" centered>
                        <Tab icon={<PowerIcon />} aria-label="connect" />
                        <Tab icon={<WifiIcon />} aria-label="emit" />
                        <Tab icon={<HistoryIcon />} aria-label="history" />
                    </Tabs>
                    <Button
                        variant='contained'
                        endIcon={<FavoriteIcon />}
                        onClick={onDonateClicked}
                    >
                        Donate
                    </Button> */}
                    <XS />
                    <MD />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
