import React, {useState } from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 
import { useParams , useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentEventId, setSelectedSlots } from "../store/eventReducers";

const DatepickerApp = () => { 

const [value, setValue] = useState({ 

startDate: new Date(), 
endDate: new Date().setMonth(11) 

});

const dispatch = useDispatch();

const [showsArray , setShowArray] = useState([]);
const{eventId} = useParams();

dispatch(setCurrentEventId(eventId));

const handleValueChange = (newValue) => {
console.log("newValue:", newValue); 
setValue(newValue); 

const{startDate , endDate} = newValue;

fetch(`http://localhost:5000/api/event/datepicker/${eventId}`,{
    method:'POST',
    body: JSON.stringify({
       startDate,
       endDate
    }),
    headers:{
        'Content-Type':'application/json'
    }
})
.then(res => res.json())
.then(data => setShowArray(data[0].showArray?.flat()));

} 


const formattedDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };



  const[selected , setSelected] = useState([])

  const isSelected = (slot) => {
    return selected.includes(slot)
  }

  const handleSlotSelection = (e, slot) => {
    e.preventDefault();
    setSelected((prevSlots) => {
        if(isSelected(slot)){
            const updatedSlots = selected.filter((item) => item._id !== slot._id )
            return updatedSlots;
        }
        const updatedSlots = [...prevSlots , slot];
        return updatedSlots;
    } )
  };

  const navigate = useNavigate();

  const handleContinueBooking = (e) => {
    e.preventDefault()
    dispatch(setSelectedSlots(selected));
    navigate('/datepicker/continueBooking');
  }

return (
    <div>
        <div className="w-90vw flex flex-col gap-5 items-center justify-center">
            <Datepicker value={value} onChange={handleValueChange} />
            <p>All available slots</p> 
            <div className="grid grid-cols-4 gap-4">
            {
                showsArray?.map((slot) => 
                <button key={slot._id} onClick={(e) => {handleSlotSelection(e ,slot)}}
                className={isSelected(slot)
                           ?"bg-blue-500 text-white font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                           :"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}>
                {formattedDate(slot.slots)}<div className="text-sm text-green">Rs {slot.price}/-</div>
                </button>
                )
            }
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={(e) => {handleContinueBooking(e)}}>
            Continue booking
            </button>
        </div>
    </div>

);
}; 
export default DatepickerApp;