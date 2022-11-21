import { searchMovieName } from 'Api/api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Blocks } from 'react-loader-spinner';

const Movies = () => {
  const [movie, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const nameMovies = searchParams.get('search');
  // console.log('Movies ~ names', name);
  useEffect(() => {
    if (nameMovies === '' || nameMovies === null) return;
    const asyncSearchMovies = async () => {
      try {
        const respMovies = await searchMovieName(nameMovies);
        if (respMovies.length === 0) return;
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
    setMovies([]);
    if (search.trim() === '')
      return toast.warn('Please write correct movie name');
    const onSearchMovies = async () => {
      try {
        setLoader(true);
        const response = await searchMovieName(search);
        if (response.length === 0) {
          toast.warn('This movie not found');
          return;
        }
        setMovies([...response]);
      } catch (error) {
        console.log('onSearchMovies ~ error', error);
      } finally {
        setLoader(false);
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
      {loader && (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      )}
    </>
  );
};
export default Movies;
