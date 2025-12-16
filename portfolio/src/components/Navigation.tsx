import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/blog">Contacts</Link>
      </nav>
    </>
  );
};

export default Navigation;
