import React from 'react';



import { Outlet } from 'react-router-dom';


import Navbar from '../Components/Navbar';


const HomeLayout = () => {
   
    return (
      
        <div>
          
      
     
      <nav className=" sticky top-0 z-50  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60   dark:bg-gray-900 dark:text-white ">
        <Navbar></Navbar>
      </nav>
      
       
      <div className='min-h-[calc(100vh-100px)] '>
        {/* Dynamic Section */}
        <Outlet />
      </div>
     


    
     
     
        </div>
    );
};

export default HomeLayout;