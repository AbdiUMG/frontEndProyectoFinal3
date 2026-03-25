import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Creamos el Thunk para manejar la petición asíncrona a la API REST
export const loginEmpleado = createAsyncThunk(
  'auth/login',
  async (credenciales, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (credenciales.usuario === 'admin' && credenciales.password === '1234') {
        return {
          id: 101,
          nombre: 'Abdi',
          departamento: 'Operaciones Comerciales',
          token: 'token-simulado-xyz123'
        };
      } else {
        return rejectWithValue('Usuario o contraseña incorrectos');
      }
    } catch { 
      return rejectWithValue('Error al conectar con el servidor');
    }
  }
);

// 2. Creamos el Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    usuario: null,      // Aquí guardaremos los datos del empleado cuando se loguee
    status: 'idle',     // Estados posibles: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.usuario = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmpleado.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginEmpleado.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usuario = action.payload; 
      })
      .addCase(loginEmpleado.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;