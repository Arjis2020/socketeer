import './App.css';
import { ThemeProvider, createTheme, createStyles } from '@mui/material/styles';
import { Button, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Connection from './components/Connection';
import Server from './components/Server';
import Status from './components/Status';
import Footer from './components/Footer';

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
  return (
    <div style={styles.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Connection />
        <Server messages={[{ title: 'prices-update', msg: JSON.stringify({ 'bitcoin': '151412', 'ethereum': '151412' }, undefined, 4) }]} />
        <Status status='disconnected'/>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default App;
