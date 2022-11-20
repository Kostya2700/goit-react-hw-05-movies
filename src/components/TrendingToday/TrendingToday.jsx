import { Link } from 'react-router-dom';

export const TrendingToday = ({ movieDay }) => {
  return (
    <div>
      <h2>Trending today</h2>
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
    </div>
  );
};
