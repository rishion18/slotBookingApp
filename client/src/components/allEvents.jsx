import { useEffect, useState } from "react";
import EventCard from "./eventCard";
import SearchForm from "./SearchForm";
import { setUserCurrentPage, setUserEvents, setUserEventsRenderList } from "../store/eventReducers.js";
import { useSelector , useDispatch } from "react-redux";

const AllEvents = () => {

const[currentPage , setCurrentPage] = useState(1)
const dispatch = useDispatch();
 
  const fetchAllEvents = async() => {
    fetch(`http://localhost:5000/api/event/getAllEvents`)
    .then(res => res.json())
    .then(data => dispatch(setUserEvents(data)));
}

useEffect(() => {
    fetchAllEvents();
    displayItems(currentPage);
} , [])


const{userEvents} = useSelector((state) => state.Events);
const{userCurrentPage} = useSelector((state) => state.Events);
console.log(userCurrentPage);

const itemsPerPage = 3;
const totalButtons = userEvents.length/itemsPerPage

const getPageNumbers = () => {
    const pageNumberArray = [];

    for (let i = 0; i < totalButtons; i++) {
        pageNumberArray.push(i + 1);
    }

    return pageNumberArray;
}

const pagesNeeded = getPageNumbers();

const handlePrevClick = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage - 1;
      displayItems(newPage);
      dispatch(setUserCurrentPage(newPage))
      return newPage;
    });
  }
  
  const handleNextClick = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1;
      displayItems(newPage);
      dispatch(setUserCurrentPage(newPage))
      return newPage;
    });
  }
  

const handlePageClick = (page) => {
  displayItems(page);
  setCurrentPage(page);
  dispatch(setUserCurrentPage(page))
}



const displayItems =  (currentPage) => {
    const startIndex = (currentPage - 1)*itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currItems = userEvents.slice(startIndex , endIndex);
    dispatch(setUserEventsRenderList(currItems));
}

const{userEventsRenderList} = useSelector((state) => state.Events);


    return(
    <div className="flex flex-col justify-between w-screen">
      <div className="flex flex-col w-screen h-auto">
            <div className="w-screen bg-blue-500 text-white h-auto flex justify-center items-center">
              <SearchForm displayItems={displayItems}/>
            </div>
            <div className="grid grid-cols-5 gap-4 m-10">
                {
                    userEventsRenderList?.map((item) => <EventCard key={item._id} item={item}/>)
                }
            </div>
            
      </div>
      <div className="w-screen h-auto  mb-10 flex justify-center">
                <button 
                onClick={handlePrevClick}
                disabled={currentPage <= 1}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                prev
                </button>
                {
                    pagesNeeded.map((item => <button 
                    onClick={() => {handlePageClick(item)}}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                    {item}
                    </button>))
                }
                <button 
                onClick={handleNextClick}
                disabled={currentPage >= (totalButtons)}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >next
                </button>
            </div>
    </div>    
    )
}

export default AllEvents;