
import React, { useState } from 'react';
import { CiUser, CiLock } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import SignUp from "./Signup.jsx";
import SignIn from "./Signin.jsx";



function Login() {
const [isSignInView, setIsSignInView] = useState(false);
  
  const toggleView = () => {
    setIsSignInView(!isSignInView);
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-image p-4">
      <div className="bg-[#0000004a] w-full max-w-[500px] lg:max-w-[900px] h-auto min-h-[500px] shadow-[4px_4px_15px_black] rounded-[30px] overflow-hidden flex flex-col lg:flex-row m-0 border-none">
        {!isSignInView ? (
          <>
            <SignUp toggleView={toggleView}/>
          </>
        ) : (
            <SignIn toggleView={toggleView}/>
        )}
      </div>
    </div>
  );
}

export default Login;