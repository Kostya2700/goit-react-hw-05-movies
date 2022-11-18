import axios from 'axios';
const keyUrl = 'cd6074663c1122d2e2bdad2cd1a6c6f1';
export const fetchApiTrendingDay = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${keyUrl}`
  );
  return response.data.results;
};

export const fetchMovieId = async id => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${keyUrl}&language=en-US`
  );
  return response.data;
};
export const fetchCast = async id => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits??api_key=${keyUrl}&language=en-US`
  );
  return response;
};
