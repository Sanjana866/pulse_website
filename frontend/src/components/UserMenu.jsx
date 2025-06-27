import react,{useState,useRef,useEffect } from 'react';
import User from './icons/User';

const UserMenu=({handleLogout})=>{
  const [dropdownOpen,setDropdownOpen]=useState(false);
  const menuRef=useRef();

  useEffect(()=>{
    const handleClickOutside=(event)=>{
      if (menuRef.current && !menuRef.current.contains(event.target)){
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown',handleClickOutside);
    return ()=>document.removeEventListener('mousedown',handleClickOutside);
  },[]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition border border-black">
            <User/>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
