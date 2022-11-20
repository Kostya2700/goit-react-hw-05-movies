import { fetchApiTrendingDay } from 'Api/api';
import { TrendingToday } from 'components/TrendingToday/TrendingToday';
import { useEffect, useState } from 'react';

const Home = () => {
  const [movieDay, setMovieDay] = useState([]);
  useEffect(() => {
    const asyncAp = async () => {
      try {
        const response = await fetchApiTrendingDay();
        return setMovieDay([...response]);
      } catch (error) {
        console.log(error);
      }
    };
    asyncAp();
  }, []);
  return <TrendingToday movieDay={movieDay} />;
};
export default Home;
