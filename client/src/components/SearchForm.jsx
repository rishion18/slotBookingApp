import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setDisplayItems, setUserEventsRenderList } from '../store/eventReducers';

const SearchForm = () => {

  const dispatch = useDispatch();

  const{userEvents} = useSelector((state) => state.Events);
  const{userCurrentPage} = useSelector((state) => state.Events);


  const handleSearchFilter = (searchInput) => {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const itemsPerPage = 3
    
    if (lowerCaseSearchInput.trim() === '') {
      // If the searchInput is empty, call displayItems to render items based on the userCurrentPage
      const itemsPerPage = 3
      dispatch(setDisplayItems({currentPage: userCurrentPage , itemsPerPage}));

    } else {
      // If there is a search input, filter the events and update the userEventsRenderList in the Redux store
      const filteredRes = userEvents.filter((event) => event.eventName.toLowerCase().includes(lowerCaseSearchInput));
      dispatch(setUserEventsRenderList(filteredRes));
    }
  };
  
  



  return (
    <form  className='m-2 w-96'>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative flex justify-evenly">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="start typing to search events ..."
          onChange={(e) => handleSearchFilter(e.target.value)}
          required
        />

      </div>
    </form>
  );
};

export default SearchForm;
