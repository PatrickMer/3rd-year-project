import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Box } from '@mui/material';
import theme from './theme';
import StudentView from './pages/StudentView';
import TeacherView from './pages/TeacherView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ marginRight: '1rem', color: 'white', textDecoration: 'none' }}>Student</Link>
              <Link to="/teacher" style={{ color: 'white', textDecoration: 'none' }}>Teacher</Link>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap' }}>
              LangFlow Demo
            </Typography>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/teacher" element={<TeacherView />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
