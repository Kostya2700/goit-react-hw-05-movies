import { fetchApiTrendingDay } from 'Api/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movieDay, setMovieDay] = useState([]);
  useEffect(() => {
    const asyncAp = async () => {
      try {
        const response = await fetchApiTrendingDay();
        console.log('asyncAp ~ response', response);

        return setMovieDay([...response]);
      } catch (error) {
        console.log(error);
      }
    };
    asyncAp();
  }, []);
  return (
    <>
      <ul>
        {movieDay?.map(md => {
          return (
            <li key={md.id}>
              <Link to={`/movies/${md.id}`} state={{ from: '/' }}>
                {md.name || md.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Home;
