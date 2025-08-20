import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
      } else {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const user = auth.currentUser;
      if (!user || !userData) {
        setError('Debes iniciar sesión para crear un post');
        return;
      }

      await addDoc(collection(db, 'posts'), {
        content,
        authorId: user.uid,
        authorName: `${userData.nombre} ${userData.apellido}`,
        authorEmail: user.email,
        createdAt: serverTimestamp()
      });

      setContent('');
      navigate('/');
    } catch (error) {
      setError('Error al crear el post: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={
            userData ? `¿Qué estás pensando, ${userData.nombre}?` : 'Cargando...'
          }
          rows="3"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
