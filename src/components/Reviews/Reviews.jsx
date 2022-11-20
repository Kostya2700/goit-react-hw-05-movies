import { fetchReviews } from 'Api/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchReviews(id)
      .then(resp => {
        setReviews(resp);
      })
      .catch(e => console.log(e));
  }, [id]);
  return (
    <ul>
      {reviews.length === 0 && <h3>No reviews</h3>}
      {reviews &&
        reviews.map(({ author, id, content }) => {
          return (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          );
        })}
    </ul>
  );
};
export default Reviews;
