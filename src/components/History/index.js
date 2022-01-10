import { Button, Card, CardActions, CardContent, CardMedia, Container, Stack, Typography, Chip, Box, Divider, /* IconButton, Tooltip, */ Grid, Modal } from '@mui/material'
import React, { useState } from 'react'
import Heading from '../Heading'
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
/* import LocalStorage from '../../localStorage';
import PowerIcon from '@mui/icons-material/Power';
import SendIcon from '@mui/icons-material/Send'; */
import VisibilityIcon from '@mui/icons-material/Visibility';
import HttpsIcon from '@mui/icons-material/Https';
import WifiIcon from '@mui/icons-material/Wifi';
import CloseIcon from '@mui/icons-material/Close';
import Connection from '../Connection';

export default function History({ histories, onLoad, onClear }) {
    const [modal, setModal] = useState({
        open: false,
        history: {}
    })

    const onClose = () => {
        setModal({
            open: false,
            history: modal.history
        })
    }

    const Preview = () => {
        return (
            <Modal
                open={modal.open}
                onClose={onClose}
            >
                <Container maxWidth='xs' sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    p: 3,
                }}>
                    <Stack spacing={2}>
                        <Heading
                            heading='Preview'
                            body='Preview of what your connection will look like'
                            icon={<VisibilityIcon />}
                            button
                            buttonText='Close Preview'
                            buttonIcon={<CloseIcon />}
                            onClick={onClose}
                        />
                        <Connection
                            listeners={modal.history.listeners}
                            status='connected'
                            preview
                            esc={{
                                protocol: modal.history?.url?.split(':')[0],
                                url: modal.history?.url?.split('//')[1],
                                options: modal.history?.options
                            }}
                        />
                    </Stack>
                </Container>
            </Modal>
        )
    }

    return (
        <Box
            sx={{ mb: 5 }}
        >
            <Preview />
            <Heading
                heading='History'
                body='View all connection histories'
                icon={<HistoryIcon />}
                button
                buttonIcon={<DeleteIcon />}
                buttonText='Clear history'
                onClick={onClear}
            />
            <Grid
                container
                spacing={1}
            >
                {histories ?
                    histories.map(history => {
                        return (
                            <Grid
                                item
                                xs={12}
                                md={4}
                                key={history.id}
                            >
                                <Card
                                    sx={{ minWidth: 275 }}
                                >
                                    <CardContent>
                                        <Box
                                            display='flex'
                                            marginBottom={3}
                                        >
                                            <CardMedia
                                                component='img'
                                                sx={{ width: 40, height: 40 }}
                                                image={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${history.url}&size=64`}
                                                alt='site-logo'
                                            />
                                            <Box
                                                display='inline-block'
                                                sx={{ ml: 0.5, width: 1 }}
                                            >
                                                <Typography>
                                                    {history.url}
                                                </Typography>
                                                <Stack direction='row' justifyContent='space-between'>
                                                    <Typography variant='caption' color='text.secondary' fontFamily='SFProText-Regular'>
                                                        Average RTT: {history.avg_rtt}ms
                                                    </Typography>
                                                    <Stack direction='row' spacing={1}>
                                                        <HttpsIcon
                                                            fontSize='small'
                                                            color={history.url.startsWith('https') || history.url.startsWith('wss') ? 'success' : 'error'}
                                                        />
                                                        <WifiIcon
                                                            fontSize='small'
                                                            color={history.avg_rtt <= 100 ? 'success' : history.avg_rtt > 100 && history.avg_rtt <= 350 ? 'warning' : 'error'}
                                                        />
                                                    </Stack>
                                                </Stack>
                                                <Box>
                                                    <Chip
                                                        label={`${history.listeners.length} ${history.listeners.length > 1 ? 'listeners' : 'listener'}`}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Divider />
                                        <CardActions
                                            sx={{ pl: 0, mt: 0.8 }}
                                        >
                                            {/* <Tooltip
                                                title='Connect'
                                            >
                                                <IconButton
                                                    size='small'
                                                    onClick={() => onLoad(history.id)}
                                                    color='primary'
                                                    edge='start'
                                                >
                                                    <PowerIcon />
                                                </IconButton>
                                            </Tooltip> */}
                                            <Button
                                                onClick={() => onLoad(history.id)}
                                            >
                                                Connect
                                            </Button>
                                            {/* <Tooltip
                                                title='Share'
                                            >
                                                <IconButton
                                                    size='small'
                                                    //onClick={() => onLoad(history.id)}
                                                    color='info'
                                                    edge='start'
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </Tooltip> */}
                                            {/* <Tooltip
                                                title='Preview'
                                            >
                                                <IconButton
                                                    size='small'
                                                    onClick={() => setModal({
                                                        open: true,
                                                        history
                                                    })}
                                                    sx={{ color: '#9382A0' }}
                                                    edge='start'
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip> */}
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                    :
                    <Container maxWidth='xl' disableGutters>
                        <Typography variant='caption' color='GrayText'>
                            No connection history found
                        </Typography>
                    </Container>
                }
            </Grid>
        </Box>
    )
}
