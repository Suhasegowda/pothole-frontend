import { Trophy, Medal, Award } from 'lucide-react';

function Leaderboard() {
  const users = [
    { rank: 1, name: 'Rahul S.', points: 1250, reports: 125 },
    { rank: 2, name: 'Priya K.', points: 980, reports: 98 },
    { rank: 3, name: 'Anand V.', points: 850, reports: 85 },
    { rank: 4, name: 'Deepa M.', points: 720, reports: 72 },
    { rank: 5, name: 'You', points: 450, reports: 45 },
    { rank: 6, name: 'Karthik R.', points: 310, reports: 31 },
  ];

  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy size={28} className="text-amber-400 drop-shadow-md" />;
      case 2: return <Medal size={28} className="text-slate-400 drop-shadow-md" />;
      case 3: return <Award size={28} className="text-amber-700 drop-shadow-md" />;
      default: return <span className="font-bold text-xl text-slate-400 w-[28px] inline-block text-center">{rank}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Trophy size={40} className="text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">City Champions</h1>
        <p className="text-slate-500 max-w-xl mx-auto text-lg">
          Meet the top contributors making Bengaluru a better place. Earn points by reporting valid issues and climbing the ranks!
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_120px_120px] px-8 py-5 bg-slate-50 border-b border-slate-200 font-bold text-slate-500 text-sm uppercase tracking-wider">
          <div>Rank</div>
          <div>Citizen</div>
          <div className="text-right">Reports</div>
          <div className="text-right">Points</div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div 
              key={user.rank} 
              className={`grid grid-cols-[80px_1fr_120px_120px] px-8 py-6 items-center transition-colors hover:bg-slate-50 ${
                user.name === 'You' ? 'bg-green-50/50 relative overflow-hidden' : ''
              }`}
            >
              {user.name === 'You' && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
              )}
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.rank)}
              </div>
              <div className={`font-bold text-xl ${user.name === 'You' ? 'text-green-700' : 'text-slate-800'}`}>
                {user.name}
              </div>
              <div className="text-right text-slate-500 font-medium">{user.reports}</div>
              <div className="text-right font-bold text-blue-600 text-xl">{user.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
