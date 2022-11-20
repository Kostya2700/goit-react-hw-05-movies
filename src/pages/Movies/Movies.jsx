import { searchMovieName } from 'Api/api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movie, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const nameMovies = searchParams.get('search');
  // console.log('Movies ~ names', name);
  useEffect(() => {
    if (nameMovies === '' || nameMovies === null) return;
    const asyncSearchMovies = async () => {
      try {
        const respMovies = await searchMovieName(nameMovies);
        if (respMovies.length === 0) return console.log('Film not defined');
        return setMovies(p => [...respMovies]);
      } catch (e) {
        console.log(e);
      }
    };
    asyncSearchMovies();
  }, [nameMovies]);

  const handleSearch = e => {
    setSearch(e.currentTarget.value.toLowerCase());
    // const name = e.target.value;
    // const nextParams = name !== '' ? { search } : {};
    // setSearchParams(nextParams);
  };

  const changeSubmit = e => {
    e.preventDefault();
    setSearch('');
    if (search.trim() === '') return;
    const onSearchMovies = async () => {
      try {
        const response = await searchMovieName(search);
        if (response.length === 0) {
          console.log('no');
          return;
        }
        setMovies([...response]);
      } catch (error) {
        console.log('onSearchMovies ~ error', error);
      }
    };
    onSearchMovies();
    setSearchParams({ search: search });
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
        <button type="submit">Search</button>
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
