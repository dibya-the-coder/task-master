import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAppSelector } from './store/hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import AddTodo from './pages/AddTodo';
import About from './pages/About';

function App() {
  const isDarkMode = useAppSelector((state) => state.theme.darkMode);

  const theme = createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none',
      },
    },
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#334155' : '#f8fafc',
        paper: isDarkMode ? '#1e293b' : '#ffffff',
      },
      primary: {
        main: isDarkMode ? '#0ea5e9' : '#0284c7',
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            textTransform: 'none',
          },
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/task-master" element={<Home />} />
                  <Route path="/todos" element={<TodoList />} />
                  <Route path="/add-todo" element={<AddTodo />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
