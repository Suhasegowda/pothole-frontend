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
      case 1: return <Trophy size={24} color="#fbbf24" />;
      case 2: return <Medal size={24} color="#9ca3af" />;
      case 3: return <Award size={24} color="#b45309" />;
      default: return <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'var(--text-secondary)', width: '24px', textAlign: 'center' }}>{rank}</span>;
    }
  };

  return (
    <div className="container animate-fade-in">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Trophy size={64} color="var(--accent-primary)" style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>City Champions</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Meet the top contributors making Bengaluru a better place. Earn points by reporting valid issues and climbing the ranks!
        </p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px', padding: '16px 24px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid var(--border-glass)', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
          <div>Rank</div>
          <div>Citizen</div>
          <div style={{ textAlign: 'right' }}>Reports</div>
          <div style={{ textAlign: 'right' }}>Points</div>
        </div>
        
        {users.map((user) => (
          <div 
            key={user.rank} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '60px 1fr 100px 100px', 
              padding: '20px 24px', 
              alignItems: 'center',
              borderBottom: '1px solid var(--border-glass)',
              background: user.name === 'You' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              transition: 'background 0.3s ease'
            }}
          >
            <div>{getRankIcon(user.rank)}</div>
            <div style={{ fontWeight: '600', fontSize: '18px', color: user.name === 'You' ? 'var(--accent-primary)' : 'white' }}>
              {user.name}
            </div>
            <div style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>{user.reports}</div>
            <div style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--warning)', fontSize: '18px' }}>{user.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
