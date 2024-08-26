import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import { useTasks } from '../contexts/TaskContext';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const Task = () => {
  const { tasks, setTasks } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [sortKey, setSortKey] = useState('date'); // Default sort by date
  const [filterStatus, setFilterStatus] = useState(''); // Default: no filter
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingData, setEditingData] = useState({});

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // delete tasks
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //edit tasks
  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditingData(task);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...editingData } : task)));
    setEditingTaskId(null);
  };

  // Sort tasks based on sortKey
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortKey === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  // Filter tasks based on status
  const filteredTasks = filterStatus
    ? sortedTasks.filter((task) => task.status === filterStatus)
    : sortedTasks;

  const priorityClasses = {
    high: 'text-red-500 dark:text-red-400',
    medium: 'text-blue-500 dark:text-blue-200',
    low: 'text-yellow-500 dark:text-yellow-100',
  };

  return (
    <div className='ml-20'>
      <section className='ml-2 p-6 border-b dark:border-darkBorder shadow bg-white dark:bg-bgPrimary dark:text-white'>
        <div className='flex ml-4 gap-8'>
          <div>
            <h1 className='font-bold text-2xl'>Tasks</h1>
            <span className='text-gray-400'>{filteredTasks.length} tasks</span>
          </div>

          <div onClick={openModal} className='flex items-center justify-center'>
            <button
              className='text-white bg-navPrimary p-2 rounded-3xl font-medium text-sm'
              type='submit'
            >
              + Add New
            </button>
          </div>
        </div>
        {modalOpen && (
          <AddTask
            isOpen={modalOpen}
            onClose={closeModal}
            setOpen={setModalOpen}
            addTask={addTask}
          />
        )}
      </section>

      {/* Sorting and Filtering Options */}
      <div className='mx-16 mt-6'>
        <section>
          <div className='flex justify-between mb-4'>
            <div>
              <label htmlFor='sortKey' className='mr-2 dark:text-white'>
                Sort By:
              </label>
              <select
                id='sortKey'
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className='p-1 pr-10 rounded border border-gray-300 focus:outline-none dark:bg-sidebarBg dark:text-purple-400 dark:border-darkBorder'
              >
                <option value='date'>Date</option>
                <option value='title'>Title</option>
                <option value='priority'>Priority</option>
              </select>
            </div>

            <div>
              <label htmlFor='filterStatus' className='mr-2 dark:text-white'>
                Filter By Status:
              </label>
              <select
                id='filterStatus'
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className='p-1 pr-10 rounded border border-gray-300 focus:outline-none  dark:bg-sidebarBg dark:text-purple-400 dark:border-darkBorder'
              >
                <option value=''>All</option>
                <option value='To Do'>To Do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
            </div>
          </div>
        </section>

        <section className='mt-10'>
          {/* Render Filtered and Sorted Tasks */}
          <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`mb-4 p-4 bg-gray-100 rounded-lg dark:bg-sidebarBg dark:text-white space-y-2 relative ${
                    editingTaskId === task.id ? 'h-auto' : 'h-fit'
                  }`}
                >
                  {editingTaskId === task.id ? (
                    <>
                      <input
                        type='text'
                        name='title'
                        value={editingData.title}
                        onChange={handleChange}
                        className='w-full bg-transparent focus:outline-none'
                      />
                      <hr className='w-full border dark:border-darkBorder' />
                      <textarea
                        name='description'
                        value={editingData.description}
                        onChange={handleChange}
                        className='w-full h-5 bg-transparent focus:outline-none'
                        onInput={(e) =>
                          (e.target.style.height = e.target.scrollHeight + 'px')
                        }
                      />
                      <input
                        type='date'
                        name='date'
                        value={editingData.date}
                        onChange={handleChange}
                        className='w-full bg-transparent focus:outline-none'
                      />
                      <select
                        name='priority'
                        value={editingData.priority}
                        onChange={handleChange}
                        className='w-full bg-transparent dark:bg-sidebarBg focus:outline-none'
                      >
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                      </select>
                      <select
                        name='status'
                        value={editingData.status}
                        onChange={handleChange}
                        className='w-full bg-transparent dark:bg-sidebarBg focus:outline-none'
                      >
                        <option value='To Do'>To Do</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
                      </select>
                      <button
                        onClick={() => handleSaveTask(task.id)}
                        className='mt-2 px-2 bg-green-500 text-white rounded-md'
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className='font-medium text-xl'>{task.title}</h3>
                      <div className='flex'>
                        <FaRegEdit
                          className='absolute right-14 top-5 h-6 w-6 text-purple-500 hover:text-purple-700 cursor-pointer'
                          onClick={() => handleEditTask(task)}
                        />
                        <AiOutlineDelete
                          className='absolute right-6 top-5 h-6 w-6  hover:text-red-400 cursor-pointer'
                          onClick={() => handleDeleteTask(task.id)}
                        />
                      </div>
                      <hr className='w-full border dark:border-darkBorder' />
                      <p className='text-sm'>{task.description}</p>
                      <p className='text-sm text-gray-500 dark:text-gray-300'>
                        {task.date}
                      </p>
                      <p className='text-sm dark:text-gray-300'>
                        Priority:{' '}
                        <span
                          className={`${
                            priorityClasses[task.priority] || 'text-gray-700'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </p>
                      <p className='text-sm text-gray-700 dark:text-gray-300'>
                        Status: {task.status}
                      </p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className='dark:text-white'>No tasks available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Task;
