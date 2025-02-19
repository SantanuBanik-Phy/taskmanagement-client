// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold mb-2 md:mb-0">Task Manager</Link>
                
                <div className="flex items-center">
                  
                    {user ? (
                        <>
                            <span className="text-white mr-4">{user?.displayName}</span>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-white mr-4">Login</Link>  
                    )}
                    <Link to="/" className="text-white mr-4">Home</Link>
                    <Link to="/about" className="text-white">About</Link>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;