import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginEmpleado } from '../features/auth/authSlice';
import logoUMG from '../styles/images/logoUMG.png';

import {Box, Button, TextField, Typography, CircularProgress, Alert,Paper,InputAdornment,Divider
} from '@mui/material';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const Login = () => {
  const [credenciales, setCredenciales] = useState({ usuario: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, usuario } = useSelector((state) => state.auth);

  useEffect(() => {
    if (usuario) { navigate('/home');}
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
    <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #0a1f44 0%, #1d4a76 100%)',}}>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 3 } }}>
        <Paper elevation={6}  sx={{ padding: { xs: 3, sm: 4 }, width: '100%', maxWidth: 420, borderRadius: 3, 
            backgroundColor:'#ffffff', display:'flex', flexDirection:'column', alignItems:'center', height:'auto', }}>
          
          <Box component="img" src={logoUMG} alt="Logo"
            sx={{ height: 'auto', maxHeight: 90, width: 'auto', maxWidth: '100%', mb: 2,  objectFit: 'contain' }}
          />
          <Typography component="h1" variant="h5" fontWeight="bold"  color="#1a1a1a" mb={0.5}> Iniciar sesión </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={2} > Accede con tus credenciales </Typography>
          <Divider sx={{ width: '100%', mb: 3, borderColor: '#e0e0e0' }} />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField margin="none" required fullWidth variant="outlined" id="usuario" label="Usuario" name="usuario" autoComplete="username" autoFocus
              value={credenciales.usuario} onChange={handleChange} disabled={status === 'loading'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: '#757575' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }} 
            />
            
            <TextField margin="none" required fullWidth variant="outlined" name="password" label="Contraseña" type="password" id="password" autoComplete="current-password"
              value={credenciales.password} onChange={handleChange} disabled={status === 'loading'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#757575' }} />
                  </InputAdornment>
                ),
              }}
            />

            {status === 'failed' && (
              <Alert severity="error" variant="filled" sx={{ mt: 2, borderRadius: 1.5 }}>
                Usuario o contraseña incorrectos
              </Alert>
            )}

            <Button type="submit" fullWidth variant="contained" size="large" disabled={status === 'loading'}
              sx={{ mt:3, mb:1, py:1.5, fontWeight:'bold', borderRadius:2.5, backgroundColor:'#1976d2', '&:hover':{backgroundColor: '#1565c0' }}}>
              {status === 'loading' ? <CircularProgress size={26} color="inherit" /> : 'Ingresar'}
            </Button>
          </Box>
        </Paper>
      </Box>
      <Box sx={{pb: 2, width: '100%', textAlign: 'center' }} >
        <Typography variant="caption" color="rgba(255, 255, 255, 0.7)"> Copyright &copy; ABDI 2026 </Typography>
      </Box>

    </Box>
  );
};