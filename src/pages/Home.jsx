import TaskList from "../components/TaskList";
import { useAuth } from "../provider/AuthProvider";
import googleImage from "../assets/google.png";

const Home = () => {
  const { user, signInWithGoogle, logOut } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-600 to-yellow-300 p-4">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
    <h2 className="text-3xl font-bold text-gray-700 mb-6">Welcome to Task Management</h2>
    <p className="text-gray-500 mb-4">Sign in to manage your tasks efficiently.</p>
    <button
      onClick={signInWithGoogle}
      className="bg-gray-400 hover:bg-blue-700 text-white font-bold btn rounded-lg transition duration-300 flex items-center justify-center mx-auto"  // Center the button horizontally
    >
      <img src={googleImage} className="w-6 h-6 mr-2" alt="Google logo" />
      Sign in with Google
    </button>
  </div>
</div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-600 to-yellow-300 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-semibold text-gray-800">Task Management</h1>
          <p className="text-lg text-gray-600 mt-2">Welcome, {user?.displayName}!</p>
        </div>

        {/* Task List Component */}
        <TaskList />

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={logOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
