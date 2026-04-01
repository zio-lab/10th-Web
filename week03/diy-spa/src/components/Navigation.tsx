import Link from '../router/Link';

const Navigation = () => {
  return (
    <nav className="mb-8 flex flex-wrap gap-3 border-b border-gray-200 pb-4">
      <Link to="/" hoverColor="hover:text-blue-600">Home</Link>
      <Link to="/about" hoverColor="hover:text-green-600">About</Link>
      <Link to="/contact" hoverColor="hover:text-purple-600">Contact</Link>
      <Link to="/unknown" hoverColor="hover:text-red-500">404 Test</Link>
    </nav>
  );
};

export default Navigation;