export const imgPicture = path => {
  if (path === null || path === undefined) {
    return `${`https://via.placeholder.com/960x240`}`;
  }

  return `https://image.tmdb.org/t/p/w300${path}`;
};
