import { fetchMovieId } from 'Api/api';
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
  console.log(movie);
  const { id } = useParams();
  const location = useLocation();
  console.log(location);
  const navigat = useNavigate();
  console.log('MovieDetails ~ navigat', navigat);

  useEffect(() => {
    fetchMovieId(id).then(resp => {
      setMovie(resp);
    });
  }, [id]);
  const imgPicture = path => {
    if (path === null) {
      return `${`https://via.placeholder.com/960x240`}`;
    }
    return `https://image.tmdb.org/t/p/w300${path}`;
  };
  const genres = arr => {
    if (arr === null) return;
    return arr?.map(genre => genre.name).join(', ');
  };
  return (
    <div>
      <div>
        <Link>Back</Link>
      </div>
      <img src={imgPicture(movie.poster_path)} alt="" />
      <div>
        <h2>{movie.title}</h2>
        <p>
          <b>Use score </b>: {movie.vote_average}
        </p>
        <p>
          <b>Overview</b> : {movie.overview}
        </p>
        <p>
          <b>Genres</b> : {genres(movie.genres)}
        </p>
      </div>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default MovieDetails;
// import { useParams } from "react-router-dom";
// import { getProductById } from "../fakeAPI";

// export const ProductDetails = () => {
//   const { id } = useParams();
//   const product = getProductById(id);
//   return (
//     <main>
//       <img src="https://via.placeholder.com/960x240" alt="" />
//       <div>
//         <h2>
//           Product - {product.name} - {id}
//         </h2>
//         <p>
//           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
//           sunt excepturi nesciunt iusto dignissimos assumenda ab quae cupiditate
//           a, sed reprehenderit? Deleniti optio quasi, amet natus reiciendis
//           atque fuga dolore? Lorem, ipsum dolor sit amet consectetur adipisicing
//           elit. Impedit suscipit quisquam incidunt commodi fugiat aliquam
//           praesentium ipsum quos unde voluptatum?
//         </p>
//       </div>
//     </main>
//   );
// };
{
  /* <ul className={css.movieDetails__listLink}>
        <li className={css.movieDetails__itemLink}>
          <LinkEl
            to={`/movies/${movie.id}/cast`}
            state={location.state}
            className={css.movieDetails__link}
            onClick={onClickLink}
          >
            Cast
          </LinkEl>
        </li>
        <li className={css.movieDetails__itemLink}>
          <LinkEl
            to={`/movies/${movie.id}/reviews`}
            state={location.state}
            className={css.movieDetails__link}
            onClick={onClickLink}
          >
            Reviews
          </LinkEl>
        </li>
      </ul> */
}
