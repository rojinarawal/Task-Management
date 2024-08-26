import { NavLink } from 'react-router-dom';
import ThemeBtn from './ThemeBtn';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';
import { SiTask } from 'react-icons/si';
import React, { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  // Define the menu array
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: MdSpaceDashboard },
    { name: 'Tasks', path: '/task', icon: SiTask },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 min-h-screen ${
        open ? 'w-56' : 'w-20'
      } shadow-lg dark:border-none bg-lightmainCompBg dark:bg-sidebarBg z-50`}
    >
      <div className='py-3 px-3 flex justify-end'>
        <HiMenuAlt3
          size={26}
          className='cursor-pointer dark:text-white'
          onClick={() => setOpen(!open)}
        />
      </div>

      <div className=' mt-14 pr-8'>
        <ul className='flex flex-col gap-3 relative'>
          {/* Map over the menuItems array */}
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-8 py-2 border-r rounded-r-full border-none ${
                    isActive
                      ? 'text-white bg-navPrimary'
                      : 'hover:text-white hover:bg-navPrimary dark:text-white'
                  }`
                }
              >
                <div className='flex items-center gap-2'>
                  <div>{React.createElement(item.icon, { size: '20' })}</div>
                  <h2
                    style={{
                      transition: open
                        ? 'opacity 0.5s ease, transform 0.5s ease'
                        : 'none',
                      transitionDelay: open ? `${(index + 3) * 100}ms` : 'none',
                      opacity: open ? 1 : 0,
                      transform: open ? 'translateX(0)' : 'translateX(20px)',
                    }}
                    className={`ml-2 whitespace-pre duration-500 ${
                      !open && 'opacity-0 translate-x-28 overflow-hidden'
                    } `} // Add margin to separate icon from text
                  >
                    {item.name}
                  </h2>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
        <ThemeBtn />
      </div>
    </aside>
  );
}
