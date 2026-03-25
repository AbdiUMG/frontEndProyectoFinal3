import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginEmpleado } from './authSlice';

import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export const Login = () => {
  const [credenciales, setCredenciales] = useState({ usuario: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, usuario } = useSelector((state) => state.auth);

  useEffect(() => {
    if (usuario) {
      navigate('/home');
    }
  }, [usuario, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginEmpleado(credenciales));
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f5f5f5', 
        padding: 3 
      }}
    >

      <Container component="main" maxWidth="xs" disableGutters>
        
        {/* Cabecera del formulario */}
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          mb={5} 
        >
          {/* Icono azul oscuro */}
          <LoginIcon sx={{ fontSize: 48, mb: 1.5, color: '#1976d2' }} />
          
          {/* Título oscuro y perfectamente legible */}
          <Typography 
            component="h1" 
            variant="h4" 
            fontWeight="700" 
            color="#1a1a1a" 
            sx={{ letterSpacing: 0.5 }}
          >
            Iniciar Sesión
          </Typography>
        </Box>

        {/* Formulario HTML nativo */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Campo de Usuario */}
          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined" // Estilo de borde estándar y limpio
            id="usuario"
            label="Usuario"
            name="usuario"
            autoComplete="username"
            autoFocus
            value={credenciales.usuario}
            onChange={handleChange}
            disabled={status === 'loading'}
            sx={{ backgroundColor: '#ffffff', borderRadius: 1, mb: 2 }} 
          />
          
          {/* Campo de Contraseña */}
          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credenciales.password}
            onChange={handleChange}
            disabled={status === 'loading'}
            sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
          />

          {/* Alerta de Error integrada en el flujo */}
          {status === 'failed' && (
            <Alert severity="error" variant="filled" sx={{ mt: 3, borderRadius: 1.5 }}>
              Usuario o contraseña incorrectos
            </Alert>
          )}

          {/* Botón de Ingreso */}
          <Button
            type="submit"
            fullWidth
            variant="contained" 
            size="large"
            disabled={status === 'loading'}
            sx={{ 
              mt: 5, 
              mb: 3, 
              py: 1.8, 
              fontSize: '1.1rem', 
              fontWeight: '600',
              borderRadius: 2, 
              boxShadow: 'none', 
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#1565c0' 
              }
            }}
          >
            {status === 'loading' ? <CircularProgress size={26} color="inherit" /> : 'INGRESAR'}
          </Button>
        </Box>

      </Container>
    </Box>
  );
};