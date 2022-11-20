import { fetchMovieId } from 'Api/api';
import { imgPicture } from 'Image/Image';
import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieId(id).then(resp => {
      setMovie(resp);
    });
  }, [id]);

  const genres = arrGenres => {
    if (arrGenres === null) return;
    return arrGenres?.map(genre => genre.name).join(', ');
  };
  const useScore = value => {
    return String(value).slice(0, 3);
  };
  const onGoBack = e => {
    e.preventDefault();
    const back = location?.state?.from ?? '/';
    return navigate(back);
  };
  return (
    <div>
      <div>
        <Link onClick={onGoBack}>Back</Link>
      </div>
      <div className="imgmovie">
        <img src={imgPicture(movie.poster_path)} alt="" width="300px" />
        <div>
          <h2>{movie.title}</h2>
          <p>
            <b>Use score </b>: {useScore(movie.vote_average)}
          </p>
          <p>
            <b>Overview</b> : {movie.overview}
          </p>
          <p>
            <b>Genres</b> : {genres(movie.genres)}
          </p>
        </div>
      </div>
      <ul>
        <li>
          <Link to={`/movies/${movie.id}/cast`} state={location.state}>
            Cast
          </Link>
        </li>
        <li>
          <Link to={`/movies/${movie.id}/reviews`} state={location.state}>
            Reviews
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default MovieDetails;
