import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Panel Principal</h1>
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
        <h2>Bienvenido, {usuario.nombre}</h2>
        <p><strong>Departamento:</strong> {usuario.departamento}</p>
        <p><strong>Token:</strong> {usuario.token}</p>
      </div>
      
      <button 
        onClick={() => dispatch(logout())} 
        style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};