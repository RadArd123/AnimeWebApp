import { useNavigate } from 'react-router-dom';
import { CiUser, CiLock } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import React, { useState } from 'react';
import InputField from './InputField.jsx';

function SignUp({toggleView}){
    const  navigate = useNavigate();
    
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleInputChange = async (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");

      try{
         const res = await fetch("http://localhost:5000/user/register",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const result = await res.json();
          if(!res.ok){
            throw new Error(result.message || "An error occurred");
          }
          setSuccessMessage("Account created successfully. Click on Sign In to login");
          setFormData({
            username: "", 
            email: "",
            password: "", 
          });
        
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      }finally{
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      };
    };



    return(
        <>
        <div className="w-full lg:w-1/2 h-full lg:h-[500px] border-none p-4 lg:p-8 ">
        <form className="flex flex-col justify-center items-center w-full h-full gap-4 md:gap-6" onSubmit={handleFormSubmit}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#3a57ea] font-extrabold">Sign up</h1>
          <div className="flex flex-col justify-center items-center w-full px-2 md:px-4 gap-3">
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">
              {errorMessage}
            </div>)}
          
          {successMessage && (
            <div className="text-green-500 text-sm mb-4">
              {successMessage} 
              </div>)}
           
             
              <InputField
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                icon={<CiUser className="w-4 h-4 md:w-5 md:h-5 text-[#657be8]"/>}
              />
            
            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              icon={<MdEmail className="w-4 h-4 md:w-5 md:h-5 text-[#657be8] "/>}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              icon={<CiLock className="w-4 h-4 md:w-5 md:h-5 text-[#657be8]"/>}
            />
            <div className="flex items-center w-full mt-4">
              <input type="checkbox" name="check" required 
                className="w-4 h-4 md:w-5 md:h-5"/>
              <label className="ml-2 text-white text-xs md:text-sm font-semibold">
                Accept the Terms & Conditions
              </label>
            </div>
            <button type="submit" className="bg-[#3a57ea] w-full rounded-lg p-2 text-sm md:text-base font-extrabold hover:bg-[#657be8] transition duration-300">
              Join us →
            </button>
          </div>
        </form>
      </div>
      <div className="w-full lg:w-1/2 min-h-[200px] lg:min-h-auto rounded-3xl overflow-hidden relative flex justify-center items-center bg-[#121212b0] py-8">
        <div className="text-center z-10 px-4">
          <h1 className="text-[#3a57ea] text-xl md:text-2xl lg:text-3xl font-extrabold mb-4">
            Already have an account?
          </h1>
          <button 
            className="bg-[#3a57ea] w-44  rounded-lg px-6 py-2 md:px-8 md:py-3 text-sm md:text-base lg:text-lg font-bold hover:bg-[#657be8] transition duration-300"
            onClick={toggleView}>
            Sign in
          </button>
        </div>
      </div>
    </>
    );
}
export default SignUp;