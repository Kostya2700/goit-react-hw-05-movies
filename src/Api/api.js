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
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${keyUrl}&language=en-US`
  );
  return response.data.cast;
};
export const fetchReviews = async id => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${keyUrl}&language=en-US&page=1`
  );
  return response.data.results;
};
export const searchMovieName = async query => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${keyUrl}&language=en-US&page=1&include_adult=false`
  );
  return response.data.results;
};
