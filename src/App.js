import './App.css';
import { ThemeProvider, createTheme, createStyles } from '@mui/material/styles';
import { Button, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Connection from './components/Connection';
import Server from './components/Server';
import Status from './components/Status';
import Footer from './components/Footer';

//socket
import Socket from './socket'
import { useState } from 'react';
import { ConnectingAirports } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFDF36',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'SFProText-Medium'
  }
})

const styles = createStyles({
  root: {
    width: '100vw',
    height: '100vh',
  }
})

function App() {
  const [connection, setConnection] = useState({
    status: 'disconnected',
    data: {
      id: '',
      url: '',
      listeners: []
    }
  })

  const onConnect = (url, options) => {
    try {
      setConnection({
        status: 'connecting',
        data: {
          id: '',
          url,
          listeners: [{ name: 'connect', removable: false }]
        }
      })
      Socket.init(url, options, (data) => {
        setConnection({
          status: 'connected',
          data
        })
      })
    }
    catch (err) {
      console.log(err.toString())
    }
  }

  return (
    <div style={styles.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Connection onConnect={onConnect} listeners={connection.data.listeners} status={connection.status} />
        <Server messages={[{ title: 'prices-update', msg: JSON.stringify({ 'bitcoin': '151412', 'ethereum': '151412' }, undefined, 4) }]} />
        <Status status={connection.status} data={connection.data} />
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App;
