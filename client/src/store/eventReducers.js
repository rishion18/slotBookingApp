import { createSlice } from "@reduxjs/toolkit";

const EventReducerSlice = createSlice({
    name: 'EventReducerSlice',
    initialState:{
        allEvents:[],
        selectedSlots:[],
        TotalAmount:0, 
        checkOutBody:[] ,
        currentEventId:'',
        cart:[],
        currentSessionToken:'',
        userEvents:[],
        userEventsRenderList:[] , 
        userCurrentPage:1,
        currentUser:'',
        currentUserEmail:""
    },
    reducers:{
        setAllEvents:(state , action) => {
            state.allEvents = [...state.allEvents , ...action.payload];
        },
        setSelectedSlots:(state , action) => {
            state.selectedSlots = action.payload;
        },
        setTotalAmount:(state , action) => {
            state.TotalAmount = state.TotalAmount+action.payload;
        },
        manageTotalAmount:(state , action) => {
            state.TotalAmount = state.selectedSlots.reduce((acc , item) => acc+item.price , 0);

        },
       setCurrentEventId:(state , action) => {
           state.currentEventId = action.payload;
       },
       setCart: (state, action) => {
        const { _id, quantity } = action.payload;
        const isPresentIndex = state.cart.findIndex((cartItem) => cartItem._id === _id);
    
        if (isPresentIndex !== -1 && quantity !== 0) {
            // Item with the same _id is present, update quantity
            state.cart[isPresentIndex].quantity = quantity;
        } else if (isPresentIndex !== -1 && quantity === 0) {
            // Quantity is set to 0, remove the item from the cart
            state.cart = state.cart.filter((cartItem) => cartItem._id !== _id);
        } else if (quantity !== 0) {
            // Item is not present, add it to the cart
            state.cart = [...state.cart, action.payload];
        }
    },
    setSessionToken:(state , action) => {
        state.currentSessionToken = action.payload;
    },
    setUserEvents:(state , action) => {
        state.userEvents = action.payload;
    },
    setUserEventsRenderList:(state , action) => {
        state.userEventsRenderList = action.payload;
    },
    setUserCurrentPage:(state , action) => {
        state.userCurrentPage = action.payload;
    },
    setCurrentUser:(state , action) => {
        state.currentUser = action.payload
    },
    setCurrentUserEmail:(state , action) => {
        state.currentUserEmail = action.payload
    },
    setDisplayItems: (state, action) => {
        const { currentPage, itemsPerPage } = action.payload;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currItems = state.userEvents?.slice(startIndex, endIndex);
        state.userEventsRenderList = currItems;
    }
    

    }
})

// export const displayItems =  (state , currentPage , itemsPerPage) => {
//    return async(dispatch) => {
//     const startIndex = (currentPage - 1)*itemsPerPage
//     const endIndex = startIndex + itemsPerPage
//     const currItems = state.userEvents?.slice(startIndex , endIndex);
//     dispatch(setUserEventsRenderList(currItems));
//    }
// }

export const { 
                setAllEvents ,
                setSelectedSlots ,
                setTotalAmount , 
                manageTotalAmount ,
                setCurrentEventId , 
                setCart , 
                setSessionToken , 
                setUserEvents , 
                setUserEventsRenderList,
                setUserCurrentPage , 
                setCurrentUser , 
                setCurrentUserEmail,
                setDisplayItems

            } = EventReducerSlice.actions; 

export default EventReducerSlice.reducer;