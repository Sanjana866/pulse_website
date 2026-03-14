import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import {
  createDonation,
  fetchMyDonations,
  fetchMyStats,
  fetchNGOs,
  schedulePickup,
  deleteDonation,
} from '../utils';

const CATEGORIES = ['Clothes', 'Food', 'Books', 'Electronics', 'Furniture', 'Other'];
const TIME_SLOTS = ['9:00 AM – 11:00 AM', '11:00 AM – 1:00 PM', '2:00 PM – 4:00 PM', '4:00 PM – 6:00 PM'];

const STATUS_COLORS = {
  Pending:    'bg-yellow-100 text-yellow-800',
  Matched:    'bg-blue-100 text-blue-800',
  Scheduled:  'bg-purple-100 text-purple-800',
  'Picked Up':'bg-orange-100 text-orange-800',
  Delivered:  'bg-green-100 text-green-800',
};

const STATUS_STEPS = ['Pending', 'Matched', 'Scheduled', 'Picked Up', 'Delivered'];


const StatCard = ({ value, label, color }) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
    <p className="text-gray-500 mt-1 text-sm">{label}</p>
  </div>
);

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
    {status}
  </span>
);

const StatusTracker = ({ status }) => {
  const current = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex items-center gap-1 mt-3">
      {STATUS_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${i <= current ? 'bg-[#82B171] border-[#82B171]' : 'bg-white border-gray-300'}`}>
              {i <= current && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span className="text-[9px] text-gray-500 mt-0.5 text-center w-12 leading-tight">{step}</span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div className={`h-0.5 flex-1 mb-4 ${i < current ? 'bg-[#82B171]' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-bold text-[#612D2D]">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  </div>
);

const DonateModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({ itemName: '', category: '', quantity: 1, description: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.itemName || !form.category || !form.quantity) return handleError('Fill required fields');
    setLoading(true);
    try {
      const result = await createDonation({ ...form, quantity: Number(form.quantity) });
      if (result.success) {
        handleSuccess(result.message);
        onSuccess();
        onClose();
      } else {
        handleError(result.message);
      }
    } catch {
      handleError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="List an Item to Donate" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Item Name *</label>
          <input name="itemName" value={form.itemName} onChange={handleChange} required
            placeholder="e.g. Winter jacket"
            className="input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required className="input">
              <option value="">Select…</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Quantity *</label>
            <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required className="input" />
          </div>
        </div>
        <div>
          <label className="label">Description</label>
          <textarea name="description" rows={3} value={form.description} onChange={handleChange}
            placeholder="Condition, size, notes…" className="input resize-none" />
        </div>
        <div>
          <label className="label">Image URL (optional)</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
            placeholder="https://…" className="input" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-[#82B171] hover:bg-[#6a9a5a] text-white font-semibold py-2 rounded-lg transition disabled:opacity-60">
          {loading ? 'Submitting…' : 'List Donation'}
        </button>
      </form>
    </Modal>
  );
};

const PickupModal = ({ donation, onClose, onSuccess }) => {
  const [form, setForm] = useState({ pickupAddress: '', pickupDate: '', pickupTimeSlot: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.pickupAddress || !form.pickupDate || !form.pickupTimeSlot)
      return handleError('All pickup fields are required');
    setLoading(true);
    try {
      const result = await schedulePickup(donation._id, form);
      if (result.success) {
        handleSuccess('Pickup scheduled!');
        onSuccess();
        onClose();
      } else {
        handleError(result.message);
      }
    } catch {
      handleError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <Modal title={`Schedule Pickup — ${donation.itemName}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Pickup Address *</label>
          <input name="pickupAddress" value={form.pickupAddress} onChange={handleChange} required
            placeholder="Your full address" className="input" />
        </div>
        <div>
          <label className="label">Preferred Date *</label>
          <input name="pickupDate" type="date" min={minDateStr} value={form.pickupDate}
            onChange={handleChange} required className="input" />
        </div>
        <div>
          <label className="label">Time Slot *</label>
          <select name="pickupTimeSlot" value={form.pickupTimeSlot} onChange={handleChange} required className="input">
            <option value="">Select a slot…</option>
            {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        {donation.ngoName && (
          <p className="text-sm text-gray-500">
            Matched NGO: <span className="font-semibold text-[#612D2D]">{donation.ngoName}</span>
          </p>
        )}
        <button type="submit" disabled={loading}
          className="w-full bg-[#82B171] hover:bg-[#6a9a5a] text-white font-semibold py-2 rounded-lg transition disabled:opacity-60">
          {loading ? 'Scheduling…' : 'Confirm Pickup'}
        </button>
      </form>
    </Modal>
  );
};

const NGOCard = ({ ngo }) => (
  <div className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <h3 className="font-bold text-gray-800">{ngo.name}</h3>
      {ngo.verified && (
        <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
          ✓ Verified
        </span>
      )}
    </div>
    <p className="text-xs text-gray-500 mt-1">{ngo.city} · {ngo.address}</p>
    <p className="text-sm text-gray-600 mt-2">{ngo.description}</p>
    <div className="flex flex-wrap gap-1 mt-3">
      {ngo.acceptedCategories.map(cat => (
        <span key={cat} className="bg-[#F0F7EE] text-[#4a7a3a] text-[10px] px-2 py-0.5 rounded-full font-medium">
          {cat}
        </span>
      ))}
    </div>
    <div className="flex gap-4 mt-3 text-xs text-gray-500">
      {ngo.phone && <span>📞 {ngo.phone}</span>}
      {ngo.email && <span>✉ {ngo.email}</span>}
    </div>
  </div>
);

const BarChart = ({ timeline }) => {
  const max = Math.max(...timeline.map(t => t.donations), 1);
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-gray-700 mb-4">Donation Activity (This Year)</h3>
      <div className="flex items-end gap-2 h-28">
        {timeline.map(({ month, donations }) => (
          <div key={month} className="flex flex-col items-center flex-1">
            <span className="text-[10px] text-gray-500 mb-1">{donations || ''}</span>
            <div
              className="w-full rounded-t bg-[#82B171] transition-all duration-500"
              style={{ height: `${(donations / max) * 80}px`, minHeight: donations ? '4px' : '0' }}
            />
            <span className="text-[9px] text-gray-400 mt-1">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TABS = ['Overview', 'My Donations', 'NGOs'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');
  const [activeTab, setActiveTab] = useState('Overview');

  const [stats, setStats] = useState(null);
  const [donations, setDonations] = useState([]);
  const [ngos, setNGOs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDonateModal, setShowDonateModal] = useState(false);
  const [pickupTarget, setPickupTarget] = useState(null); 

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, donationsRes, ngosRes] = await Promise.all([
        fetchMyStats(),
        fetchMyDonations(),
        fetchNGOs(),
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (donationsRes.success) setDonations(donationsRes.donations);
      if (ngosRes.success) setNGOs(ngosRes.ngos);
    } catch {
      handleError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    setLoggedInUser(user || 'User');
    loadAll();
  }, [loadAll, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('Logged out');
    setTimeout(() => navigate('/'), 1500);
  };

  const handleDeleteDonation = async (id) => {
    if (!window.confirm('Delete this donation?')) return;
    const result = await deleteDonation(id);
    if (result.success) { handleSuccess('Donation deleted'); loadAll(); }
    else handleError(result.message);
  };

  return (
    <div className="min-h-screen bg-[#F4FAF3]">

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#82B171] flex items-center justify-center text-white font-bold text-sm">
              {loggedInUser.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-gray-800 hidden sm:block">
              Welcome, {loggedInUser}
            </span>
          </div>
          <nav className="flex gap-1">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
                  ${activeTab === tab
                    ? 'bg-[#82B171] text-white'
                    : 'text-gray-600 hover:bg-gray-100'}`}>
                {tab}
              </button>
            ))}
          </nav>
          <button onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Track your donations and impact</p>
          </div>
          <button
            onClick={() => setShowDonateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#82B171] hover:bg-[#6a9a5a] text-white font-semibold rounded-full shadow transition">
            📦 Donate Now
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48 text-gray-400">Loading…</div>
        ) : (
          <>
            {activeTab === 'Overview' && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatCard value={stats.itemsDonated} label="Items Donated" color="text-green-600" />
                  <StatCard value={stats.ngosDonated}  label="NGOs Supported" color="text-blue-500" />
                  <StatCard value={`${stats.co2SavedKg} kg`} label="Estimated CO₂ Saved" color="text-amber-600" />
                </div>

                <BarChart timeline={stats.donationTimeline} />

                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700">Recent Donations</h3>
                    <button onClick={() => setActiveTab('My Donations')}
                      className="text-sm text-[#82B171] hover:underline">View all →</button>
                  </div>
                  {donations.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <div className="text-4xl mb-2">📦</div>
                      <p>No donations yet. Click <strong>Donate Now</strong> to get started!</p>
                    </div>
                  ) : (
                    <ul className="divide-y">
                      {donations.slice(0, 3).map(d => (
                        <li key={d._id} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800">{d.itemName}</p>
                            <p className="text-xs text-gray-400">{d.category} · Qty {d.quantity}</p>
                          </div>
                          <StatusBadge status={d.status} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}


            {activeTab === 'My Donations' && (
              <div className="space-y-4">
                {donations.length === 0 ? (
                  <div className="bg-white rounded-xl shadow p-12 text-center text-gray-400">
                    <div className="text-5xl mb-3">📭</div>
                    <p className="text-lg font-medium">No donations listed yet</p>
                    <p className="text-sm mt-1">Click <strong>Donate Now</strong> to make your first contribution.</p>
                  </div>
                ) : (
                  donations.map(d => (
                    <div key={d._id} className="bg-white rounded-xl shadow p-5">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex gap-3 items-start">
                          {d.imageUrl ? (
                            <img src={d.imageUrl} alt={d.itemName}
                              className="w-14 h-14 object-cover rounded-lg border" />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">📦</div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-800">{d.itemName}</p>
                            <p className="text-xs text-gray-500">{d.category} · Qty {d.quantity}</p>
                            {d.ngoName && (
                              <p className="text-xs text-blue-600 mt-0.5">🤝 Matched: {d.ngoName}</p>
                            )}
                            {d.pickupDate && (
                              <p className="text-xs text-purple-600 mt-0.5">
                                📅 {new Date(d.pickupDate).toLocaleDateString()} · {d.pickupTimeSlot}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={d.status} />
                          {['Pending', 'Matched'].includes(d.status) && (
                            <button onClick={() => setPickupTarget(d)}
                              className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 px-2 py-1 rounded-full font-medium transition">
                              Schedule Pickup
                            </button>
                          )}
                         
                          {d.status === 'Pending' && (
                            <button onClick={() => handleDeleteDonation(d._id)}
                              className="text-xs bg-red-50 text-red-500 hover:bg-red-100 px-2 py-1 rounded-full font-medium transition">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                   
                      <StatusTracker status={d.status} />
                      
                      {d.description && (
                        <p className="mt-2 text-xs text-gray-400 border-t pt-2">{d.description}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

        
            {activeTab === 'NGOs' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  {ngos.length} verified NGO{ngos.length !== 1 ? 's' : ''} accepting donations
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ngos.map(ngo => <NGOCard key={ngo._id} ngo={ngo} />)}
                </div>
                {ngos.length === 0 && (
                  <div className="bg-white rounded-xl shadow p-10 text-center text-gray-400">
                    <p>No NGOs found.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>


      {showDonateModal && (
        <DonateModal onClose={() => setShowDonateModal(false)} onSuccess={loadAll} />
      )}
      {pickupTarget && (
        <PickupModal
          donation={pickupTarget}
          onClose={() => setPickupTarget(null)}
          onSuccess={loadAll}
        />
      )}

      <ToastContainer />

      <style>{`
        .input {
          display: block; width: 100%; margin-top: 0.25rem;
          padding: 0.5rem 0.75rem;
          background: #f3f4f6; border: 1px solid #d1d5db;
          border-radius: 0.5rem; font-size: 0.875rem;
          outline: none; transition: box-shadow 0.2s;
        }
        .input:focus { box-shadow: 0 0 0 2px #A5D395; }
        .label { font-size: 0.8rem; font-weight: 500; color: #374151; }
      `}</style>
    </div>
  );
};

export default Dashboard;
