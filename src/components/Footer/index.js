import { Favorite } from '@mui/icons-material'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Box>
            <Paper
                className='p-2'
            >
                <Container
                    maxWidth='xl'
                >
                    <Stack direction='row'>
                        <Stack direction='column' spacing={1}>
                           <img 
                            src='/socketeer.png'
                            style={{
                                height: 30,
                            }}
                           />
                            <Stack direction='row' spacing={1}>
                                <Typography
                                    variant='body2'
                                    fontFamily='SFProText-Regular'
                                >
                                    Made with
                                </Typography>
                                <Favorite fontSize='small' color='error' />
                                <Typography
                                    variant='body2'
                                    fontFamily='SFProText-Regular'
                                >
                                    by Arjis Chakraborty
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Paper>
        </Box>
    )
}
