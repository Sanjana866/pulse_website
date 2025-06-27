import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import UserMenu from '../components/UserMenu';

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);
    const navigate=useNavigate();

  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged Out');
    setTimeout(()=>{
        navigate('/');
    },2000)
  }


  const spacing = 200;

  const stats = {
    itemsDonated: 0,
    ngosDonated: 0,
    co2SavedKg: 0,
    donationTimeline: [
      {month:'Jan',donations:0},
      {month:'Feb',donations:0},
      {month:'Mar',donations:0},
      {month:'Apr',donations:0},
      {month:'May',donations:0},
      {month:'Jun',donations:0}
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className='flex justify-between'>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome, {loggedInUser || 'User'}
        </h1>
        <UserMenu handleLogout={handleLogout} />
        </div>



        <div className='py-8 space-y-4'>
          <p className='text-sm text-gray-500 md:text-lg'>Ready for your first contribution ?</p>
          <button className='flex justify-center items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:scale-105'>Donate Now</button>
        </div>



        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-green-600">{stats.itemsDonated}</h2>
            <p className="text-gray-600">Items Donated</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-500">{stats.ngosDonated}</h2>
            <p className="text-gray-600">NGOs Donated To</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-amber-600">{stats.co2SavedKg} kg</h2>
            <p className="text-gray-600">Estimated CO₂ Saved</p>
          </div>
        </div>

        <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
  
  <div class="bg-white shadow-lg rounded-lg w-full max-w-2xl text-center p-8">
    <p class="text-gray-600 mb-6">
      You haven't donated anything yet — let's change that! Your unused items can make a big difference.
    </p>

    <div class="mb-6">
      <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" alt="Empty donation box" class="w-24 mx-auto opacity-70"/>
    </div>

  </div>

  <div class="mt-10 text-center max-w-2xl">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
    <div class="grid sm:grid-cols-3 gap-4 text-sm text-gray-600">
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-blue-500 text-2xl mb-2">📦</div>
        <p>List your unused items</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-green-500 text-2xl mb-2">🤝</div>
        <p>Match with a verified NGO</p>
      </div>
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="text-purple-500 text-2xl mb-2">🚚</div>
        <p>Dropoff and make an impact</p>
      </div>
    </div>
  </div>
</div>



        </div>
        <ToastContainer/>
      </div>
    
  );
};

export default Dashboard;
