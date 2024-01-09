import { useState , useEffect} from "react";
import { useSelector } from "react-redux";

const AdminDashBoard =  () => {

  const[display , setDisplay] = useState(false);

  const[allEvents , setAllEvents] = useState([])
 
  const fetchAllEvents = async() => {
    fetch(`http://localhost:5000/api/event/getAllEvents`)
    .then(res => res.json())
    .then(data => setAllEvents(data));
}

useEffect(() => {
    fetchAllEvents();
} , [])
  
  const handleNewEvent = (e) => {
    e.preventDefault();
    setDisplay(true)
    
  }

  const[eventName , setEventName] = useState('');
  const[eventDescription , setEventDesc] = useState('');
  const[thumbnail , setThumbnail] = useState('');

  const handleNameOfEvent = (eventName) => {
      setEventName(eventName);
  }

  const handleDescription = (eventDescription) => {
      setEventDesc(eventDescription);
  }

  const handleThumbnail = (eventThumbnail) => {
      setThumbnail(eventThumbnail)
  }

  const {currentSessionToken} = useSelector((state) => state.Events);
  console.log(currentSessionToken)


  const handleSubmitEvent = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/event/addEvent` , {
      method: 'POST',
      body: JSON.stringify({
        eventName : eventName,
        eventDescription: eventDescription,
        eventLogo: thumbnail
      }),
      // credentials: "include",
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${currentSessionToken}`
      },      
    })
    .then(res => res.json())
    .then(data => {
      if(data.status){
        return alert(data.message);
      }
    } )
    setDisplay(false)
  }

    return(
  <div className="flex flex-col items-center relative h-screen">
    <div className="m-5">Update existing events</div>
      <div className="grid grid-cols-4 m-5 gap-5">
        {
          allEvents.map((event) => (
            <button key={event._id} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              {event.eventName}
            </button>
          ))
        }
      </div>
    <div className="">
    <button onClick={(e) => {handleNewEvent(e)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      + Add new Event
    </button>
    </div>
    <div className={`${!display?'hidden' : ''} w-1/2 h-1/2 m-10 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
        <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="eventName" className="block text-sm font-medium leading-6 text-gray-900">
                    Name of Event
                  </label>
                  <div className="mt-2">
                    <input
                    onChange={(e) => {handleNameOfEvent(e.target.value)}}
                      id="eventName"
                      name="eventName"
                      type="eventName"
                      autoComplete="eventName"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="eventDescription" className="block text-sm font-medium leading-6 text-gray-900">
                    Event Description
                  </label>
                  <div className="mt-2">
                    <input
                    onChange={(e) => {handleDescription(e.target.value)}}
                      id="eventDescription"
                      name="eventDescription"
                      type="eventDescription"
                      autoComplete="eventDescription"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="eventLogo" className="block text-sm font-medium leading-6 text-gray-900">
                    Thumbnail Link
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(e) => {handleThumbnail(e.target.value)}}
                        id="eventLogo"
                        name="eventLogo"
                        type="eventLogo"
                        autoComplete="eventLogo"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                  </div>
                </div>
    
               
    
                <div>
                  <button
                    type="submit" onClick={(e) => {handleSubmitEvent(e)}}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create Event
                  </button>
                </div>
              </form>
    </div>
  </div>
    )
}

export default AdminDashBoard;