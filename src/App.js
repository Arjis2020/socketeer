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
import { AnimatePresence, motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFDF36',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0C0013',
      paper: '#0C0013'
    }
  },
  typography: {
    fontFamily: 'SFProText-Medium',
  },
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
  const [messages, setMessages] = useState([])
  const [tabIndex, setTabIndex] = useState(0)

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

  const onAddListener = (listener) => {
    setConnection({
      status: connection.status,
      data: {
        id: connection.data.id,
        url: connection.data.url,
        listeners: [...connection.data.listeners, { name: listener, removable: true }]
      }
    })
    Socket.addListener(listener, (listener, data) => {
      setMessages([...messages, { listener, msg: JSON.stringify(data, undefined, 4) }])
    })
  }

  const onRemoveListener = (listener) => {
    setConnection({
      status: connection.status,
      data: {
        id: connection.data.id,
        url: connection.data.url,
        listeners: connection.data.listeners.filter(item => item.name !== listener)
      }
    })

    Socket.removeListener(listener, (listener, data) => {
      setMessages([...messages, { listener, msg: JSON.stringify(data, undefined, 4) }])
    })
  }

  const handleTabChanged = (index) => {
    console.log(index)
    setTabIndex(index)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onTabChanged={handleTabChanged} activeTab={tabIndex} />
      <AnimatePresence>
        {tabIndex === 0 &&
          <motion.div
            key={Math.random()}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Connection
              onConnect={onConnect}
              listeners={connection.data.listeners}
              status={connection.status}
              onAddListener={onAddListener}
              onRemoveListener={onRemoveListener}
            />
          </motion.div>
        }
      </AnimatePresence>
      <Server messages={messages} />
      <Status status={connection.status} data={connection.data} />
      <Footer />
    </ThemeProvider>
  )
}

export default App;
