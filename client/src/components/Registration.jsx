import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Registration() {

  const [name , setName] = useState('')
  const[password , setPassword] = useState('')
  const[role , setRole] = useState('')
  const[email , setEmail] = useState('');

  const handleName = (newName) => {
    setName(newName);
  }

  const handlePassword = (newPassword) => {
    setPassword(newPassword)
  }

  const handleRole = (newRole) => {
     setRole(newRole)
  }

  const handleEmail = (newMail) => {
     setEmail(newMail)
  }

  const navigate = useNavigate()

  const handleRegistration = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/userRegister` , {
      method: 'POST',
      body:JSON.stringify({
        fullName:name,
        email:email,
        password:password,
        role:role
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      const {status} = data
      if(status){
        setTimeout(() => {
          alert(data.message)
        } , 2000)
        navigate('/');
      }else{
        alert(data.messgae)
      }
    })
  }



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
              Register
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e) => {handleName(e.target.value)}}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  email
                </label>
                <div className="mt-2">
                  <input
                  onChange={(e) => {handleEmail(e.target.value)}}
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
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                  onChange={(e) => {handlePassword(e.target.value)}}
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
                  type="submit" onClick={(e) => {handleRegistration(e)}}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  
