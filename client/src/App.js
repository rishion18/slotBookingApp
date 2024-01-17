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
import AdminLayout from './components/AdminLayout.jsx';

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
    element: <DashBoardLayout title={'allEvents'}><AllEvents/></DashBoardLayout>
   },
   {
    path:'/datepicker/:eventId',
    element: <DashBoardLayout title={'Datepicker'}> <DatepickerApp/></DashBoardLayout>
   },
   {
    path:'/datepicker/continueBooking',
    element: <DashBoardLayout title={'finalDetails'}> <FinalDetailsPage/></DashBoardLayout>
   },
   {
    path:'/success' ,
    element: <DashBoardLayout title={'success'} > <Success/></DashBoardLayout>
   },
   {
    path: '/failure',
    element: <Failure/>
   },
   {
    path:'/adminDashBoard',
    element: <AdminLayout title={'adminDashboard'}><AdminDashBoard/></AdminLayout>
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
