import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to homepage after signing out
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return handleSignOut;
};

const Navbar = ({ user }) => {
  const handleSignOut = useSignOut();

  return (
    <nav className="bg-gray-800 text-white py-4 border-b-4 border-green-500 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">GREEN CREDIT MANAGEMENT</h1>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="mr-4">HEY..! WELCOME, {user.displayName || user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="mr-4">Not logged in</span>
            <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg">
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
