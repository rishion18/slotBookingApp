import { useEffect, useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { setCart, setSelectedSlots, setTotalAmount } from "../store/eventReducers";

const PriceCalculator = ({  item , event}) => {


const [counter , setCounter] = useState(1);

const dispatch = useDispatch();

const {selectedSlots} = useSelector((state) => state.Events);

const formattedDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };


const handleInc = () => {
    setCounter((prev) => prev+1);
    dispatch(setTotalAmount( (item.price)));

}
const handleDec = () => {
    setCounter((prev) => {
      if(prev <= 1){
        const updatedSlots = selectedSlots.filter((slot) => item._id !== slot._id)
        dispatch(setSelectedSlots(updatedSlots));
        dispatch(setCart({ _id: item._id, quantity: 0 }));

        return 1;
      }
      return prev-1;
    })
    dispatch(setTotalAmount( -(item.price)));
}

useEffect(() => {
 const cartSlot = {...item , quantity:counter}
 dispatch(setCart(cartSlot));
} ,[counter])


    return(
        <div className="w-90vw grid grid-cols-4 gap-10 m-2">
            <div className="flex flex-col justify-center items-center">{event.eventName}
            <div className="text-sm text-green-500">{formattedDate(item.slots)}</div>
            </div>
            <div className="flex justify-center items-center">Rs {item.price}/-</div>
            <div className="flex justify-center items-center">
            <div className="flex flex-row h-10 w-1/2 rounded-lg relative bg-transparent mt-1">
                <button onClick={handleDec} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                    type="number"
                    className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                    name="custom-input-number"
                    value={counter}
                    readOnly
                />
                <button onClick={handleInc} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
            </div>
            <div className="flex justify-center items-center">Rs {counter*item.price}/-</div>
        </div>
    )
}

export default PriceCalculator;