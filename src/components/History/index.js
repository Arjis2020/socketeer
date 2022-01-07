import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'

export default function History({ histories, onLoad }) {
    return (
        <Stack>
            {histories && histories.map(history => {
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
                                    onClick={() => onLoad(history.url)}
                                >
                                    Load
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                )
            })}
        </Stack>
    )
}
