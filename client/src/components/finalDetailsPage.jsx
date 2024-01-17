import { useSelector } from "react-redux";
import PriceCalculator from "./PriceCalculator";
import { useDispatch } from "react-redux";
import { manageTotalAmount } from "../store/eventReducers";
import { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';

const FinalDetailsPage = () => {

    const dispatch = useDispatch();
    const[event , setEvent] = useState({});
    const{currentEventId} = useSelector((state) => state.Events);


const getEventById = () => {
  fetch(`${REACT_APP_BACKEND_URL}/api/event/getEventById` , {
    method: 'POST',
    body: JSON.stringify({
        eventId: currentEventId
    }),
    headers:{
        'Content-Type':'application/json'
    }
  })
  .then(res => res.json())
  .then(data => setEvent(data));
}


    useEffect(() => {
        dispatch(manageTotalAmount());
        getEventById();
    } ,[])

    const {selectedSlots} = useSelector((state) => state.Events);
    const {TotalAmount} = useSelector((state) => state.Events);
    const {cart} = useSelector((state) => state.Events);
    console.log(cart);


    const makePayment = async() => {
        const stripe = await loadStripe("pk_test_51OQl8fSEmo0kwgrlTt96D9sX1ThuIEK2cDyuX9vfRyyEXeJaD4VkYQDvxPco29TZiNeBwf03TVqScnuhIPymQruE00EydpbOby");
        
        const body = {
            products: cart
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch(`${REACT_APP_BACKEND_URL}/api/payment/create-checkout-session` , {
            method:'POST',
            headers: headers,
            body :JSON.stringify(body)
        })

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })

        if(result.error){
            console.log(result.error);
        }
    }

    

return (
    <div className="flex flex-col justify-center items-center ">
        <div className="m-10 text-2xl font-semibold">Your Booking Cart</div>
        <div className="grid grid-col-4">
            {
                selectedSlots?.map((item) => <PriceCalculator key={item._id} item={item} event={event}/>)
            }
        </div>
        <div className="">Total Amount = {TotalAmount} </div>
        <button onClick={makePayment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-10">
            CheckOut to payment
        </button>
    </div>
)
}

export default FinalDetailsPage;