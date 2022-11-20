import { Link, useLocation } from 'react-router-dom';

export const Button = ({ children }) => {
  const { state } = useLocation();
  if (!state?.from) {
    return null;
  }
  return <Link to={state.from}>{children}</Link>;
};
