import { Container, Modal, Typography, Stack, Paper, Box, CircularProgress } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Heading from '../Heading';
import { Cancel } from '@mui/icons-material';
import packageJSON from '../../../package.json'

export default function Donation({ open, onClose }) {
    setTimeout(() => {
        if (document.getElementById('donateForm')?.childElementCount === 1) {
            const Script = document.createElement("script");
            const Form = document.getElementById('donateForm');
            Script.setAttribute('src', 'https://checkout.razorpay.com/v1/payment-button.js')
            if (packageJSON.env === 'dev') {
                Script.setAttribute('data-payment_button_id', 'pl_IhXadRZ8SXrS78')
            }
            else{
                Script.setAttribute('data-payment_button_id', 'pl_IhZDYCEDji7UFI')
            }
            Form?.appendChild(Script);
            Script.onload = function () {
                const progress = document.getElementById('progressBar')
                progress.remove()
            }
        }
    }, 0)

    return (
        <Modal
            open={open}
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
                <Stack
                    alignItems='stretch'
                    justifyContent='stretch'
                    spacing={2}
                >
                    <Heading
                        heading='Donate'
                        body="'Cause we help each other in times of need"
                        icon={<FavoriteIcon />}
                        button
                        buttonIcon={<Cancel />}
                        buttonText='Cancel'
                        onClick={onClose}
                    />
                    <Typography
                        fontFamily='SFProText-Regular'
                        variant='body2'
                    >
                        Socketeer will forever be free-to-use and ad-free. But we need your aid for that. If you liked Socketeer, maybe you can spare a few bucks to keep this service running.
                    </Typography>
                    <Typography
                        fontFamily='SFProText-Regular'
                        variant='body2'
                    >
                        We follow a strict "Pay whatever you want" policy. Click on the button below to start donating!
                    </Typography>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        className='mt-4'
                    >
                        <form
                            id='donateForm'
                        >
                            <CircularProgress
                                variant='indeterminate'
                                color='primary'
                                id='progressBar'
                                size={20}
                            />
                        </form>
                    </Box>
                </Stack>
            </Container>
        </Modal >
    )
}
