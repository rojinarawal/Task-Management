import React, { useEffect, useMemo, useRef, useState } from 'react';
import totalicon from '/src/assets/totalicon.png';
import taskCompleted from '/src/assets/taskCompleted.png';
import { IoSearchSharp } from 'react-icons/io5';
import { useTasks } from '../contexts/TaskContext';
import { FcTodoList } from 'react-icons/fc';

const Dashboard = () => {
  const { tasks, setTasks } = useTasks();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [setTasks]);

  //filter tasks based on search query
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  // Handle selecting a task from dropdown
  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setSearchQuery(task.title);
    setShowSuggestions(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedTask(null);
    setShowSuggestions(true); // Show suggestions dropdown
  };

  //Handle clicks outside the dropdown and input
  useEffect(() => {
    const handleDropDown = (e) => {
      if (
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleDropDown);
    return () => {
      document.removeEventListener('mousedown', handleDropDown);
    };
  }, []);

  const TotalCompletedCount = useMemo(
    () => tasks.filter((task) => task.status === 'Completed').length,
    [tasks]
  );

  const TodoListCount = useMemo(
    () => tasks.filter((task) => task.status === 'To Do').length,
    [tasks]
  );

  const InProgressCount = useMemo(
    () => tasks.filter((task) => task.status === 'In Progress').length,
    [tasks]
  );

  return (
    <div className='mx-16'>
      {/* Search Input Container */}
      <section className='ml-2 p-6 border-b dark:border-darkBorder shadow bg-white dark:bg-bgPrimary dark:text-white'>
        <div className='flex justify-end items-center mb-4'>
          <div className='w-full max-w-[400px] px-4 relative'>
            <input
              type='text'
              placeholder='Search tasks'
              className='w-full h-10 shadow p-4 rounded-full dark:bg-sidebarBg dark:text-white focus:outline-none'
              ref={inputRef}
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button type='submit'>
              <IoSearchSharp className='absolute top-2 right-8 w-6 h-6 dark:text-purple-700' />
            </button>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredTasks.length > 0 && (
              <ul
                ref={dropdownRef}
                className='absolute z-10 w-full bg-white dark:bg-sidebarBg rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto'
              >
                {filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className='p-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer'
                    onClick={() => handleSelectTask(task)}
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Display Selected Task Details */}
      {selectedTask ? (
        <div className='flex flex-wrap mx-16 mt-10 gap-4'>
          <section className='w-full lg:w-[50%] min-w-[200px] bg-lightmainCompBg dark:bg-sidebarBg p-4'>
            <h1 className='font-bold text-xl dark:text-white text-center'>
              {selectedTask.title}
            </h1>
            <hr className='w-full border dark:border-darkBorder my-4' />
            <div className='p-4 rounded-lg bg-lightStatBg dark:bg-summaryStatusBg  dark:text-white space-y-2'>
              <h3 className='font-medium text-lg'>{selectedTask.title}</h3>
              <p className='text-sm'>{selectedTask.description}</p>
              <p className='text-sm text-gray-500 dark:text-gray-300'>
                {selectedTask.date}
              </p>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                Priority: {selectedTask.priority}
              </p>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                Status: {selectedTask.status}
              </p>
            </div>
          </section>
        </div>
      ) : (
        <div className='flex flex-wrap mx-16 mt-6 gap-6'>
          <div className='flex-1 flex flex-col items-center gap-6'>
            {/* Main Components */}
            <section className='bg-lightmainCompBg dark:bg-sidebarBg p-4 py-6 sm:w-[40%] md:w-[60%] lg:w-[80%] min-w-[300px] '>
              <div className='flex flex-wrap justify-evenly gap-4'>
                {/* Total Tasks */}
                <div className='w-full lg:w-[45%] min-w-[200px] px-4 py-5 rounded-md bg-lightStatBg dark:bg-summaryStatusBg flex items-center justify-between'>
                  <div className='flex flex-col'>
                    <span className='font-bold text-lg sm:text-2xl dark:text-white'>
                      {tasks.length}
                    </span>
                    <span className='font-400 text-sm sm:text-[14px] dark:text-white'>
                      Total Tasks
                    </span>
                  </div>
                  <img
                    src={totalicon}
                    alt=''
                    className='h-8 w-8 sm:h-10 sm:w-10'
                  />
                </div>

                {/* Task Completed */}
                <div className='w-full lg:w-[45%] min-w-[200px] px-4 py-5 rounded-md bg-lightStatBg dark:bg-summaryStatusBg flex items-center justify-between'>
                  <div className='flex flex-col'>
                    <span className='font-bold text-lg sm:text-2xl dark:text-white'>
                      {TotalCompletedCount}
                    </span>
                    <span className='font-400 text-sm sm:text-[14px] dark:text-white'>
                      Task Completed
                    </span>
                  </div>
                  <img
                    src={taskCompleted}
                    alt=''
                    className='h-8 w-8 sm:h-10 sm:w-10'
                  />
                </div>
              </div>
            </section>

            {/* To Do List */}
            <section className='sm:w-[40%] md:w-[50%] lg:w-[50%] min-w-[300px] bg-lightmainCompBg dark:bg-sidebarBg p-4'>
              <h1 className='font-bold text-xl dark:text-white text-center'>
                To Do: {TodoListCount}
              </h1>
              <hr className='w-full  border dark:border-darkBorder my-4' />
              <div className='flex flex-wrap gap-4 space-y-2'>
                {tasks
                  .filter((task) => task.status === 'To Do')
                  .map((task) => (
                    <div
                      key={task.id}
                      className='w-full min-w-[200px] px-4 py-5 rounded-lg bg-lightStatBg dark:bg-summaryStatusBg'
                    >
                      <h3 className='font-medium text-lg dark:text-white'>
                        {task.title}
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-300'>
                        {task.date}
                      </p>
                      <p className='text-sm text-gray-700 dark:text-gray-300'>
                        Priority: {task.priority}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          </div>

          {/* In Progress */}
          <section className='sm:w-[40%] md:w-[25%] lg:w-[25%] min-w-[300px] bg-lightmainCompBg dark:bg-sidebarBg p-4 h-fit '>
            <h1 className='font-bold text-xl text-center dark:text-white'>
              In Progress: {InProgressCount}
            </h1>
            <hr className='border dark:border-darkBorder my-4' />
            <div className='flex flex-col gap-4 space-y-2'>
              {tasks
                .filter((task) => task.status === 'In Progress')
                .map((task) => (
                  <div
                    key={task.id}
                    className='w-full min-w-[200px] px-4 py-5 rounded-lg bg-lightStatBg dark:bg-summaryStatusBg dark:text-white'
                  >
                    <h3 className='font-medium text-lg dark:text-white'>
                      {task.title}
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-300'>
                      {task.date}
                    </p>
                    <p className='text-sm text-gray-700 dark:text-gray-300'>
                      Priority: {task.priority}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
