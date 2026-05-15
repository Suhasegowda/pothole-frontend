import { Link } from 'react-router-dom';
import { Trophy, BarChart3, Activity, Clock, Shield } from 'lucide-react';

function Stats() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Purple Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 pt-16 pb-20 px-8 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 bg-white text-blue-600 rounded-full flex items-center justify-center text-6xl font-bold shadow-xl flex-shrink-0">
            S
          </div>
          <div className="flex-1 text-center md:text-left mt-2">
            <h1 className="text-4xl font-bold mb-1">suhasgowda</h1>
            <p className="text-purple-200 mb-4 flex items-center justify-center md:justify-start gap-2 text-sm">
              <Shield size={14} /> su***@gmail.com
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 px-4 py-1.5 rounded-full font-bold text-sm shadow-sm">
              <span className="text-lg leading-none">🌱</span> Beginner
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="bg-amber-400/90 backdrop-blur-sm text-amber-900 px-6 py-3 rounded-2xl text-center shadow-lg border border-amber-300">
              <div className="text-lg font-bold">#--</div>
              <div className="text-xs font-bold uppercase tracking-wider">City Rank</div>
            </div>
            <div className="bg-amber-400/90 backdrop-blur-sm text-amber-900 px-6 py-3 rounded-2xl text-center shadow-lg border border-amber-300">
              <div className="text-lg font-bold">#--</div>
              <div className="text-xs font-bold uppercase tracking-wider">National Rank</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        {/* Top 4 Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">0</div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Points</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">0</div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Issues Reported</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">0</div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Resolved</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 text-center">
            <div className="text-4xl font-bold text-blue-500 mb-2">0%</div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Resolution Rate</div>
          </div>
        </div>

        {/* Middle Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Issue Breakdown */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-64">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-6">
              <BarChart3 size={20} className="text-slate-400" /> Issue Breakdown
            </h3>
            <div className="space-y-4 text-sm font-medium text-slate-600">
              <p>By Status</p>
              <p>By Category</p>
              <p>By Priority</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-64 flex flex-col">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-auto">
              <Trophy size={20} className="text-slate-400" /> Achievements <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">0</span>
            </h3>
            <div className="flex flex-col items-center justify-center text-center text-slate-400 pb-8">
              <Trophy size={40} className="mb-3 opacity-50" />
              <p className="text-sm font-medium">No achievements yet</p>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Recent Issues */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-48 flex flex-col">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-auto">
              <Clock size={20} className="text-slate-400" /> Recent Issues
            </h3>
            <div className="flex items-center justify-center text-slate-400 pb-8">
              <p className="text-sm font-medium">No issues reported yet</p>
            </div>
          </div>

          {/* Engagement */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-48">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-6">
              <Activity size={20} className="text-slate-400" /> Engagement
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-2"><span className="text-lg">🔥</span> Upvotes Received</span>
                <span className="font-bold text-slate-800">0</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-2"><span className="text-lg">💬</span> Comments Made</span>
                <span className="font-bold text-slate-800">0</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-2"><span className="text-lg">⏱️</span> Pending Issues</span>
                <span className="font-bold text-slate-800">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4">
          <Link to="/leaderboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition">
            <Trophy size={16} /> View Leaderboard
          </Link>
          <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition">
            <span className="text-lg leading-none">+</span> Report New Issue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Stats;
