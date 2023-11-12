import { Outlet, Link } from "react-router-dom";

const Root: React.FC = () => {
  return (
    <div>
      <Link to="/apple">Apple</Link>
      <Link to="/banana">Banana</Link>
      <Outlet />
    </div>
  );
};

export default Root;
