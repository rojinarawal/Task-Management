import React from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layouts() {
  return (
    <>
      <div className='flex h-screen w-screen'>
        <Sidebar />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
