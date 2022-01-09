import './App.css';
import { ThemeProvider, createTheme, createStyles } from '@mui/material/styles';
import { Alert, Button, Container, CssBaseline, Slide, Snackbar } from '@mui/material';
import Header from './components/Header';
import Connection from './components/Connection';
import Server from './components/Server';
import Status from './components/Status';
import Footer from './components/Footer';

//socket
import Socket from './socket'
import { useEffect, useState } from 'react';
import Settings from './components/Settings';
import Pinger from './pinger';
import Emission from './components/Emission';
import History from './components/History';

//utils
import LocalStorage from './localStorage'
import keys from './localStorage.keys.json'
import Donation from './components/Donation';

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
      paper: '#150021'
    }
  },
  typography: {
    fontFamily: 'SFProText-Medium',
  },
})

function App() {
  const [connection, setConnection] = useState({
    status: 'disconnected',
    data: {
      id: '',
      url: '',
      options: {},
      listeners: []
    }
  })
  const [messages, setMessages] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [snackbar, setSnackbar] = useState({
    open: false,
    component: null
  })
  const [donation, setDonation] = useState(false)
  const [esc, setEsc] = useState(null)
  //const [pingHistory, setPingHistory] = useState([])
  let pingHistory = []

  const handleDonationDialog = () => {
    setDonation(true)
  }

  const onDonationClosed = () => {
    setDonation(false)
  }

  useEffect(() => {
    let interval
    if (connection.status === 'connected') {
      interval = setInterval(() => {
        Pinger(connection.data.url,
          (ping_in_ms) => {
            pingHistory.push(ping_in_ms)
          },
          (err) => {
            console.log("ERR", err.toString())
            setSnackbar({
              open: true,
              component:
                <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
                  {err.toString()}
                </Alert>
            })
          }
        )
      }, 5000)
    }
    else {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [connection])

  useEffect(() => {
    setTimeout(() => {

    }, 0)
  }, [])

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({
      open: false,
      component: null
    });
  };

  const replacer = (value) => {
    value = value.replace(/[\n\t]/g, '');
    value = value.replace(/ /g, '');
    return (value)
  }


  const onConnect = (url, options) => {
    try {
      options = JSON.parse(replacer(options))
      setConnection({
        status: 'connecting',
        data: {
          id: '',
          url,
          options,
          listeners: [{ name: 'connect', removable: false }]
        }
      })
      Socket.init(url, options, (data) => {
        setSnackbar({
          open: true,
          component:
            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
              Connected to {url}
            </Alert>
        })
        setConnection({
          status: 'connected',
          data
        })
      }, (error) => {
        setSnackbar({
          open: true,
          component:
            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
        })
        setConnection({
          status: 'disconnected',
          data: {
            id: '',
            url: '',
            options: {},
            listeners: []
          }
        })
      })
    }
    catch (err) {
      setSnackbar({
        open: true,
        component:
          <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
            {err.toString()}
          </Alert>
      })
    }
  }

  const onError = (err) => {
    setSnackbar({
      open: true,
      component:
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
    })
  }

  const onSuccess = (msg) => {
    setSnackbar({
      open: true,
      component:
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          {msg}
        </Alert>
    })
  }

  const onDisconnect = (url) => {
    Socket.disconnect()
    setSnackbar({
      open: true,
      component:
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Disconnected from {url}
        </Alert>
    })
    setConnection({
      status: 'disconnected',
      data: {
        id: '',
        url: '',
        options: {},
        listeners: []
      }
    })
  }

  const onAddListener = (listener) => {
    setConnection({
      status: connection.status,
      data: {
        id: connection.data.id,
        url: connection.data.url,
        options: connection.data.options,
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
        options: connection.data.options,
        listeners: connection.data.listeners.filter(item => item.name !== listener)
      }
    })

    Socket.removeListener(listener, (listener, data) => {
      setMessages([...messages, { listener, msg: JSON.stringify(data, undefined, 4) }])
    })
  }

  const onEmit = (emission, msg) => {
    try {
      if (replacer(msg).charAt(0) === '{' || replacer(msg).charAt(0) === '[')
        msg = JSON.parse(replacer(msg))
      Socket.emit(emission, msg)
      setSnackbar({
        open: true,
        component:
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
            Emitted event successfully
          </Alert>
      })
    }
    catch (err) {
      setSnackbar({
        open: true,
        component:
          <Alert onClose={handleAlertClose} severity="error" sx={{ width: '100%' }}>
            {err.toString()}
          </Alert>
      })
    }
  }

  const onSettingsUpdate = (settings) => {
    Socket.setSettings(settings)
    setSnackbar({
      open: true,
      component:
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Updated Socketeer settings
        </Alert>
    })
  }

  const onClear = () => {
    LocalStorage.clear()
    setSnackbar({
      open: true,
      component:
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Successfully cleared history
        </Alert>
    })
  }

  const onLoad = (id) => {
    LocalStorage.setCurrent(id)
    let history = LocalStorage.query((history) => history.id === id)
    onConnect(history.url, history.options)
    setTabIndex(0)
    setEsc({
      url: history.url.split('//')[1],
      protocol: history.url.split(':')[0],
      options: JSON.stringify(JSON.parse(replacer(history.options)), undefined, 4)
    })
  }

  const handleTabChanged = (index) => {
    setTabIndex(index)
  }

  const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Settings
        status={connection.status}
        onUpdate={onSettingsUpdate}
      /> */}
      <Snackbar
        key={Math.random()}
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        TransitionComponent={SlideTransition}
      /* sx={{ background: theme.palette.success }} */
      >
        {snackbar.component}
      </Snackbar>
      <Donation
        open={donation}
        onClose={onDonationClosed}
      />
      <Header
        onTabChanged={handleTabChanged}
        activeTab={tabIndex}
        onDonateClicked={handleDonationDialog}
      />
      <Container
        maxWidth='xl'
        className='h-50 py-3'
      >
        {tabIndex === 0 &&
          <Connection
            onConnect={onConnect}
            listeners={connection.data.listeners}
            status={connection.status}
            onAddListener={onAddListener}
            onRemoveListener={onRemoveListener}
            onDisconnect={onDisconnect}
            onError={onError}
            onSuccess={onSuccess}
            esc={esc}
          />
        }
        {tabIndex === 1 &&
          <Emission
            onEmit={onEmit}
          />
        }
        {tabIndex === 2 &&
          <History
            histories={JSON.parse(LocalStorage.get(keys.histories))}
            onClear={onClear}
            onLoad={onLoad}
          />
        }
      </Container>
      {
        tabIndex < 2 &&
        <Server messages={messages} />
      }
      <Status status={connection.status} data={connection.data} />
      <Footer />
    </ThemeProvider>
  )
}

export default App;
