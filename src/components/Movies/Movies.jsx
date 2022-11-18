import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');
  const changeSubmit = e => {
    e.preventDefault();
    setSearchParams(e.target.value);
  };
  return (
    <>
      <form onSubmit={changeSubmit}>
        <label>
          <input type="text" value={name} onChange={changeSubmit} />
        </label>
      </form>
    </>
  );
};
export default Movies;
