import { Container, Typography, Box, Button, Grid } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) => `linear-gradient(45deg, 
            ${theme.palette.mode === 'dark' ? '#1e293b' : '#f8fafc'} 0%,
            ${theme.palette.mode === 'dark' ? '#334155' : '#f1f5f9'} 100%)`,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)',
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: (theme) => theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #60a5fa, #818cf8)'
                      : 'linear-gradient(45deg, #3b82f6, #6366f1)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  Organize Your Tasks
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: '600px' }}
                >
                  Streamline your productivity with our intuitive todo application.
                  Stay organized and accomplish more.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    component={Link}
                    to="/add-todo"
                    variant="contained"
                    size="large"
                    startIcon={<TaskAltIcon />}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      py: 1.5,
                      px: 4,
                      background: 'linear-gradient(45deg, #3b82f6, #6366f1)',
                      boxShadow: '0 4px 14px 0 rgba(99,102,241,0.39)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2563eb, #4f46e5)',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)',
                    borderRadius: '50%',
                  }
                }}
              >
                <Box
                  component="img"
                  src="/task-management.svg"
                  alt="Task Management"
                  sx={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.2))',
                    transform: 'perspective(1000px) rotateY(-10deg) rotateX(5deg)',
                    transition: 'all 0.5s ease-in-out',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(-10px)',
                      filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.3))',
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home; 