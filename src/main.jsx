import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layouts from './Layouts';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import { ThemeProvider } from './contexts/theme';
import { TaskProvider } from './contexts/TaskContext';

function Main() {
  const [themeMode, setThemeMode] = useState('light');
  const darkTheme = () => setThemeMode('dark');

  const lightTheme = () => setThemeMode('light');

  useEffect(() => {
    document.querySelector('html').classList.remove('dark', 'light');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </ThemeProvider>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layouts />}>
      <Route path='' element={<Dashboard />} />
      <Route path='task' element={<Task />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
