
import React, { useState } from 'react';
import SignUp from "./Signup.jsx";
import SignIn from "./Signin.jsx";
import { Link, useNavigate } from 'react-router-dom';


function Login() {
const [isSignInView, setIsSignInView] = useState(false);
let navigate = useNavigate();
  
  const toggleView = () => {
    setIsSignInView(!isSignInView);
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center  p-4 ">
      <button className="bg-[#3a57ea] hover:bg-[#657be8] font-extrabold absolute top-5 left-2 w-28 rounded-md p-2" onClick={()=>navigate("/")}>Home</button>
      <div className="bg-[#0000004a] w-full max-w-[500px] lg:max-w-[900px] h-auto min-h-[500px] shadow-[4px_4px_15px_black] rounded-[30px] overflow-hidden flex flex-col lg:flex-row m-0 border-none">
        {!isSignInView ? (
          <>
           <SignIn toggleView={toggleView}/>
          </>
        ) : (
          <SignUp toggleView={toggleView}/>
        )}
      </div>
    </div>
  );
}

export default Login;