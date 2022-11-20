import { fetchCast } from 'Api/api';
import { imgPicture } from 'Image/Image';
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

  return (
    <ul className="castsList">
      {cast.length === 0 && <h3>No cast</h3>}
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
    </ul>
  );
};
export default Cast;
