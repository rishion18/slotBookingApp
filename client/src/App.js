import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignInRegistration from './components/signInRegistration.jsx'
import Registration from './components/Registration.jsx';
import AllEvents from './components/allEvents.jsx';
import DatepickerApp from './components/Datepicker.jsx';
import FinalDetailsPage from './components/finalDetailsPage.jsx';
import Success from './components/success.jsx';
import Failure from './components/failure.jsx';
import AdminDashBoard from './components/adminDashBoard.jsx';
import DashBoardLayout from './components/DashboardLayout.jsx';

const router = createBrowserRouter([
   {
    path:'/',
    element: <SignInRegistration/>
   },
   {
    path:'/registration',
    element: <Registration/>
   },
   {
    path:'/allEvents',
    element: <AllEvents/>
   },
   {
    path:'/datepicker/:eventId',
    element: <DatepickerApp/>
   },
   {
    path:'/datepicker/continueBooking',
    element: <FinalDetailsPage/>
   },
   {
    path:'/success' ,
    element: <Success/>
   },
   {
    path: '/failure',
    element: <Failure/>
   },
   {
    path:'/adminDashBoard',
    element: <DashBoardLayout title={'adminDashboard'}><AdminDashBoard/></DashBoardLayout>
   }
])


function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
