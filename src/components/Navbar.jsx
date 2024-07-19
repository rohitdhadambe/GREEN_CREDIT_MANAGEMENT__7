import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return handleSignOut;
};

const Navbar = ({ user }) => {
  const handleSignOut = useSignOut();

  return (
    <nav className="bg-gray-800 p-4 text-white shadow-lg rounded-e-lg rounded-s-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold color-blue-700">GREEN CREDIT MANAGEMENT</h1>

        {user ? (
          <div>
            <span className="mr-4">HEY..! WELCOME, {user.displayName || user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-lg"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <span className="mr-4">Not logged in</span>
            <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-lg shadow-lg">
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
