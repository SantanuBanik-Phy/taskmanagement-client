import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const AuthLayout = () => {
    return (
        <div className='bg-[#F3f3f3]'>
            <header >
                <Navbar></Navbar>
            </header>
          
            <Outlet></Outlet>

            <Footer></Footer>
        </div>

    );
};

export default AuthLayout;