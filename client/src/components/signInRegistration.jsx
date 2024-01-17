import { useState } from "react";
import { Link , useNavigate } from "react-router-dom"
import { setCurrentUserEmail, setSessionToken } from "../store/eventReducers";
import { useDispatch} from "react-redux";


export default function SignInRegistration() {

  const navigate = useNavigate();
  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const[role , setRole] = useState('');

  const handleEmailEntry = (enteredEmail) => {
       setEmail(enteredEmail);
  }

  const handlePasswordEntry = (enteredPassword) => {
       setPassword(enteredPassword);
  }

  const handleRole = (role) => {
     setRole(role);
  }


  const handleSignIn = async (e, email, password) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/userLogin`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          role,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if(response){
        dispatch(setCurrentUserEmail(email))
      }
  
      const data = await response.json();
      if (!data.status) {
        alert('Invalid credentials');
        return;
      }
      if(data.role === 'ADMIN'){
      dispatch(setSessionToken(data.token))
      navigate('/adminDashBoard');
      return;
     }
     dispatch(setSessionToken(data.token))
     navigate('/allEvents')
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };



  const dispatch = useDispatch() 

    return (
      <>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {handleEmailEntry(e.target.value)}}
                    placeholder="Enter your registered email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Role
                </label>
                <div className="mt-2">
                <select
                onChange={(e) => {handleRole(e.target.value)}}
                id="name"
                    name="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                    <option value="" disabled selected>Select an option</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => {handlePasswordEntry(e.target.value)}}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={(e) => {handleSignIn(e , email , password)}}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to='/registration' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  
