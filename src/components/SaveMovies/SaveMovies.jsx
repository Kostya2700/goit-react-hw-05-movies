import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const SaveMovies = () => {
  const [openLocal, setOpenLocal] = useState(null);
  const location = useLocation();

  useEffect(() => {
    try {
      const checkWatch = JSON.parse(window.localStorage.getItem('movie'));
      setOpenLocal(checkWatch);
    } catch (error) {
      console.log('useEffect ~ error', error);
    }
  }, []);

  return (
    <div>
      <h1>Saving movies</h1>
      {openLocal && openLocal.length === 0 && <p>no save movies</p>}
      {openLocal && (
        <ul>
          {openLocal?.map(md => {
            return (
              <li key={md.id}>
                <Link
                  to={`/movies/${md.id}`}
                  state={{ from: location.pathname + location.search }}
                >
                  {md.name || md.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
