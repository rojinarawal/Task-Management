import React from 'react';
import useTheme from '../contexts/theme';

function ThemeBtn() {
  const { themeMode, darkTheme, lightTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };
  return (
    <div className='flex justify-center ml-8 mt-16'>
      <label className='relative inline-flex cursor-pointer items-center '>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          onChange={onChangeBtn}
          checked={themeMode === 'dark'}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-navPrimary dark:peer-focus:ring-navPrimary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
      </label>
    </div>
  );
}

export default ThemeBtn;
