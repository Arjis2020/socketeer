import { Button, Card, CardActions, CardContent, CardMedia, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import Heading from '../Heading'
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalStorage from '../../localStorage';

export default function History({ histories, onLoad, onClear }) {
    return (
        <Stack>
            <Heading
                heading='History'
                body='View all connection histories'
                icon={<HistoryIcon />}
                button
                buttonIcon={<DeleteIcon />}
                buttonText='Clear history'
                onClick={onClear}
            />
            <Stack direction='column' spacing={1} marginBottom={5}>
                {histories ?
                    histories.map(history => {
                        return (
                            <Card
                                sx={{ minWidth: 275 }}
                            >
                                <CardContent>
                                    <Stack direction='row' spacing={1}>
                                        <CardMedia
                                            component='img'
                                            sx={{ width: 45, height: 45 }}
                                            image={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${history.url}&size=64`}
                                            alt='site-logo'
                                        />
                                        <Stack direction='column'>
                                            <Typography>
                                                {history.url}
                                            </Typography>
                                            <Typography sx={{ mb: 1 }} variant='caption' color='text.secondary'>
                                                Average RTT: {history.avg_rtt}ms
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <CardActions
                                        sx={{ pl: 0 }}
                                    >
                                        <Button
                                            size='medium'
                                            onClick={() => onLoad(history.id)}
                                        >
                                            Load
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )
                    })
                    :
                    <Container maxWidth='xl' disableGutters>
                        <Typography variant='caption' color='GrayText'>
                            No connection history found
                        </Typography>
                    </Container>
                }
            </Stack>
        </Stack>
    )
}
