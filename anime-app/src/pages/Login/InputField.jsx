const InputField = ({ type, name, placeholder, value, onChange, icon }) => {
    return (
      <div className="relative w-full">
        {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg font-extrabold focus:outline-none focus:ring-2 focus:ring-[#9a74bd] bg-[#3a3838b0] text-white"
        />
      </div>
    );
  };
  
  export default InputField;