import React, {useState,useEffect,useRef} from 'react';
import {Link, useNavigate} from 'react-router';
import {ToastContainer} from "react-toastify";
import { handleError, handleSuccess } from '../utils';

const Login = () => {
  const [isVisible, setIsVisible]=useState(false);
  const sectionRef=useRef();

  useEffect(()=>{
    const observer=new IntersectionObserver(
      ([entry])=>{if(entry.isIntersecting){
        setIsVisible(true);
      }},
      {threshold:0.1}
    );

    if(sectionRef.current){
      observer.observe(sectionRef.current);
    }
    return ()=>{
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  },[]);
  

  const navigate=useNavigate();
  const[loginInfo,setLoginInfo]=useState({
    email:'',
    password:''
  })

  const handleChange=(e)=>{
    const{name,value}=e.target;
    console.log(name,value);
    const copyloginInfo={...loginInfo};
    copyloginInfo[name]=value;
    setLoginInfo(copyloginInfo);
  }
  const handleRegister=async (e)=>{
    e.preventDefault();
    const {email,password}=loginInfo;
    if( !email|| !password){
      return handleError("Fill out all the fields")
    }
    try {
      const url="http://localhost:5001/api/auth/login";
      const response=await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })
      const result=await response.json();
      const {success,message,jwtToken,name, error}=result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(()=>{
          navigate('/dashboard')
        },2000)
      }else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4FAF3] px-4">
      <div ref={sectionRef}
      className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-opacity duration-1000 ${isVisible? 'animate-fade-in-up':'opacity-100'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#612D2D]">Login</h2>
        <form className="space-y-5" onSubmit={handleRegister}>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={handleChange}
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-1 block w-full bg-gray-200/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A5D395]"
              required
              value={loginInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={handleChange}
              id="password"
              type="password"
              name="password"
              placeholder="********"
              className="mt-1 block w-full bg-gray-200/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#A5D395]"
              required
              value={loginInfo.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#A5D395] text-black font-semibold py-2 rounded-md hover:bg-[#8fbf77] transition"
          >
            Login
          </button>
          <div className='flex px-2 space-x-2 w-full py-3'>
          <p className='text-sm text-gray-600'>Don't have an account?</p>
          <Link to="/register" className='text-sm font-bold text-green-700/75 underline'>Create now</Link>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
