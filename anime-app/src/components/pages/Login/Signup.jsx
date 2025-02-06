import { useNavigate } from 'react-router-dom';
import { CiUser, CiLock } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import React, { useState } from 'react';
import InputField from './InputField.jsx';

function SignUp({toggleView}){
    const  navigate = useNavigate();
    
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  
    const handleInputChange = async (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try{
         const res = await fetch("http://localhost:5000/user/register",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const result = await res.json();
          localStorage.setItem("token", result.token);
          console.log(result);
          navigate("/login");
      } catch (error) {
        console.error(error.message);
      }finally{
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      };
    };
  



    return(
        <>
        <div className="w-full lg:w-1/2 h-full lg:h-[500px] border-none p-4 lg:p-8 ">
        <form className="flex flex-col justify-center items-center w-full h-full gap-4 md:gap-6" onSubmit={handleFormSubmit}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-extrabold">Sign up</h1>
          <div className="flex flex-col justify-center items-center w-full px-2 md:px-4 gap-3">
            <div className="w-full flex flex-col md:flex-row gap-3 items center">
              <InputField
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                icon={<CiUser className="w-4 h-4 md:w-5 md:h-5"/>}
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                icon={<CiUser className="w-4 h-4 md:w-5 md:h-5"/>}
              />
            </div>
            <InputField
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              icon={<MdEmail className="w-4 h-4 md:w-5 md:h-5"/>}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              icon={<CiLock className="w-4 h-4 md:w-5 md:h-5"/>}
            />
            <div className="flex items-center w-full mt-4">
              <input type="checkbox" name="check" required 
                className="w-4 h-4 md:w-5 md:h-5"/>
              <label className="ml-2 text-white text-xs md:text-sm font-semibold">
                Accept the Terms & Conditions
              </label>
            </div>
            <button type="submit" className="bg-white w-full rounded-lg p-2 text-sm md:text-base font-extrabold hover:bg-gray-200 transition duration-300">
              Join us →
            </button>
          </div>
        </form>
      </div>
      <div className="w-full lg:w-1/2 min-h-[200px] lg:min-h-auto rounded-3xl overflow-hidden relative flex justify-center items-center bg-[#121212b0] py-8">
        <div className="text-center z-10 px-4">
          <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold mb-4">
            Already have an account?
          </h1>
          <button 
            className="bg-white rounded-lg px-6 py-2 md:px-8 md:py-3 text-sm md:text-base lg:text-lg font-bold hover:bg-gray-200 transition duration-300"
            onClick={toggleView}>
            Sign in
          </button>
        </div>
      </div>
    </>
    );
}
export default SignUp;