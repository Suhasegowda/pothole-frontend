import { useState, useEffect, useRef } from 'react';
import { User, Camera, Edit2, Save, Upload } from 'lucide-react';

function Profile() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    memberSince: Date.now(),
    avatar: null
  });
  
  const [issuesReported, setIssuesReported] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load from local storage
    const storedUserStr = localStorage.getItem('civiclens_user');
    const storedIssues = localStorage.getItem('issuesCount') || '0';
    const storedAvatar = localStorage.getItem('userAvatar');
    
    setIssuesReported(parseInt(storedIssues, 10));

    if (storedUserStr) {
      const userObj = JSON.parse(storedUserStr);
      const nameParts = userObj.name ? userObj.name.split(' ') : [''];
      
      setUserData({
        firstName: userObj.firstName || nameParts[0] || '',
        lastName: userObj.lastName || nameParts.slice(1).join(' ') || '',
        email: userObj.email || '',
        phone: userObj.phone || '',
        memberSince: userObj.memberSince || Date.now(),
        avatar: storedAvatar || null
      });
    }
  }, []);

  const calculateMemberSince = (timestamp) => {
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days} days, ${hours} hours`;
    return `${hours} hours, ${minutes} minutes`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Update local storage
    const storedUserStr = localStorage.getItem('civiclens_user');
    let userObj = storedUserStr ? JSON.parse(storedUserStr) : {};
    
    userObj.firstName = userData.firstName;
    userObj.lastName = userData.lastName;
    userObj.name = `${userData.firstName} ${userData.lastName}`.trim();
    userObj.phone = userData.phone;
    
    localStorage.setItem('civiclens_user', JSON.stringify(userObj));
    if (userData.avatar) {
      localStorage.setItem('userAvatar', userData.avatar);
    }
    
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Blue Banner */}
      <div className="bg-[#0ea5e9] pt-12 pb-32 text-center text-white px-4">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-blue-100">Manage your account settings and preferences</p>
      </div>

      {/* Floating Profile Card */}
      <div className="max-w-3xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100 mb-8 relative">
          <div className="w-24 h-24 bg-cyan-500 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto border-4 border-white shadow-lg -mt-16 mb-4 overflow-hidden relative group">
            {userData.avatar ? (
              <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span>{userData.firstName ? userData.firstName[0].toUpperCase() : 'S'}</span>
            )}
            {isEditing && (
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={24} className="text-white" />
              </div>
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-slate-500 text-sm mb-6">{userData.email}</p>
          
          <div className="flex justify-center gap-12 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-500">{issuesReported}</div>
              <div className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Issues Reported</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-500">{calculateMemberSince(userData.memberSince)}</div>
              <div className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Member Since</div>
            </div>
          </div>
        </div>

        {/* Profile Form (Single Column) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <User size={20} className="text-slate-400" /> Account Settings
            </h3>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 text-sm font-bold text-cyan-500 bg-cyan-50 px-4 py-2 rounded-lg hover:bg-cyan-100 transition"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            ) : null}
          </div>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">First name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={userData.firstName}
                  onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                  className={`w-full border rounded-lg px-4 py-2.5 outline-none text-sm transition ${isEditing ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100' : 'border-slate-200 bg-slate-50 text-slate-500'}`} 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Last name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={userData.lastName}
                  onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                  className={`w-full border rounded-lg px-4 py-2.5 outline-none text-sm transition ${isEditing ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100' : 'border-slate-200 bg-slate-50 text-slate-500'}`} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Phone</label>
              <input 
                type="tel" 
                disabled={!isEditing}
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
                placeholder="+91 "
                className={`w-full border rounded-lg px-4 py-2.5 outline-none text-sm transition ${isEditing ? 'border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100' : 'border-slate-200 bg-slate-50 text-slate-500'}`} 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Profile picture</label>
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
              />
              <div className={`flex items-center gap-3 border rounded-lg px-4 py-2 ${isEditing ? 'border-blue-300 bg-cyan-50/30' : 'border-slate-200 bg-slate-50'}`}>
                <button 
                  type="button" 
                  disabled={!isEditing}
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-4 py-1.5 border rounded text-sm font-medium shadow-sm flex items-center gap-2 ${isEditing ? 'bg-white border-blue-200 text-cyan-500 hover:bg-cyan-50' : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  <Upload size={16} /> Choose File
                </button>
                <span className="text-sm text-slate-500">
                  {userData.avatar ? 'Image selected' : 'No file chosen'}
                </span>
              </div>
            </div>

            {isEditing && (
              <div className="pt-6 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition flex-1 md:flex-none"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-cyan-500 hover:bg-cyan-500 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 flex-1 md:flex-none"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
