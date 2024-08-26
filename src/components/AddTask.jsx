import React, { useState } from 'react';
import cross from '/src/assets/cross.png';
import { v4 as uuidv4 } from 'uuid';

const AddTask = ({ isOpen, onClose, setOpen, addTask }) => {
  const initialTaskData = {
    id: uuidv4(),
    title: '',
    description: '',
    priority: '',
    date: '',
    status: '',
    isEditing: false,
  };

  const [taskData, setTaskData] = useState(initialTaskData);

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents the default form submission behavior
    if (taskData.title && taskData.status) {
      addTask(taskData);
      closeModal();
    } else {
      alert('Please fill in all required fields');
    }
  };

  return isOpen ? (
    <form
      className='w-screen h-screen flex items-center justify-center fixed top-0 left-0 z-50'
      onSubmit={handleSubmit}
    >
      <div className='w-full h-full bg-black opacity-70 absolute left-0 top-0'></div>
      <div className='dark:bg-sidebarBg md:w-[30vw] w-[90%] bg-white rounded-lg shadow-md flex flex-col items-center gap-3 px-5 py-6 relative'>
        <button
          className='absolute top-0 right-0 bg-red-400 p-2 rounded-tr-lg font-medium text-sm'
          onClick={closeModal}
        >
          <img src={cross} alt='crossimg' className='h-5 w-5' />
        </button>

        <input
          type='text'
          name='title'
          value={taskData.title}
          placeholder='Title'
          className='dark:bg-bgPrimary dark:border-darkBorder mt-8 w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium'
          onChange={handleChange}
        />
        <textarea
          type='text'
          name='description'
          value={taskData.description}
          placeholder='Description'
          className='dark:bg-bgPrimary dark:border-darkBorder w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium'
          onChange={handleChange}
        />

        <select
          name='priority'
          className='dark:bg-bgPrimary dark:border-darkBorder w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm'
          onChange={handleChange}
          value={taskData.priority}
        >
          <option value=''>Priority</option>
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
          <option value='high'>High</option>
        </select>

        <input
          type='date'
          name='date'
          value={taskData.date}
          placeholder='Date'
          className='dark:bg-bgPrimary dark:border-darkBorder w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium'
          onChange={handleChange}
        />

        <select
          name='status'
          className='dark:bg-bgPrimary dark:border-darkBorder w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm'
          onChange={handleChange}
          value={taskData.status}
        >
          <option value=''>Status</option>
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Completed'>Completed</option>
        </select>

        <button
          type='submit'
          className='text-white bg-navPrimary p-2 rounded-3xl font-medium text-sm mt-4'
        >
          Create Task
        </button>
      </div>
    </form>
  ) : null;
};

export default AddTask;
