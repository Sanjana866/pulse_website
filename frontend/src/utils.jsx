import {toast} from 'react-toastify'

export const handleSuccess=(msg)=>{
    toast.success(msg,{
        position:'top-right'
    })
}

export const handleError=(msg)=>{
    toast.error(msg,{
        position:'top-right'
    })
}
const BASE_URL = "https://pulse-website.onrender.com/api";
 
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
 
export const createDonation = async (data) => {
  const res = await fetch(`${BASE_URL}/donations`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};
 
export const fetchMyDonations = async () => {
  const res = await fetch(`${BASE_URL}/donations`, { headers: authHeaders() });
  return res.json();
};
 
export const fetchMyStats = async () => {
  const res = await fetch(`${BASE_URL}/donations/stats`, { headers: authHeaders() });
  return res.json();
};
 
export const schedulePickup = async (donationId, data) => {
  const res = await fetch(`${BASE_URL}/donations/${donationId}/pickup`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
};
 
export const deleteDonation = async (donationId) => {
  const res = await fetch(`${BASE_URL}/donations/${donationId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
};
 
export const fetchNGOs = async () => {
  const res = await fetch(`${BASE_URL}/ngos`, { headers: authHeaders() });
  return res.json();
};