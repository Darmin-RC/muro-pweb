import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">Muro <span className="text-red-500">2024-0170</span></Link>
          <div className="flex space-x-4">
            {user ? (
              <>
                <Link to="/create" className="text-gray-700 hover:text-indigo-600">Crear Post</Link>
                <button
                  onClick={() => auth.signOut()}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Iniciar Sesión</Link>
                <Link to="/register" className="text-gray-700 hover:text-indigo-600">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}