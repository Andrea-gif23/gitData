import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/githubSlice';

function App() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.github);

  const handleSearch = () => {
    if (username.trim()) {
      dispatch(fetchUser(username));
    }
  };

  return (
    <div className="app">
      <h1>Buscador de GitHub</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de usuario"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {error && <p className="error">Error: {error}</p>}

      {userData && (
        <div className="user-card">
          <img src={userData.avatar_url} alt="Avatar" />
          <h2>{userData.name || userData.login}</h2>
          <p>@{userData.login}</p>
          <p>Seguidores: {userData.followers}</p>
          <p>Repositorios públicos: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default App;