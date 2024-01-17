import { useEffect, useState } from "react";
import EventCard from "./eventCard";
import { setCurrentUser, setDisplayItems, setUserCurrentPage, setUserEvents, setUserEventsRenderList } from "../store/eventReducers.js";
import { useSelector , useDispatch } from "react-redux";

const AllEvents = () => {

const[currentPage , setCurrentPage] = useState(1)
const dispatch = useDispatch();

const itemsPerPage = 3;

 
const fetchAllEvents = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/event/getAllEvents`);

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    dispatch(setUserEvents(data));
    dispatch(setDisplayItems({currentPage , itemsPerPage}))

  } catch (error) {
    console.error('Error fetching events:', error.message);
  }
};

const{currentUserEmail , currentSessionToken} = useSelector(state => state.Events);
console.log(`on evnt page : ${currentSessionToken}`);

const fetchUser = async() => {
  fetch(`http://localhost:5000/api/user/getUser` , {
    method:'POST',
    body: JSON.stringify({
      email: currentUserEmail
    }),
    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${currentSessionToken}`
    },
  })
  .then(res => res.json())
  .then(data => dispatch(setCurrentUser(data)))
 }


useEffect(() => {
    fetchAllEvents();
    fetchUser()
} , [])


const{userEvents} = useSelector((state) => state.Events);


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
      dispatch(setDisplayItems({currentPage:newPage , itemsPerPage}));
      dispatch(setUserCurrentPage(newPage))
      return newPage;
    });
  }
  
  const handleNextClick = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1;
      dispatch(setDisplayItems({currentPage:newPage , itemsPerPage}));
      dispatch(setUserCurrentPage(newPage))
      return newPage;
    });
  }
  

const handlePageClick = (page) => {
  dispatch(setDisplayItems({currentPage:page , itemsPerPage}));
  setCurrentPage(page);
  dispatch(setUserCurrentPage(page))
}


const{userEventsRenderList} = useSelector((state) => state.Events);


    return(
    <div className="flex flex-col justify-between w-screen">
      <div className="flex flex-col w-screen h-auto">

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