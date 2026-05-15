import { User, Bell, Shield, Camera } from 'lucide-react';

function Profile() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Blue Banner */}
      <div className="bg-[#0ea5e9] pt-12 pb-32 text-center text-white px-4">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-blue-100">Manage your account settings and preferences</p>
      </div>

      {/* Floating Profile Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100 mb-8 relative">
          <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-4xl font-bold mx-auto border-4 border-white shadow-lg -mt-16 mb-4">
            S
          </div>
          <h2 className="text-2xl font-bold text-slate-800">suhasgowda</h2>
          <p className="text-slate-500 text-sm mb-6">suhasgowda@gmail.com</p>
          
          <div className="flex justify-center gap-12 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">0</div>
              <div className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Issues Reported</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">2 hours, 7 minutes</div>
              <div className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Member Since</div>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Left Sidebar Menu */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-max">
            <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-bold text-white bg-blue-500 transition border-l-4 border-blue-700">
              <User size={18} /> Account Settings
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition border-l-4 border-transparent hover:border-slate-300">
              <User size={18} /> Profile Information
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition border-l-4 border-transparent hover:border-slate-300">
              <Bell size={18} /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-slate-600 hover:bg-slate-50 transition border-l-4 border-transparent hover:border-slate-300">
              <Shield size={18} /> Security
            </button>
          </div>

          {/* Right Content Form */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">
              <User size={20} className="text-slate-400" /> Account Settings
            </h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">First name</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Last name</label>
                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Phone</label>
                <input type="tel" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Profile picture</label>
                <div className="flex items-center gap-3 border border-slate-300 rounded-lg px-4 py-2 bg-slate-50">
                  <button type="button" className="px-3 py-1 bg-white border border-slate-300 rounded text-sm text-slate-700 shadow-sm hover:bg-slate-50">Choose File</button>
                  <span className="text-sm text-slate-500">No file chosen</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700 font-medium">Email notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700 font-medium">SMS notifications</span>
                </label>
              </div>

              <div className="pt-6">
                <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
