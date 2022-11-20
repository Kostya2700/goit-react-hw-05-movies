import { searchMovieName } from 'Api/api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movie, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');
  // console.log('Movies ~ names', name);
  useEffect(() => {
    if (name === '' || name === null) return;
    searchMovieName(name).then(resp => {
      // console.log(resp);
      if (resp.length === 0) return console.log('Film not defined');
      setMovies([...resp]);
    });
  }, [name]);

  const handleSearch = e => {
    setSearch(e.currentTarget.value.toLowerCase());
    const name = e.target.value;
    const nextParams = name !== '' ? { name } : {};
    setSearchParams(nextParams);
  };

  const changeSubmit = e => {
    e.preventDefault();
    setSearch('');
    if (search.trim() === '') return;
    searchMovieName(search)
      .then(res => {
        if (res.length === 0) {
          console.log('no');
          return;
        }
        setMovies([...res]);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <form onSubmit={changeSubmit}>
        <label>
          <input
            type="text"
            placeholder="Search movies"
            onChange={handleSearch}
            value={search}
          />
        </label>
      </form>
      <ul>
        {movie?.map(({ id, name, title }) => {
          return (
            <li key={id}>
              <Link
                to={`/movies/${id}`}
                state={{ from: location.pathname + location.search }}
              >
                {name || title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Movies;
