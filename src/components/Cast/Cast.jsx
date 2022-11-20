import { fetchCast } from 'Api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchCast(id).then(resp => {
      setCast(resp);
    });
  }, [id]);
  const imgPicture = path => {
    if (path === null) {
      return `${`https://via.placeholder.com/960x240`}`;
    }

    return `https://image.tmdb.org/t/p/w300${path}`;
  };
  return (
    <ul className="castsList">
      {cast &&
        cast.map(({ cast_id, character, original_name, profile_path }) => {
          return (
            <li key={cast_id}>
              <img
                src={imgPicture(profile_path)}
                alt=""
                width="150px"
                height="150px"
              />
              <p>{character}</p>
              <p>{original_name}</p>
            </li>
          );
        })}
      {cast.length === 0 && <h3>No cast</h3>}
    </ul>
  );
};
export default Cast;
